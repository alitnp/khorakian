export type richTextBlockTypes = 'paragraph' | 'header' | 'table' | 'list' | 'alert' | 'Delimiter' | 'checklist' | 'simpleImage';
export type richTextblock<T> = {
  data: T;
  id: string;
  tunes: { textAlignment: { alignment: 'center' | 'right' | 'left' } };
  type: richTextBlockTypes;
};
export type richTextParagraphData = {
  text: string;
};
export type richTextHeaderData = {
  text: string;
  level: number;
};
export type richTextTableData = {
  content: [string[]];
  withHeadings: boolean;
};
export type richTextListData = {
  items: string[];
  style: 'ordered' | 'unordered';
};
export type richTextAlertData = {
  message: string;
  type: string;
};
export type richTextChecklistData = {
  items: [{ text: string; checked: boolean }];
};
export type richTextSimpleImageData = {
  caption: string;
  stretched: boolean;
  url: string;
  withBackground: boolean;
  withBorder: boolean;
};
export type richTextImageData = {
  caption: string;
  stretched: boolean;
  file: {
    url: string;
  };
  withBackground: boolean;
  withBorder: boolean;
};

export type richTextOutPut = { blocks: richTextblock<any>[]; time: number; version: string };
