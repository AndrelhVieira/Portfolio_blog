'use client'

import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTheme } from '../theme/ThemeContext'
import { useCallback } from 'react'
import { Bounce, toast } from 'react-toastify'

type NewsletterFormDetailedPropsType = {
  params: { locale: LocaleTypes }
}

export default function NewsletterFormDetailed({
  params: { locale },
}: NewsletterFormDetailedPropsType) {
  const { t } = useTranslation(locale, 'newsletter')
  const { theme } = useTheme()

  const handleSubscribe = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    window.open('https://buttondown.email/AndrelhVieira', 'popupwindow')
    toast.success(t('placeholderSuccess'), {
      position: 'top-center',
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
      transition: Bounce,
    })
  }, [])

  return (
    <div className="relative isolate bg-white py-16 dark:bg-gray-950 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl text-center sm:text-start lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-500 dark:text-gray-400">
              {t('subtitle')}
            </p>
            <form
              action="https://buttondown.email/api/emails/embed-subscribe/AndrelhVieira"
              method="post"
              target="popupwindow"
              onSubmit={handleSubscribe}
              className="mt-3 flex flex-col gap-3 xl:flex-row"
            >
              <label htmlFor="email-input">
                <span className="sr-only">{t('mail')}</span>
                <input
                  autoComplete="email"
                  className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black xl:min-w-72"
                  id="email-input"
                  name="email"
                  placeholder={t('placeholderDefault')}
                  required
                  type="email"
                />
              </label>
              <button
                className={
                  'w-full cursor-pointer rounded-md bg-primary-500 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400'
                }
                type="submit"
              >
                {t('buttonDefault')}
              </button>
            </form>
          </div>
          <dl className="grid-row-2 grid gap-x-8 gap-y-10 lg:pt-2">
            <div className="flex flex-col items-center sm:items-start">
              <div className="rounded-md p-2 ring-1 ring-primary-500/50">
                <CalendarDaysIcon className="h-6 w-6 text-primary-500" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-primary-500">{t('weekly_title')}</dt>
              <dd className="mt-2 text-center leading-7 text-gray-600 dark:text-gray-400 sm:text-start">
                {t('weekly_text')}
              </dd>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="rounded-md p-2 ring-1 ring-primary-500/50">
                <HandRaisedIcon className="h-6 w-6 text-primary-500" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-primary-500">{t('spam_title')}</dt>
              <dd className="mt-2 text-center leading-7 text-gray-600 dark:text-gray-400 sm:text-start">
                {t('spam_text')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
