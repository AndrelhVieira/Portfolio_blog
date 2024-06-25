'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

type CookieConsentPropsType = {
  params: { locale: LocaleTypes }
}

const CookieConsent = ({ params: { locale } }: CookieConsentPropsType) => {
  const [showConsent, setShowConsent] = useState(false)
  const { t } = useTranslation(locale, 'cookies')

  useEffect(() => {
    const consent = Cookies.get('cookie_consent')
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    Cookies.set('cookie_consent', 'true', { expires: 365 })
    closeCookies()
  }

  const closeCookies = () => {
    setShowConsent(false)
  }

  return (
    showConsent && (
      <div className="bg-white-800 sticky bottom-5 left-5 right-5 rounded-xl border bg-white p-4 shadow-md dark:border-none dark:bg-gray-800 md:fixed">
        <p className="text-2xl font-bold">{t('title')} 🍪</p>
        <p>{t('primary_text')}</p>
        <p className="mt-4 text-lg font-bold">{t('secondary_title')}</p>
        <p>{t('reason1')}</p>
        <p>{t('reason2')}</p>
        <p>{t('reason3')}</p>
        <p className="mb-8 mt-2">{t('advice')}</p>
        <div className="flex flex-col gap-5 md:flex-row">
          <button
            onClick={acceptCookies}
            className={
              'cursor-pointer rounded-md border-4 border-primary-500 bg-primary-500 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400'
            }
            type="submit"
          >
            {t('accept_cookies_button')} 🍪
          </button>
          <button
            onClick={closeCookies}
            className={
              'cursor-pointer rounded-md border-4 border-primary-500 px-4 py-2 font-medium text-primary-500 transition hover:bg-primary-700 hover:text-white focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400 dark:hover:text-white'
            }
            type="submit"
          >
            {t('close_cookies_button')}
          </button>
        </div>
      </div>
    )
  )
}

export default CookieConsent
