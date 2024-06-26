import ContactPage from '@/components/ContactPage'
import { Metadata } from 'next'
import { createTranslation } from '../i18n/server'
import { genPageMetadata } from '../seo'
import { LocaleTypes } from '../i18n/settings'
import { Bounce, ToastContainer } from 'react-toastify'

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
  return (
    <>
      <ContactPage />
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
    </>
  )
}

export default Contact
