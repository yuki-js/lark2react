import * as Components from "../block-componets/blocks";
import ReactDOMServer from 'react-dom/server';

const blockType2Component = {
    1 : "Page",
    3 : "Heading1",
    4 : "Heading2",
    5 : "Heading3",
}



export function convertJsonToReactComponent(jsonString: string){
    try{
        const jsonObject = JSON.parse(jsonString)

        if(typeof jsonObject !== "object" || jsonObject === null){
            throw new Error("JSONを入力してください")
        }

        
        const items = jsonObject.data.items
        
        const tree = buildTree(items)
        const hash = genHashBlockId(items)
        
        
        
        const block_id = items[0].block_id;
        console.log("aaa")
        console.log(ReactDOMServer.renderToStaticMarkup(Id2Component(block_id,hash)))
        
        

        //最終的に出力するのは、reactConponentか、それをstring
        return (result);

    }catch (error){
        return  `エラー: ${(error as Error).message}`;
    }
    
}






//block_idと、block_idに対応したデータのハッシュ表
function genHashBlockId(items): Record<string, any>{
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
export function Id2Component(block_id, hash){
    const blockData = hash[block_id];
    
    const blockType = blockData.block_type;
    const Component = Components[blockType2Component[blockType]]

    
    return  <Component blockData={blockData} hash={hash} />;
}