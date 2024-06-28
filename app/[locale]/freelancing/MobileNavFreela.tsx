'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import Link from 'next/link'
import headerNavLinksFreelancing from './headerNavLinksFreelancing'
import { allAuthors, Authors } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

const MobileNavFreela = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'freelancing')
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]

  const mainAuthor = allAuthors.filter((a) => a.default === true && a.language === locale)

  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label={t('showmenu')} onClick={onToggleNav} className="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 my-auto h-full w-full transform overflow-y-auto bg-white opacity-95 duration-300 ease-in-out dark:bg-gray-950 dark:opacity-[0.98] ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <button className="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {headerNavLinksFreelancing.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={`${link.href}`}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {t(`${link.title.toLowerCase()}`)}
              </Link>
            </div>
          ))}
          {siteMetadata.multiauthors === false && (
            <div className="px-12 py-4 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100">
              {mainAuthor.map((author) => {
                const { name, language, slug } = author
                if (language === locale) {
                  return (
                    <Link href={`/${locale}/about/${slug}`} onClick={onToggleNav} key={name}>
                      {t('about')}
                    </Link>
                  )
                }
                return null
              })}
            </div>
          )}
        </nav>
      </div>
    </>
  )
}

export default MobileNavFreela