import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";

export const Table: BlockInnerComponent = ({ block }) => {

  const rowSize = block.table?.property.row_size;
  const columnSize = block.table?.property.column_size;
  const columnWidth = block.table?.property.column_width; //array of numbers
  const headerRow = block.table?.property.header_row;
  const headerColumn = block.table?.property.header_column;
  const mergeInfo = block.table?.property.merge_info;

  return (
    <div>
      {block.table?.cells?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
