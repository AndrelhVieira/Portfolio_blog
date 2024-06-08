import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { LocaleTypes } from '../i18n/settings'
import { createTranslation } from '../i18n/server'

import {
  Canva,
  Css,
  Figma,
  Filezilla,
  Git,
  Github,
  Gitlab,
  Html,
  Java,
  Javascript,
  Jest,
  Markdown,
  MaterialUI,
  MySQL,
  Next,
  Npm,
  OhMyZsh,
  Php,
  Postgresql,
  Python,
  ReactIcon,
  ReactNavigation,
  Redux,
  Sass,
  SonarQube,
  Storybook,
  Tailwind,
  Typescript,
  Ubuntu,
  Vercel,
  Yarn,
} from 'public/static/icons'

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
      <div className="items-start space-y-2 pt-8">
        <div className="flex flex-col gap-5">
          <div className="mb-10">
            <h3 className="text-xl font-bold">{t('main')}</h3>
            <div className="flex flex-shrink-0 flex-wrap items-stretch justify-between gap-10">
              <div className="flex flex-col items-center gap-2">
                <ReactIcon width={75} height={75} />
                <p>React</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Javascript width={75} height={75} />
                <p>Javascript</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Typescript width={75} height={75} />
                <p>Typescript</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Next width={75} height={75} />
                <p>Next</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Css width={75} height={75} />
                <p>Css</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Git width={75} height={75} />
                <p>Git</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Html width={75} height={75} />
                <p>Html</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Java width={75} height={75} />
                <p>Java</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Jest width={75} height={75} />
                <p>Jest</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MySQL width={75} height={75} />
                <p>MySQL</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Php width={75} height={75} />
                <p>Php</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Postgresql width={75} height={75} />
                <p>Postgresql</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Python width={75} height={75} />
                <p>Python</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Sass width={75} height={75} />
                <p>Sass</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Tailwind width={75} height={75} />
                <p>Tailwind</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Github width={75} height={75} />
                <p>Github</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Gitlab width={75} height={75} />
                <p>Gitlab</p>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="text-xl font-bold">Design</h3>
            <div className="justify- flex flex-shrink-0 flex-wrap gap-10">
              <div className="flex flex-col items-center gap-2">
                <Canva width={75} height={75} />
                <p>Canva</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Figma width={75} height={75} />
                <p>Figma</p>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="mb-3 text-xl font-bold">{t('others')}</h3>
            <div className="flex flex-shrink-0 flex-wrap items-stretch justify-between gap-10">
              <div className="flex flex-col items-center gap-2">
                <OhMyZsh width={75} height={75} />
                <p>OhMyZsh</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Redux width={75} height={75} />
                <p>Redux</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SonarQube width={75} height={75} />
                <p>SonarQube</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Storybook width={75} height={75} />
                <p>Storybook</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Ubuntu width={75} height={75} />
                <p>Ubuntu</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Vercel width={75} height={75} />
                <p>Vercel</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Yarn width={75} height={75} />
                <p>Yarn</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Npm width={75} height={75} />
                <p>Npm</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ReactNavigation width={75} height={75} />
                <p>React Navigation</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Markdown width={75} height={75} />
                <p>Markdown</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MaterialUI width={75} height={75} />
                <p>MaterialUI</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Filezilla width={75} height={75} />
                <p>Filezilla</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsPage
