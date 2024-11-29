import {BLOCK_TYPE_TO_COMPONENT} from "./blockTypeMapping";

//block_idと、block_idに対応したデータのハッシュ表
export function genHashBlockId(items): Record<string, any>{
    const hash: Record<string, any> = {};

    items.forEach(block => {
        hash[block.block_id] = block;    
    });

    return hash;
}


//今のところこれ必要ないかも
function buildTree(items){
    const hashTable = genHashBlockId(items);
    const Tree: Record<string, string[]> = {};

    items.forEach(item => {
        if(item.children){
            Tree[item.block_id] = item.children;
        }
        else{
            Tree[item.block_id] = [];
        }
    })

    return Tree;
}


//block_idから対応したfunction componentを取得
//e.g. "Lqzudvi1DokvIqxBn2rj94udpob" -> Page()
export function id2Component(blockId, hash){
    const blockData = hash[blockId];
    
    const blockType = blockData.block_type;
    const Component = BLOCK_TYPE_TO_COMPONENT[blockType]
    
    return  <Component blockData={blockData} hash={hash} />;
}