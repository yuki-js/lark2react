
export function convertJsonToReactComponent(jsonString: string){
    try{
        const jsonObject = JSON.parse(jsonString)

        if(typeof jsonObject !== "object" || jsonObject === null){
            throw new Error("JSONを入力してください")
        }

        
        const items = jsonObject.data.items
        
        const tree = buildTree(items)
        console.log("tree")
        console.log(tree)
        
        
        

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