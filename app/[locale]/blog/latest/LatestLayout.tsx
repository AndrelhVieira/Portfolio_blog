import NewsletterFormDetailed from '@/components/NewsletterForm/NewsletterFormDetailed'
import PostList from '@/components/PostList'
import siteMetadata from '@/data/siteMetadata'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Link from 'next/link'

const MAX_DISPLAY = 5

type PostType = {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
}

type LatestLayoutPropsType = {
  posts: PostType[]
  params: { locale: LocaleTypes }
}

export default async function LatestLayout({ posts, params: { locale } }: LatestLayoutPropsType) {
  const { t } = await createTranslation(locale, 'home')

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('latest')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('description')}</p>
        </div>
        <PostList params={{ locale }} posts={posts} />
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href={`/${locale}/blog`}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={t('all')}
          >
            {t('all')} &rarr;
          </Link>
        </div>
      )}

      <div className="my-5"></div>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterFormDetailed params={{ locale }} />
        </div>
      )}
    </>
  )
}
