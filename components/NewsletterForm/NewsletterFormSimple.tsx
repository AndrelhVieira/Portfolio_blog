'use client'

import React, { useCallback } from 'react'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useTheme } from 'next-themes'

export type NewsletterFormSimplePropsType = {
  title?: string
  apiUrl?: string
}

const NewsletterFormSimple = ({ apiUrl }: NewsletterFormSimplePropsType) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'newsletter')
  const { theme } = useTheme()

  const handleSubscribe = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formData = new FormData(event.target as HTMLFormElement)
      const email = formData.get('email')

      console.log(
        'process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY - ',
        process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY
      )
      console.log('email - ', email)

      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.ready(async () => {
          try {
            const token = await grecaptcha.execute(
              process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!,
              {
                action: 'submit',
              }
            )
            const recaptchaResponse = await fetch('/recaptcha', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token, email }),
            })

            const recaptchaResult = await recaptchaResponse.json()

            if (recaptchaResult.success && recaptchaResult.score > 0.6) {
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
            } else {
              toast.error(t('recaptchaFailed'), {
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
            }
          } catch (error) {
            console.error('Error during reCAPTCHA execution', error)
            toast.error(t('recaptchaFailed'), {
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
          }
        })
      } else {
        toast.error(t('recaptchaLoadFailed'), {
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
      }
    },
    [t, theme]
  )

  return (
    <>
      <div className="max-w-xl">
        <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
          {t('title')}
        </div>
        <p className="pb-3">{t('subtitle')}</p>
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
                className="w-full rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black sm:w-72"
                id="email-input"
                name="email"
                placeholder={t('placeholderDefault')}
                required
                type="email"
              />
            </label>
          </div>
          <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0 sm:w-72">
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
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
    </>
  )
}

export default NewsletterFormSimple
