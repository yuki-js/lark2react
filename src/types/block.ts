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

export interface TextStyle {
  align?: number; // enum Align
  done?: boolean;
  folded?: boolean;
  language?: string; // enum CodeLanguage
  wrap?: boolean;
}

export interface TextRun {
  content: string;
  text_element_style?: TextElementStyle;
  comment_ids?: string[];
}

export interface TextElementStyle {
  text_color?: number;
  background_color?: number;
  bold?: boolean;
  inline_code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  comment_ids?: string[];
  link?: Link;
}

export interface Link {
  url: string; 
}



export interface Element {
  text_run: TextRun;
}




export interface TextElement extends Element {
  mention_user?: unknown; // object(MentionUser)
  mention_doc?: unknown; // object(MentionDoc)
  reminder?: unknown; // object(Reminder)
  file?: unknown; // object(InlineFile)
  inline_block?: unknown; // object(InlineBlock)
  equation?: unknown; // object(Equation)
  undefined_element?: unknown; // object(UndefinedElement)
}

export interface Block {
  block_id: string;
  block_type: BlockType;
  page?: {
    elements: Element[];
  };
  text?: {
    elements: TextElement[];
    style?: TextStyle;
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


