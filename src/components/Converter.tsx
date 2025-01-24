import { id2Component, genHashBlockId } from "../utils/utils";
import { HashContext } from "../contexts/DataContext";

export function Converter({ items }: { items: any[] }) {
  const firstBlockId = items[0].block_id;
  const hash = genHashBlockId(items);

  return (
    <HashContext.Provider value={hash}>
      <div>{id2Component([firstBlockId], hash)}</div>
    </HashContext.Provider>
  );
}
