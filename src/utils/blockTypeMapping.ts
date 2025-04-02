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
import { BlockContent } from "../types/block";

type BlockTypeToComponent = Record<number, React.ComponentType<BlockContent>>;

export const BLOCK_TYPE_TO_COMPONENT: BlockTypeToComponent = {
  1: Page,
  2: Text,
  3: Heading1,
  4: Heading2,
  5: Heading3,
  6: Heading4,
  7: Heading5,
  8: Heading6,
  9: Heading7,
  10: Heading8,
  11: Heading9,
  12: UnorderedList,
  13: OrderedList,
  14: CodeBlock,
  17: Todo,
  19: Callout,
  22: Divider,
  27: Image,
  34: QuoteContainer,
};
