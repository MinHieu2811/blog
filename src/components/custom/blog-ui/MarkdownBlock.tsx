import React from "react";
import CodeBlock from "./CodeBlock";

const CustomH1 = (props: object) => <h1 className="text-4xl font-bold my-4" {...props} />;
const CustomH2 = (props: object) => <h2 className="text-3xl font-semibold my-3" {...props} />;
const CustomH3 = (props: object) => <h3 className="text-2xl font-medium my-2" {...props} />;
const CustomP = (props: object) => <p className="text-base leading-relaxed my-2" {...props} />;
const CustomBlockquote = (props: object) => (
  <blockquote className="border-l-4 border-gray-500 italic pl-4 my-4 text-gray-600" {...props} />
);
const CustomCode = (props: object) => <code className="bg-gray-100 text-red-500 px-1 py-0.5 rounded" {...props} />;
const CustomPre = (props: any) => <CodeBlock {...props} content={props?.children}/>;
const CustomImage = (props: object) => <img className="rounded-md shadow-md" {...props} />;
const CustomA = (props: object) => <a className="text-blue-500 hover:underline" {...props} />;

export const mdxComponents = {
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  p: CustomP,
  blockquote: CustomBlockquote,
  code: CustomCode,
  pre: CustomPre,
  img: CustomImage,
  a: CustomA,
};
