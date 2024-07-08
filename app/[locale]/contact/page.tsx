import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { LocaleTypes } from '../i18n/settings'
import { Bounce, ToastContainer } from 'react-toastify'

import Image from 'next/image'

import AvatarImage from 'public/static/images/avatar.png'
import siteMetadata from '@/data/siteMetadata'
import { personalData } from '@/data/contactData'

import { IoCallOutline } from 'react-icons/io5'
import { MdOutlineEmail } from 'react-icons/md'
import { LuMapPin } from 'react-icons/lu'
import { createTranslation } from 'app/[locale]/i18n/server'
import ContactForm from '@/components/ContactForm'
import SocialIcon from '@/components/social-icons'
import { FaRegFileLines } from 'react-icons/fa6'
import Link from '@/components/Link'

type ContactPagePropsType = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({
  params: { locale },
}: ContactPagePropsType): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'contact')
  return genPageMetadata({
    title: t('contact'),
    params: { locale: locale },
  })
}

export default async function Page({ params: { locale } }: ContactPagePropsType) {
  const { t } = await createTranslation(locale, 'contact')

  return (
    <div className="flex flex-col md:flex-row-reverse md:gap-20">
      <ContactForm />
      <div className="flex flex-col items-center">
        <Image
          src={AvatarImage}
          alt="avatar"
          title="avatar"
          width={192}
          height={192}
          className="inset-border border-10 hidden h-48 w-48 rounded-full border-4 border-primary-500 md:block"
        />
        <div className="flex flex-col gap-4 pt-5 text-center">
          <div>
            <p className="text-lg font-bold uppercase text-primary-500">{t('details.contact')}</p>
            <div className="flex items-center justify-center gap-3">
              <MdOutlineEmail /> <p className="leading-10">{siteMetadata.email}</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <IoCallOutline /> <p className="leading-10">{personalData.phoneNumber}</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-bold uppercase text-primary-500">{t('details.personal')}</p>
            <div className="flex items-center justify-center gap-3">
              🇧🇷 <p className="leading-10">{t('details.nationality')}</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <LuMapPin />
              <p className="leading-10">{t('details.location')}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold uppercase text-primary-500">{t('details.socials')}</p>
            <div className="mt-4 flex space-x-4">
              <div className="flex items-center">
                <SocialIcon kind="github" href={siteMetadata.github} size={6} />
              </div>
              {/* <div className="flex items-center">
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
            </div> */}
              <div className="flex items-center">
                <SocialIcon kind="linkedin" href={siteMetadata.linkedin!} size={6} />
              </div>
              <div className="flex items-center">
                <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
              </div>
            </div>
          </div>
          <div className="pt-15 flex flex-col gap-5">
            <Link
              href={`/${locale}/curriculum`}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary-500 p-10 px-4 py-2 font-bold text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400"
            >
              <FaRegFileLines />
              CURRICULUM
            </Link>
          </div>
        </div>
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
    </div>
  )
}
