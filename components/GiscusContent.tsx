'use client'

import { Giscus } from 'pliny/comments'
import { useTheme } from './theme/ThemeContext'

export default function GiscusContent() {
  const { theme } = useTheme()

  return (
    <>
      <span id="comment"></span>
      <Giscus
        category="Announcements"
        categoryId="DIC_kwDOMLpOXs4CgNSV"
        mapping="pathname"
        metadata="0"
        reactions="1"
        repo="AndrelhVieira/blog_discuss_base"
        repositoryId="R_kgDOMLpOXg"
        themeURL={theme}
      />
    </>
  )
}
