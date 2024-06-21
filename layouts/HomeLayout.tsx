import PresentationContent from '@/components/PresentationContent'
import { createTranslation } from '../app/[locale]/i18n/server'
import { LocaleTypes } from '../app/[locale]/i18n/settings'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import Project from 'app/[locale]/projects/project'
import Link from 'next/link'
import TechCarouselForHome from 'app/[locale]/skills/TechCarouselForHome'
import TechsMobileForHome from 'app/[locale]/skills/TechsMobileForHome'

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
}

interface HomeProps {
  posts: Post[]
  params: { locale: LocaleTypes }
}

const MAX_DISPLAY = 5

export default async function HomeLayout({ posts, params: { locale } }: HomeProps) {
  const { t } = await createTranslation(locale, 'common')
  return (
    <div className="flex flex-col gap-10">
      <PresentationContent params={{ locale }} />
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold uppercase text-primary-500">{t('title')}</p>
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center">
            <SocialIcon kind="github" href={siteMetadata.github} size={10} />
          </div>
          {/* <div className="flex items-center">
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={10} />
            </div> */}
          <div className="flex items-center">
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={10} />
          </div>
          <div className="flex items-center">
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={10} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-4xl font-bold">{t('projects')}</h2>
        <div className="flex flex-col items-center md:flex-row md:items-stretch">
          <Project projectsToShow={['Barberstone', 'User Finder']} />
        </div>
        <Link
          className={
            'mx-auto mt-4 cursor-pointer rounded-md bg-primary-500 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400'
          }
          href="/projects"
        >
          {t('more_projects')}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">{t('about')}</h2>
        <div className="flex">
          <p>{t('about_me')}</p>
        </div>
        <Link
          className={
            'mx-auto mt-4 cursor-pointer rounded-md bg-primary-500 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400'
          }
          href="/about/andrevieira"
        >
          {t('more')}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">{t('skills')}</h2>
        <div className="flex">
          <TechCarouselForHome params={{ locale }} />
          <TechsMobileForHome />
        </div>
        <Link
          className={
            'mx-auto mt-4 cursor-pointer rounded-md bg-primary-500 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400'
          }
          href="/skills"
        >
          {t('more')}
        </Link>
      </div>
    </div>
  )
}
