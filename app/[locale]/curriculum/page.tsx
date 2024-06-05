'use client'

import { useEffect, useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import siteMetadata from '@/data/siteMetadata'
import { LocaleTypes } from '../i18n/settings'
import { MDXRemote } from 'next-mdx-remote'
import { useTranslation } from '../i18n/client'
import { useParams } from 'next/navigation'
import CustomTitle from '../../../components/CustomTitle'
import { personalData } from '@/data/contactData'

interface MDXContent {
  mdxSource: any
  frontMatter: any
}

const CurriculumPage = () => {
  const [mdxContent, setMdxContent] = useState<MDXContent | null>(null)
  const locale = useParams()?.locale as LocaleTypes

  const { t } = useTranslation(locale, 'curriculum')

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/curriculum/${locale}`)
      const data = await res.json()
      setMdxContent(data)
    }
    fetchData()
  }, [locale])

  if (!mdxContent) {
    return <div>Loading...</div>
  }

  const { mdxSource, frontMatter } = mdxContent

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-extrabold uppercase">{frontMatter.name}</h1>
        <p className="font-extralight">{siteMetadata.email}</p>
        <p className="font-extralight">{personalData.phoneNumber}</p>
        <p className="font-extralight">{t('gender')}</p>
        <p className="font-extralight">{t('birthdate')}</p>
        <p className="font-extralight">{t('location')}</p>
        <p className="font-extralight">{t('nationality')}</p>
        <p className="font-extralight">{t('marital_status')}</p>
      </div>
      <hr className="my-5 h-1 w-full bg-gray-500" />
      <div>
        <MDXProvider components={{ h1: CustomTitle }}>
          <MDXRemote {...mdxSource} />
        </MDXProvider>
      </div>
    </div>
  )
}

export default CurriculumPage
