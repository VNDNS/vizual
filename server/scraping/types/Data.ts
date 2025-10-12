export type TableCell = {
  text: string;
  rowspan?: number;
  colspan?: number;
  isHeader?: boolean;
};

export type Data =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "table";
      content: TableCell[][];
    }
  | {
      type: "heading";
      level: 1 | 2 | 3 | 4 | 5 | 6;
      content: string;
    };