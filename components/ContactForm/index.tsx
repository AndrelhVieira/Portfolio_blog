'use client'

import React from 'react'

import emailjs from 'emailjs-com'
import { Bounce, toast } from 'react-toastify'
import { useTheme } from '@/components/theme/ThemeContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { countries } from './countries'

const ContactForm = () => {
  const { theme } = useTheme()

  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'contact')

  const schema = yup.object().shape({
    firstName: yup.string().required(t('validations.firstName')),
    lastName: yup.string().required(t('validations.lastName')),
    email: yup.string().email(t('validations.invalid_email')).required(t('validations.email')),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref('email')], t('validations.emailMatch'))
      .required(t('validations.confirmEmail')),
    country: yup.string().required(t('validations.country')),
    subject: yup.string().required(t('validations.subject')),
    message: yup.string().required(t('validations.message')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const sendEmail = (data: any) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!
    const templateId = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!
    const userId = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY!

    console.log({ serviceId })
    console.log({ templateId })
    console.log({ userId })

    if (!serviceId || !templateId || !userId) {
      console.error('Faltando configurações do EmailJS.')
      toast.error(t('error_on_emailjs'), {
        position: 'top-center',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      })
      return
    }

    const templateParams = {
      to_name: 'André',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      confirmEmail: data.confirmEmail,
      country: data.country,
      subject: data.subject,
      message: data.message,
    }

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text)
        toast.success(t('email_sent'), {
          position: 'top-center',
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
          transition: Bounce,
        })
        reset()
      },
      (error) => {
        console.log('FAILED...', error)
        alert('Falha ao enviar o email.')
      }
    )
  }

  const onSubmit = (data: any) => {
    sendEmail(data)
  }

  const subjectOptions: string[] = t('fields.subject_options', { returnObjects: true }) as string[]

  return (
    <div className="flex flex-col gap-10" id="contact">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('title_text_1')}
          <br />
          {t('title_text_2')}
        </h1>
        <h2>{t('subtitle')}</h2>
      </div>
      <div>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-7 xl:flex-row xl:gap-10">
            <div className="flex w-full flex-col font-light">
              <p className="text-xs text-gray-400">01</p>
              <label className="font-semibold">{t('fields.firstName')}</label>
              <input
                type="text"
                className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
                id="firstName"
                placeholder="John"
                {...register('firstName')}
              />
              {errors.firstName && (
                <span className="text-primary-500">{errors.firstName.message}</span>
              )}
            </div>
            <div className="flex w-full flex-col font-light">
              <p className="text-xs text-gray-400">02</p>
              <label className="font-semibold">{t('fields.lastName')}</label>
              <input
                type="text"
                className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
                id="lastName"
                placeholder="Doe"
                {...register('lastName')}
              />
              {errors.lastName && (
                <span className="text-primary-500">{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col font-light">
            <p className="text-xs text-gray-400">03</p>
            <label className="font-semibold">{t('fields.email')}</label>
            <input
              type="text"
              className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
              id="email"
              placeholder="john.doe@email.com"
              {...register('email')}
            />
            {errors.email && <span className="text-primary-500">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col font-light">
            <p className="text-xs text-gray-400">04</p>
            <label className="font-semibold">{t('fields.confirmEmail')}</label>
            <input
              type="text"
              className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
              id="confirmEmail"
              placeholder="john.doe@email.com"
              {...register('confirmEmail')}
            />
            {errors.confirmEmail && (
              <span className="text-primary-500">{errors.confirmEmail.message}</span>
            )}
          </div>
          <div className="flex flex-col font-light">
            <p className="text-xs text-gray-400">05</p>
            <label className="font-semibold">{t('fields.country')}</label>
            <select
              className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
              id="country"
              {...register('country')}
            >
              <option value="" disabled selected>
                {t('fields.country')}
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <span className="text-primary-500">{errors.country.message}</span>}
          </div>
          <div className="flex flex-col font-light">
            <p className="text-xs text-gray-400">06</p>
            <label className="font-semibold">{t('fields.subject')}</label>
            <select
              className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
              id="subject"
              {...register('subject')}
            >
              <option value="" disabled selected>
                {t('fields.subject_placeholder')}
              </option>
              {subjectOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.subject && <span className="text-primary-500">{errors.subject.message}</span>}
          </div>
          <div className="flex flex-col font-light">
            <p className="text-xs text-gray-400">07</p>
            <label className="font-semibold">{t('fields.message')}</label>
            <textarea
              className="border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent pl-0 transition placeholder:text-gray-400 focus:border-b-heading-400 focus:ring-0 focus:ring-offset-0"
              id="message"
              placeholder="Lorem ipsum dolor sit amet..."
              {...register('message')}
            />
            {errors.message && <span className="text-primary-500">{errors.message.message}</span>}
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
  )
}

export default ContactForm
