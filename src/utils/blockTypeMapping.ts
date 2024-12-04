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

export const BLOCK_TYPE_TO_COMPONENT = {
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
};
