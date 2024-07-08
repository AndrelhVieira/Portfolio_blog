import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Link from '@/components/Link'
import { formatDate } from 'pliny/utils/formatDate'
import Tag from './Tag'
import { createTranslation } from 'app/[locale]/i18n/server'
import Image from 'next/image'

export type PostType = {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
  images?: string[]
}

type PostListPropsType = {
  posts: PostType[]
  max_display?: number
  params: { locale: LocaleTypes }
}

export default async function PostList({
  posts,
  max_display = 5,
  params: { locale },
}: PostListPropsType) {
  const { t } = await createTranslation(locale, 'home')

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {!posts.length && t('noposts')}
      {posts
        .filter((p) => p.language === locale)
        .slice(0, max_display)
        .map((post) => {
          const { slug, date, title, summary, tags, language, images } = post
          if (language === locale) {
            return (
              <li
                key={slug}
                className="flex flex-col items-center gap-5 py-5 xl:flex-row xl:items-start"
              >
                {images ? (
                  <div>
                    <Link href={`/${locale}/blog/${slug}`}>
                      <Image
                        src={images[0]}
                        width={250}
                        height={250}
                        alt={`${title} cover`}
                        className="max-w-64 rounded-lg"
                      />
                    </Link>
                  </div>
                ) : null}
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <div className="space-y-5 xl:col-span-3">
                      <dl>
                        <dt className="sr-only">{t('pub')}</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-6">
                        <div>
                          <div className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/${locale}/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              <h2>{title}</h2>
                            </Link>
                          </div>
                          <ul className="flex flex-wrap">
                            {tags.map((tag: string) => (
                              <li key={tag}>
                                <Tag text={tag} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/${locale}/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`${t('more')}"${title}"`}
                        >
                          {t('more')} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          }
        })}
    </ul>
  )
}
