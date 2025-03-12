import { BLOCK_TYPE_TO_COMPONENT } from "./blockTypeMapping";
import { css } from "@emotion/react";
import { FONT_COLOR } from "../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../styles/fontBackgroundColor";




//グループ化するblockDataのblockType
const TARGET_BLOCK_TYPES = new Set([12, 13]);

//block_idと、block_idに対応したデータのハッシュ表
interface BlockItem {
  block_id: string;
  block_type: number;
}

interface TextStyle {
  text_color: number;
  background_color: number;
  bold: boolean;
  inline_code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}


export function genHashBlockId(items: BlockItem[]): Record<string, BlockItem> {
  const hash: Record<string, BlockItem> = {};

  items.forEach((block) => {
    hash[block.block_id] = block;
  });

  return hash;
}


//block_idから対応したfunction componentを取得
//e.g. "Lqzudvi1DokvIqxBn2rj94udpob" -> Page()
export function id2Component(blockIdArr: string[], hash: Record<string, BlockItem>) {
  //blockIdArrの要素のblockTypeを調べる
  const blockType = hash[blockIdArr[0]].block_type;

  if (TARGET_BLOCK_TYPES.has(blockType)) {
    const arr = [];
    for (let i = 0; i < blockIdArr.length; i++) {
      const blockData = hash[blockIdArr[i]];
      arr.push(blockData);
    }

    const blockType = arr[0].block_type;
    const Component = BLOCK_TYPE_TO_COMPONENT[blockType];

    return <Component blockDataArr={arr} hash={hash} />;
  } else {

    const blockData = hash[blockIdArr[0]];
    const blockType = blockData.block_type;
    const Component = BLOCK_TYPE_TO_COMPONENT[blockType];

    //未実装のblock(コンポーネント)は、表示不可能と表示
    if (!Component) {
      return <div style={{
        fontSize: '18px',
        padding: '10px',
        display: 'inline-block',
        borderRadius: '5px',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        margin: '10px 0'
      }}>表示できません</div>;
    }

    return <Component blockData={blockData} hash={hash} />;
  }
}

//親が持つ子要素をコンポーネントとして表示する
export function displayChildComponent(blockData: { children: string[] }, hash: Record<string, BlockItem>) {
  if (blockData.children) {
    const blockDataArr = groupingblockData(blockData, hash);

    return (
      <div>
        {blockDataArr.map((childIdArr, index) => (
          <div key={index}>{id2Component(childIdArr, hash)}</div>
        ))}
      </div>
    );
  }
}

// 同じblockTypeが連続している場合、グループ化をする関数
// 対象blockTypeは、TARGET_BLOCK_TYPES
// 1Data は blockTypeが1のdataBlock
// blockDataArr[[13Dataのid, 13Dataのid], [1Dataのid], [5Dataのid], [13Dataのid]]
// 番号付きリストを連番で表示するのに今のところ使用
function groupingblockData(blockData: { children: string[] }, hash: Record<string, BlockItem>) {
  const blockDataArr: string[][] = [];
  let currentGroup: string[] = [];

  if (blockData.children.length === 1) {
    blockDataArr.push([blockData.children[0]]);
    return blockDataArr;
  }

  for (let i = 0; i < blockData.children.length - 1; i++) {
    const currentChildId = blockData.children[i];
    const nextChildId = blockData.children[i + 1];
    const currentBlockType = hash[currentChildId].block_type;
    const nextBlockType = hash[nextChildId].block_type;

    if (
      currentBlockType === nextBlockType &&
      TARGET_BLOCK_TYPES.has(currentBlockType)
    ) {
      currentGroup.push(currentChildId);
      if (i === blockData.children.length - 2) {
        currentGroup.push(nextChildId);
        blockDataArr.push(currentGroup);
        currentGroup = [];
      }
    } else {
      if (currentGroup.length > 0) {
        currentGroup.push(currentChildId);
        blockDataArr.push(currentGroup);
        currentGroup = [];
      } else {
        blockDataArr.push([currentChildId]);
      }
      if (i === blockData.children.length - 2) {
        blockDataArr.push([nextChildId]);
      }
    }
  }

  return blockDataArr;
}

export const generateTextStyle = ({
  text_color,
  background_color,
  bold,
  inline_code,
  italic,
  strikethrough,
  underline,
}: TextStyle) => {
  const strikethroughParam = strikethrough ? "line-through" : "none";
  const underlineParam = underline ? "underline" : "none";

  return css({
    color: FONT_COLOR[text_color] || "black",
    fontWeight: bold ? "bold" : "normal",
    fontFamily: inline_code ? "monospace" : "inherit",
    fontStyle: italic ? "italic" : "normal",
    backgroundColor: FONT_BACKGROUND_COLOR[background_color],
    textDecoration:
      [
        strikethroughParam === "line-through" && "line-through",
        underlineParam === "underline" && "underline",
      ]
        .filter(Boolean)
        .join(" ") || "none",
  });
};

//共有されたリンク(URL)から、document_idを抽出する。
export function extractDocId(url: string): string {
  const match = url.match(/docx\/([a-zA-Z0-9]+)\?/);
  if (!match) {
    throw new Error("Invalid URL: Document ID not found");
  }
  return match[1];
}

//文字列からURLを検出する
export function containsUrl(text: string): boolean {
  const urlPattern = /\bhttps?:\/\/[^\s]+/g;
  // 正規表現がマッチするかをチェック
  return urlPattern.test(text);
}
