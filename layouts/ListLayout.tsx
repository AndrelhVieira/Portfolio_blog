'use client'

import { useState } from 'react'
import { useTagStore } from '@/components/util/useTagStore'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import { sortByDate } from '@/components/util/sortByDate'
import Pagination from './Pagination'
import tagData from 'app/[locale]/tag-data.json'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

export default function ListLayout({ params: { locale }, posts, title }: ListLayoutProps) {
  const { t } = useTranslation(locale, 'home')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = POSTS_PER_PAGE
  const sortedPosts = sortByDate(posts)
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)

  const filteredPosts = useTagStore((state) => {
    if (state.selectedTag) {
      return sortedPosts.filter((post) => post.tags.includes(state.selectedTag))
    } else {
      return sortedPosts
    }
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const displayPosts = filteredPosts.slice(startIndex, endIndex)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === useTagStore.getState().selectedTag ? '' : tag)
    setCurrentPage(1)
  }

  const tagCountMap: any = tagData[locale]

  const filteredTags = Object.keys(tagCountMap).map((postTag) => {
    return (
      <li key={postTag} className="my-3">
        <button
          onClick={() => handleTagClick(postTag)}
          aria-labelledby={`${t('poststagged')} ${postTag}`}
        >
          <h3
            className={`inline px-3 py-2 text-sm font-medium uppercase ${
              useTagStore.getState().selectedTag === postTag
                ? 'text-primary-500'
                : 'text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500'
            }`}
          >
            {postTag} ({tagCountMap[postTag]})
          </h3>
        </button>
      </li>
    )
  })

  return (
    <div>
      <div className="pb-6 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
          <div className="px-6 py-4">
            <button
              onClick={() => setSelectedTag('')}
              className={`${
                useTagStore.getState().selectedTag === ''
                  ? 'text-heading-500 dark:text-heading-400'
                  : 'text-gray-500 dark:text-gray-400'
              } font-bold uppercase`}
            >
              {t('all')}
            </button>
            <ul>{filteredTags}</ul>
          </div>
        </div>
        <div>
          <ul>
            {displayPosts.map((post) => {
              const { slug, date, title, summary, tags, language } = post
              if (language === locale) {
                return (
                  <li key={slug} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">{t('pub')}</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, language)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/${locale}/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                              aria-labelledby={title}
                            >
                              <h2>{title}</h2>
                            </Link>
                          </div>
                          <ul className="flex flex-wrap">
                            {tags.map((t: any) => (
                              <li key={t} className="my-3">
                                <button
                                  onClick={() => handleTagClick(t)}
                                  className={`${
                                    useTagStore.getState().selectedTag === t
                                      ? 'text-heading-500 dark:text-heading-400'
                                      : 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500'
                                  } mr-3 text-sm font-medium uppercase`}
                                  aria-label={`View posts tagged ${t}`}
                                >
                                  {`${t}`}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              }
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              params={{ locale }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
