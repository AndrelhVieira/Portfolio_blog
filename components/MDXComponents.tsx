import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from './BlogNewsLetterForm'
import type { MDXComponents } from 'mdx/types'

import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Audioplayer from './Audioplayer'
import ImageForMDX from './ImageForMDX'

export const components: MDXComponents = {
  Image: ImageForMDX,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Audioplayer,
}
