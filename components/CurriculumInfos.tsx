import { personalData } from '@/data/contactData'
import siteMetadata from '@/data/siteMetadata'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import React from 'react'
import SocialIcon from './social-icons'

export default async function CurriculumInfos({ locale }: { locale: LocaleTypes }) {
  const { t } = await createTranslation(locale, 'curriculum')

  return (
    <div>
      <div className="flex flex-col flex-wrap items-center gap-3 pt-5 text-gray-600 dark:text-gray-300 sm:flex-row sm:justify-center sm:gap-x-10">
        <p>{siteMetadata.email}</p>
        <p>{personalData.phoneNumber}</p>
        <p>{t('gender')}</p>
        <p>{t('birthdate')}</p>
        <p>{t('location')}</p>
        <p>{t('nationality')}</p>
        <p>{t('marital_status')}</p>
        <p>{t('location_availability')}</p>
      </div>
      <div className="flex flex-col flex-wrap items-center gap-5 pt-5 text-gray-600 sm:flex-row sm:justify-center sm:gap-x-10">
        <div className="flex items-center">
          <SocialIcon kind="github" href={siteMetadata.github} size={6} showUserPath />
        </div>
        <div className="flex items-center">
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin!} size={6} showUserPath />
        </div>
      </div>
    </div>
  )
}
