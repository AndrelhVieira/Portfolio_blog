'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { LocaleTypes } from '../i18n/settings'
import { useTranslation } from '../i18n/client'

const PrintButton = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'curriculum')

  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className={
        'mx-auto mt-12 flex max-w-96 cursor-pointer items-center gap-3 rounded-md bg-primary-500 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400'
      }
      id="invisible"
    >
      <FiDownload />
      {t('download_cv')}
    </button>
  )
}

export default PrintButton
