import * as Components from "../components/blocks/blocks";
import ReactDOMServer from 'react-dom/server';
import { Page } from "../components/blocks/Page";
import { Text } from "../components/blocks/Text";
import { Heading1, Heading2, Heading3, Heading4 } from "../components/blocks/Heading";


const blockType2Component = {
    1 : Page,
    2 : Text,
    3 : Heading1,
    4 : Heading2,
    5 : Heading3,
    6 : Heading4
}


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
    const Component = blockType2Component[blockType]
    
    return  <Component blockData={blockData} hash={hash} />;
}