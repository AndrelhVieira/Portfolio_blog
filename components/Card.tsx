import React from 'react'
import Image from './Image'
import Link from './Link'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import { Github } from './social-icons/icons'

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

type CardPropsType = {
  title: string
  description: string
  imgSrc?: string
  href?: string
  githubLink?: string
  soon?: boolean
  freela?: boolean
}

const Card: React.FC<CardPropsType> = ({
  title,
  description,
  imgSrc,
  href,
  freela,
  githubLink,
  soon,
}) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'projects')
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'linear' }}
      className="md max-w-[544px] p-4 md:w-1/2"
    >
      <div
        className={`${
          imgSrc && 'h-full'
        }  flex flex-col overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc &&
          (href ? (
            <Link
              href={href.startsWith('http') ? href : `/${locale}${href}`}
              aria-label={`${t('linkto')}${title}`}
            >
              <Image
                alt={title}
                title={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              title={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          ))}
        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <div className="mb-3 flex flex-wrap justify-between gap-2">
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                {href ? (
                  <Link
                    href={href.startsWith('http') ? href : `/${locale}${href}`}
                    aria-label={`${t('linkto')}${title}`}
                  >
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </h2>
              {freela ? (
                <span className="inline-flex items-center rounded-3xl bg-heading-50 px-2 py-1 text-xs font-medium text-heading-600 ring-1 ring-inset ring-gray-500/10">
                  Freelancer
                </span>
              ) : null}
              {soon ? (
                <span className="inline-flex items-center rounded-3xl bg-primary-50 px-2 py-1 text-xs font-medium text-primary-600 ring-1 ring-inset ring-gray-500/10">
                  {t('soon')}
                </span>
              ) : null}
            </div>
            <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-5 ">
            {href && (
              <Link
                href={href.startsWith('http') ? href : `/${locale}${href}`}
                className="rounded-md border-2 border-primary-500 px-2 py-1 text-base font-medium leading-6 text-primary-500 transition hover:text-primary-600 focus:ring-2 focus:ring-offset-2 dark:hover:text-primary-400"
                aria-label={`${t('linkto')}${title}`}
              >
                {href.startsWith('http') ? `${t('visit')}` : `${t('read')}`} &rarr;
              </Link>
            )}
            {githubLink && (
              <Link
                href={githubLink.startsWith('http') ? githubLink : `/${locale}${githubLink}`}
                className="align-center dark:color-[#24292e] dark:hover:none flex rounded-md border-2 border-[#24292e] px-2 py-1 font-medium text-[#24292e] transition focus:ring-2 focus:ring-offset-2 dark:bg-white"
                aria-label={`${t('linkto')}${title}`}
              >
                <div className="flex items-center gap-2">
                  <p>Github</p>
                  <Github width={25} height={25} color="#f00" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default Card
