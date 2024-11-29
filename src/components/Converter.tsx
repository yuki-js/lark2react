import { id2Component, genHashBlockId } from "../utils/utils"

export function Converter({ items }: { items: any[] }){

    
    const firstBlockId = items[0].block_id;
    const hash = genHashBlockId(items);

    return(
        <div>{id2Component(firstBlockId, hash)}</div>
    )
}

