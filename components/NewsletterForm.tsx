'use client'

import React, { useCallback } from 'react'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { Bounce, toast } from 'react-toastify'
import { useTheme } from 'next-themes'

export interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

const NewsletterForm = ({ apiUrl }: NewsletterFormProps) => {
  const locale = useParams()?.locale as LocaleTypes
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
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t('title')}
      </div>
      <form
        action="https://buttondown.email/api/emails/embed-subscribe/AndrelhVieira"
        method="post"
        target="popupwindow"
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row"
      >
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">{t('mail')}</span>
            <input
              autoComplete="email"
              className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
              id="email-input"
              name="email"
              placeholder={t('placeholderDefault')}
              required
              type="email"
            />
          </label>
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
          <button
            className={
              'w-full cursor-pointer rounded-md bg-primary-500 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400 sm:py-0'
            }
            type="submit"
          >
            {t('buttonDefault')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm
