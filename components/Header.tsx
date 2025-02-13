'use client'

import { useParams, usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './theme/ThemeSwitch'
import LangSwitch from './LangSwitch'
import SearchButton from './search/SearchButton'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import AuthorsMenu from './AuthorsMenu'
import BlogMenu from './BlogMenu'

const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()

  const showHeader = pathname.includes('/freelancing')

  return (
    <header>
      <div className={`${showHeader ? 'hidden' : 'block'} flex items-center justify-between py-10`}>
        <div>
          <Link href={`/${locale}/`} aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="mr-4">
                <Logo />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="flex flex-col gap-1">
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                  <div className="hidden sm:block">
                    {siteMetadata.siteUrl.replace('https://', '')}
                  </div>
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          <BlogMenu params={{ locale }} />
          {headerNavLinks
            .filter((link) => {
              return link.href !== '/' && link.href !== '/skills' && link.href !== '/contact'
            })
            .map((link) => {
              const isSelected = pathname!.includes(link.href as string)
              return (
                <Link
                  key={link.title}
                  href={`/${locale}${link.href}`}
                  className={`hidden font-medium ${
                    isSelected ? 'text-primary-500' : 'text-gray-900 dark:text-gray-100'
                  }  md:block`}
                >
                  {t(`${link.title.toLowerCase()}`)}
                </Link>
              )
            })}
          <AuthorsMenu className="hidden md:block" />
          <SearchButton />
          <ThemeSwitch />
          <LangSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
