import { BLOCK_TYPE_TO_COMPONENT } from "./blockTypeMapping";
import { css } from "@emotion/react";
import { FONT_COLOR } from "../styles/fontColor"; 
import { FONT_BACKGROUND_COLOR } from "../styles/fontBackgroundColor";

//グループ化するblockDataのblockType
const TARGET_BLOCK_TYPES = new Set([12, 13]);

//block_idと、block_idに対応したデータのハッシュ表
export function genHashBlockId(items): Record<string, any> {
  const hash: Record<string, any> = {};

  items.forEach((block) => {
    hash[block.block_id] = block;
  });

  return hash;
}

//今のところこれ必要ないかも
function buildTree(items) {
  const hashTable = genHashBlockId(items);
  const Tree: Record<string, string[]> = {};

  items.forEach((item) => {
    if (item.children) {
      Tree[item.block_id] = item.children;
    } else {
      Tree[item.block_id] = [];
    }
  });

  return Tree;
}

//block_idから対応したfunction componentを取得
//e.g. "Lqzudvi1DokvIqxBn2rj94udpob" -> Page()
export function id2Component(blockIdArr, hash) {
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
    return <Component blockData={blockData} hash={hash} />;
  }
}

//親が持つ子要素をコンポーネントとして表示する
export function displayChildComponent(blockData, hash) {
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
function groupingblockData(blockData, hash) {
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
