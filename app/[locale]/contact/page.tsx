'use client'

import Image from 'next/image'
import { LocaleTypes } from '../i18n/settings'

import AvatarImage from 'public/static/images/avatar.png'
import siteMetadata from '@/data/siteMetadata'
import { personalData } from '@/data/contactData'
import emailjs from 'emailjs-com'
import { useParams } from 'next/navigation'
import { useTranslation } from '../i18n/client'
import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
  })

  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'contact')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const sendEmail = (e) => {
    e.preventDefault()

    const serviceId = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!
    const templateId = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!
    const userId = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY!

    if (!serviceId || !templateId || !userId) {
      console.error('Faltando configurações do EmailJS.')
      // TODO: Melhorar apresentação de erros
      alert(t('error_on_emailjs'))
      return
    }

    emailjs.send(serviceId, templateId, formData, userId).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text)
        alert('Email enviado com sucesso!')
      },
      (error) => {
        console.log('FAILED...', error)
        alert('Falha ao enviar o email.')
      }
    )

    e.target.reset()
  }

  return (
    <div className="flex flex-col md:flex-row-reverse md:gap-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('title_text_1')}
            <br />
            {t('title_text_2')}
          </h1>
          <h2>{t('subtitle')}</h2>
        </div>
        <div>
          <form className="flex flex-col gap-7" onSubmit={sendEmail}>
            <div className="flex flex-col font-light">
              <p className="text-xs text-gray-400">01</p>
              <label className="font-semibold">{t('fields.name')}</label>
              <input
                type="text"
                className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
                id="name"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col font-light">
              <p className="text-xs text-gray-400">02</p>
              <label className="font-semibold">{t('fields.email')}</label>
              <input
                type="text"
                className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
                id="email"
                name="email"
                placeholder="john@doe.com"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col font-light">
              <p className="text-xs text-gray-400">03</p>
              <label className="font-semibold">{t('fields.subject')}</label>
              <input
                type="text"
                className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
                id="subject"
                name="subject"
                placeholder={t('fields.subject_placeholder')}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col font-light">
              <p className="text-xs text-gray-400">04</p>
              <label className="font-semibold">{t('fields.message')}</label>
              <textarea
                className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
                id="message"
                name="message"
                placeholder={t('fields.message_placeholder')}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-primary-500 p-10 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400"
              >
                {t('fields.send')}
              </button>
            </div>
          </form>
          <div className="pb-10 pt-5">
            <p>{t('note_about_respond')}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={AvatarImage}
          alt="avatar"
          title="avatar"
          width={192}
          height={192}
          className="inset-border border-10 h-48 w-48 rounded-full border-4 border-primary-500"
        />
        <div className="flex flex-col gap-4 pt-5 text-center">
          <div>
            <p className="text-lg font-bold uppercase text-primary-500">{t('details.contact')}</p>
            <p className="leading-10">{siteMetadata.email}</p>
            <p className="leading-10">🇧🇷 {personalData.phoneNumber}</p>
          </div>
          <div>
            <p className="text-lg font-bold uppercase text-primary-500">{t('details.personal')}</p>
            <p className="leading-10">{t('details.nationality')}</p>
            <p className="leading-10">{t('details.location')}</p>
          </div>
          <div>
            <p className="text-lg font-bold uppercase text-primary-500">{t('details.socials')}</p>
            {/* TODO: Adicionar redes sociais */}
          </div>
          <div className="pt-15 flex flex-col gap-5">
            <p className="text-lg uppercase">{t('cv.check_text')}</p>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-heading-500 p-10 px-4 py-2 font-bold text-white transition hover:bg-heading-700 focus:ring-2 focus:ring-heading-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-heading-400"
            >
              CURRICULUM
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
