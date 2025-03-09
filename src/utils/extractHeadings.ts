import { remark } from "remark";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";

// type ParentTree = {
//   type: 'heading' | 'text'
//   depth: number
//   children: any
//   position: {
//     start: Position
//     end: Position
//   }
// }

type ChildTree = {
  type: 'heading' | 'text'
  value: string
  position?: Position
}

type Position = {
  line: number
  column: number
  offset: number
}

export const extractHeadings = (mdxContent: string) => {
  const headings: Array<{ text: string; level: number }> = [];
  const tree = remark().use(remarkMdx).parse(mdxContent);

  visit(tree, "heading", (node: any) => {
    const text = node?.children?.filter((i: ChildTree) => i?.type !== 'heading')?.map((child: ChildTree) => child?.value).join("");
    headings.push({ text, level: node?.depth });
  });

  return headings
}