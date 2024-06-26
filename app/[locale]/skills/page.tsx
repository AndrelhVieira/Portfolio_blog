import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { LocaleTypes } from '../i18n/settings'
import { createTranslation } from '../i18n/server'

import TechCarousel from './TechCarousel'
import TechsMobile from './TechsMobile'
import { Bounce, ToastContainer } from 'react-toastify'

type SkillsProps = {
  params: { skills: string[]; locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: SkillsProps): Promise<Metadata> {
  return genPageMetadata({
    title: 'Skills',
    params: { locale: locale },
  })
}

const SkillsPage = async ({ params: { locale } }: SkillsProps) => {
  const { t } = await createTranslation(locale, 'skills')
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Skills
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
      </div>
      <TechCarousel params={{ locale }} />
      <TechsMobile params={{ locale }} />
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
    </div>
  )
}

export default SkillsPage
