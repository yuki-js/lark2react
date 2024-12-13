import { BLOCK_TYPE_TO_COMPONENT } from "./blockTypeMapping";

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
export function id2Component(blockId, hash) {

  
  const blockDataArr = hash[blockId];
  const blockType = blockDataArr.block_type;
  const Component = BLOCK_TYPE_TO_COMPONENT[blockType];
  return <Component blockDataArr={blockDataArr} hash={hash} />;
  
  
}


//親が持つ子要素をコンポーネントとして表示する
export function displayChildComponent(blockDataArr, hash){
  if (blockDataArr.children){
      return(
        <div>
          {blockDataArr.children.map((childId, index) => (
            <div key={index}>{id2Component(childId, hash)}</div>
          ))}
        </div>
      )
  }
}


// この関数は使わない
// 同じblockTypeが連続している場合、グループ化をする関数
// 1Data は blockTypeが1のdataBlock
// blockDataArrArr[[13Dataのid, 13Dataのid], [1Dataのid], [5Dataのid], [13Dataのid]] 
// 番号付きリストを連番で表示するのに今のところ使用
function groupingblockDataArr(blockDataArr, hash){

  const orderdListBlockType = 13;
  const groupingDataArr: string[][] = [];
  let currentGroup: string[] = [];

  for (let i = 0; i < blockDataArr.children.length - 1; i++) {
    const currentChildId = blockDataArr.children[i];
    const nextChildId = blockDataArr.children[i + 1];
    const currentBlockType = hash[currentChildId].block_type;
    const nextBlockType = hash[nextChildId].block_type;

    if (currentBlockType === nextBlockType && currentBlockType === orderdListBlockType) {
      currentGroup.push(currentChildId);
      if (i === blockDataArr.children.length - 2){
        currentGroup.push(nextChildId);
        groupingDataArr.push(currentGroup);
        currentGroup = [];
      }
    }else{
      if(currentGroup.length > 0){
        currentGroup.push(currentChildId);
        groupingDataArr.push(currentGroup);
        currentGroup = [];
      }else{
        groupingDataArr.push([currentChildId]);
      }
      if (i === blockDataArr.children.length - 2){
        groupingDataArr.push([nextChildId]);
      }
    }   
  }
  
  return groupingDataArr
}