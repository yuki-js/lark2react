import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { BlockComponent } from "./BlockComponent";

export const Page: React.FC = () => {
  const { block } = useCurrentBlock();

  return (
    <div>
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
