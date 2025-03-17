export enum BlockType {
  Page = 1,
  Text = 2,
  Heading1 = 3,
  Heading2 = 4,
  Heading3 = 5,
  Heading4 = 6,
  Heading5 = 7,
  Heading6 = 8,
  Heading7 = 9,
  Heading8 = 10,
  Heading9 = 11,
  UnorderedList = 12,
  OrderedList = 13,
  CodeBlock = 14,
  Todo = 17,
  Callout = 19,
  Divider = 22,
  Image = 27,
  QuoteContainer = 34,
}

export interface TextRun {
  content: string;
  text_color?: number;
  background_color?: number;
  bold?: boolean;
  inline_code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
}

export interface Element {
  text_run: TextRun;
}

export interface Block {
  block_id: string;
  block_type: BlockType;
  page?: {
    elements: Element[];
  };
  text?: {
    elements: Element[];
  };
  heading?: {
    elements: Element[];
  };
  code?: {
    language: string;
    elements: Element[];
  };
  todo?: {
    done: boolean;
    elements: Element[];
  };
  callout?: {
    emoji_id: string;
    elements: Element[];
  };
  quote?: {
    elements: Element[];
  };
  image?: {
    token: string;
    width: number;
    height: number;
  };
  children?: string[];
}

export interface Document {
  blocks: Block[];
}

export interface BlockContext {
  block: Block;
  parent?: Block;
  level: number;
  document: Document;
}
