import { Page } from "../components/blocks/Page";
import { Text } from "../components/blocks/Text";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Heading7,
  Heading8,
  Heading9,
} from "../components/blocks/Heading";
import { UnorderedList } from "../components/blocks/UnorderedList";
import { OrderedList } from "../components/blocks/OrderedList";
import { CodeBlock } from "../components/blocks/CodeBlock";
import { Todo } from "../components/blocks/Todo";
import { QuoteContainer } from "../components/blocks/QuoteContainer";
import { Divider } from "../components/blocks/Divider";
import { Callout } from "../components/blocks/Callout";
import { Image } from "../components/blocks/Image";

import { BlockType } from "../types/block";
import { BlockContent } from "../types/block";


type BlockTypeToComponent = {
  [key in BlockType]?: React.ComponentType<BlockContent>;
};

export const BLOCK_TYPE_TO_COMPONENT: BlockTypeToComponent = {
  [BlockType.Page]: Page,
  [BlockType.Text]: Text,
  [BlockType.Heading1]: Heading1,
  [BlockType.Heading2]: Heading2,
  [BlockType.Heading3]: Heading3,
  [BlockType.Heading4]: Heading4,
  [BlockType.Heading5]: Heading5,
  [BlockType.Heading6]: Heading6,
  [BlockType.Heading7]: Heading7,
  [BlockType.Heading8]: Heading8,
  [BlockType.Heading9]: Heading9,
  [BlockType.UnorderedList]: UnorderedList,
  [BlockType.OrderedList]: OrderedList,
  [BlockType.CodeBlock]: CodeBlock,
  [BlockType.Todo]: Todo,
  [BlockType.Callout]: Callout,
  [BlockType.Divider]: Divider,
  [BlockType.Image]: Image,
  [BlockType.QuoteContainer]: QuoteContainer,
};
