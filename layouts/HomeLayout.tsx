import PresentationContent from '@/components/PresentationContent'
import { createTranslation } from '../app/[locale]/i18n/server'
import { LocaleTypes } from '../app/[locale]/i18n/settings'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import Project from 'app/[locale]/projects/project'
import Link from '@/components/Link'
import TechCarouselForHome from 'app/[locale]/skills/TechCarouselForHome'
import TechsMobileForHome from 'app/[locale]/skills/TechsMobileForHome'
import PostList from '@/components/PostList'

type PostType = {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
}

type HomePropsType = {
  posts: PostType[]
  params: { locale: LocaleTypes }
}

const MAX_DISPLAY = 3

export default async function HomeLayout({ posts, params: { locale } }: HomePropsType) {
  const { t } = await createTranslation(locale, 'common')
  return (
    <div className="flex flex-col gap-10">
      <PresentationContent params={{ locale }} />
      <div className="flex flex-col items-center">
        <p className="text-center text-2xl font-bold uppercase text-primary-500">{t('title')}</p>
        <div className="mt-4 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={10} />
          <div className="flex items-center">
            <SocialIcon kind="github" href={siteMetadata.github} size={10} />
          </div>
          {/* <div className="flex items-center">
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={10} />
            </div> */}
          <div className="flex items-center">
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin!} size={10} />
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
          href={`/${locale}/projects`}
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
          href={`/${locale}/about/andrevieira`}
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
          href={`/${locale}/skills`}
        >
          {t('more')}
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold">Posts</h2>
        <p className="">{t('posts_text')}</p>
        <PostList params={{ locale }} posts={posts} max_display={MAX_DISPLAY} />
        <Link
          className={
            'mx-auto mt-4 cursor-pointer rounded-md bg-primary-500 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400'
          }
          href={`/${locale}/blog`}
        >
          {t('more_blog')}
        </Link>
      </div>
    </div>
  )
}
