import React from 'react'
import CodeBlock from './CodeBlock'
import BlockInfo, { BlockInfoProps } from './BlockInfo'
import ForwardLink, { ForwardLinkProps } from './ForwardLink'

const CustomH1 = (props: object) => <h1 className="text-2xl font-bold text-[#0070f3] my-4" {...props} />
const CustomH2 = (props: { children: string }) => (
  <h2
    id={(props?.children ?? '')?.toLocaleLowerCase()?.replaceAll(' ', '-')}
    className="text-xl font-semibold my-3"
    {...props}
  />
)
const CustomH3 = (props: { children: string }) => (
  <h3
    id={(props?.children ?? '')?.toLocaleLowerCase()?.replaceAll(' ', '-')}
    className="text-lg font-medium my-2"
    {...props}
  />
)
const CustomP = (props: object) => <p className="text-base leading-relaxed my-2" {...props} />
const CustomBlockquote = (props: object) => (
  <blockquote className="border-l-4 border-gray-500 italic pl-4 my-4 text-gray-600" {...props} />
)
const CustomCode = (props: object) => <code className="bg-gray-100 text-red-500 px-1 py-0.5 rounded" {...props} />
const CustomPre = (props: any) => <CodeBlock {...props} content={props?.children} />

const CustomBlockInfo = (props: BlockInfoProps) => {
  return <BlockInfo {...props}>{props?.children}</BlockInfo>
}
const CustomImage = (props: object) => <img className="rounded-md shadow-md" {...props} />
const CustomA = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a className="text-blue-500 hover:underline" {...props} />
)

const CustomForwardLink = (props: ForwardLinkProps) => {
  return (
    <ForwardLink {...props} />
  )
}

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
  CustomBlockInfo: CustomBlockInfo,
  CustomForwardLink: CustomForwardLink
}
