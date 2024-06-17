import ContactPage from '@/components/ContactPage'
import { Metadata } from 'next'
import { createTranslation } from '../i18n/server'
import { genPageMetadata } from '../seo'
import { LocaleTypes } from '../i18n/settings'

type ContactProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: ContactProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'contact')
  return genPageMetadata({
    title: t('contact'),
    params: { locale: locale },
  })
}

const Contact = () => {
  return <ContactPage />
}

export default Contact
