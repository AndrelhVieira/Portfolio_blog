'use client'

import { Giscus } from 'pliny/comments'
import { useTheme } from './theme/ThemeContext'

export default function GiscusContent() {
  const { theme } = useTheme()

  return (
    <Giscus
      category="Announcements"
      categoryId="DIC_kwDOMLpOXs4CgNSV"
      mapping="pathname"
      metadata="0"
      reactions="1"
      repo="AndrelhVieira/base"
      repositoryId="R_kgDOMLpOXg"
      themeURL={theme}
    />
  )
}
