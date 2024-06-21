import Image from 'next/image'
import React from 'react'
import { FaReact } from 'react-icons/fa'

import avatar from 'public/static/images/avatar.png'
import BackgroundContent from './BackgroundContent'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { createTranslation } from 'app/[locale]/i18n/server'
import TechTitle from './TechTitle'

type PresentationContentPropsType = {
  params: { locale: LocaleTypes }
}

const PresentationContent = async ({ params: { locale } }: PresentationContentPropsType) => {
  const { t } = await createTranslation(locale, 'home')

  const renderTitleText = (text: string) => (
    <p className="font-jost text-4xl font-extrabold uppercase leading-snug sm:text-5xl md:text-7xl lg:text-9xl">
      {text}
    </p>
  )

  return (
    <section className="mx-auto flex flex-col items-center">
      <BackgroundContent params={{ locale }} />
      <div className="absolute flex w-full flex-col items-center justify-between gap-10 px-1 sm:top-48 sm:flex-row xl:max-w-screen-xl">
        <div className="mx-auto flex flex-col items-center self-baseline sm:mx-0 sm:items-baseline sm:self-auto">
          <div className="text-[40px] lg:text-[100px]">
            <FaReact color="#61DAFB" className="animate-spin-slow" />
          </div>
          <div className="flex flex-col-reverse items-center gap-5 sm:flex-row">
            <TechTitle />
          </div>
          <p className="text-xl md:text-2xl">{t('greeting')} André Luiz Vieira</p>
          {renderTitleText('Developer')}
        </div>
        <div>
          <Image
            src={avatar}
            alt="André Luiz profile image"
            width={300}
            className="h-[200px] w-[200px] rounded-[50%] border-4 border-primary-500 md:h-[250px] md:w-[250px] xl:h-[300px] xl:w-[300px]"
          />
        </div>
      </div>
    </section>
  )
}

export default PresentationContent
