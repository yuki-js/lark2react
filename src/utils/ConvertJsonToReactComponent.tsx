
export function convertJsonToReactComponent(jsonString: string){
    try{
        const jsonObject = JSON.parse(jsonString)

        if(typeof jsonObject !== "object" || jsonObject === null){
            throw new Error("JSONを入力してください")
        }


        
        const result = jsonObject.data.items.map((item: { block_id: any; }) => item.block_id)

        //最終的に出力するのは、reactConponentか、それをstring
        return (result);

    }catch (error){
        return  `エラー: ${(error as Error).message}`;
    }
    
}