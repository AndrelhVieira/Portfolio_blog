'use client'

import Logo from '@/data/logo.svg'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { LocaleTypes } from '../i18n/settings'
import ThemeSwitch from '@/components/theme/ThemeSwitch'
import LangSwitch from '@/components/LangSwitch'
import headerNavLinksFreelancing from './headerNavLinksFreelancing'
import MobileNavFreela from './MobileNavFreela'
import { useTranslation } from '../i18n/client'
import SectionContainer from '@/components/SectionContainer'

export default function Header({ locale }: { locale: LocaleTypes }) {
  const { t } = useTranslation(locale, 'freelancing')

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between font-sans">
        <header className="absolute inset-x-8 top-32 z-50 sm:top-20 lg:inset-x-48 2xl:top-12">
          <div className="flex items-center justify-between py-10">
            <div>
              <Link href={`/${locale}/`} aria-label={siteMetadata.headerTitle}>
                <div className="flex items-center justify-between">
                  <div className="mr-4">
                    <Logo />
                  </div>
                  {typeof siteMetadata.headerTitle === 'string' ? (
                    <div className="flex flex-col gap-1">
                      <div className="hidden h-6 text-2xl font-semibold xl:block">
                        {siteMetadata.headerTitle}
                      </div>
                      <div className="hidden xl:block">
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
              {headerNavLinksFreelancing.map((link) => {
                return (
                  <Link
                    key={link.title}
                    href={`${link.href}`}
                    className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 md:block"
                  >
                    {t(`${link.title.toLowerCase()}`)}
                  </Link>
                )
              })}
              <ThemeSwitch />
              <LangSwitch />
              <MobileNavFreela />
            </div>
          </div>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#DB5461] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div
                className="*: relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20
              dark:text-gray-300 dark:ring-gray-300/10 dark:hover:ring-gray-100/20"
              >
                {t('header.portfolio_cta')}
                <Link href="#portfolio" className="ml-2 font-semibold text-primary-500">
                  <span className="absolute inset-0" aria-hidden="true" />
                  {t('header.portfolio_cta_button')} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                {t('header.title')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                {t('header.subtitle')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="#services"
                  className="rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  {t('services')}
                </Link>
                <Link
                  href="#contact"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  {t('contact')} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#DB5461] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
