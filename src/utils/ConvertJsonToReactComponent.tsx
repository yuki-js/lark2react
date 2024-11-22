
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


//親子関係を作成する
type Block = {
    block_id: string;
    children: string[];
}

function buildTree(items){
    const hashTable = genHashBlockId(items);
    const Tree: Record<string, Block[]> = {};

    

    function addChildren(parentBlock: Block){
        
        if (!parentBlock.children || parentBlock.children.length === 0) return;

        parentBlock.children.forEach(childId => {
            const childData = hashTable[childId];
            if (childData){
                if (!Tree[parentBlock.block_id]){
                    Tree[parentBlock.block_id] = [];
                }

                const childBlock: Block ={
                    block_id : childData.block_id,
                    children : childData.children ? childData.children : []
                };


                Tree[parentBlock.block_id].push(childBlock)


                //childrenの子も再帰的に追加
                addChildren(childBlock);
            }
        })
    }

    const firstBlock: Block ={
        block_id : items[0].block_id,
        children : items[0].children
    };

    addChildren(firstBlock);
    

    return Tree;
}