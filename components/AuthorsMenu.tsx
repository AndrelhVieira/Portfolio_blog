'use client'

import Link from 'next/link'
import { Authors, allAuthors } from 'contentlayer/generated'
import { Fragment, useRef, useState } from 'react'
import { Menu, RadioGroup, Transition } from '@headlessui/react'
import { useOuterClick } from './util/useOuterClick'
import { useParams, usePathname } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type AuthorsMenuProps = {
  className: string
}

type MenuOptions = Array<{
  key: string
  title: string
  href: string
}>

const AuthorsMenu = ({ className }: AuthorsMenuProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]

  const MENU_OPTIONS: MenuOptions = [
    { key: 'about', title: t('about'), href: `/${locale}/about/andrevieira` },
    { key: 'skills', title: 'Skills', href: `/${locale}/skills` },
    { key: 'contact', title: t('contact'), href: `/${locale}/contact` },
    { key: 'curriculum', title: 'Curriculum', href: '/curriculum' },
  ]

  const pathname = usePathname()
  const sections = pathname!.split('/')
  const lastSection = sections[sections.length - 1]
  const filterSections = pathname !== `/${locale}` && pathname !== '/'
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, closeMenu)

  return (
    <div ref={menubarRef} className={className}>
      <Menu as="div" className="relative inline-block text-left font-medium leading-5">
        <div
          className={`
            ${
              authors.some((author) => author.slug.includes(lastSection)) && filterSections
                ? 'text-primary-500 dark:text-primary-500'
                : ''
            } flex
            `}
        >
          <Menu.Button
            className="flex transform-gpu items-center space-x-1 transition-transform duration-300"
            onClick={toggleMenu}
          >
            {t('about')}
          </Menu.Button>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <Transition
          as={Fragment}
          show={isOpen}
          enter="transition-all ease-out duration-300"
          enterFrom="opacity-0 scale-95 translate-y-[-10px]"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition-all ease-in duration-200"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 translate-y-[10px]"
        >
          <Menu.Items
            className="absolute right-0 z-50 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
            as="div"
          >
            <RadioGroup>
              <div className="p-1">
                {MENU_OPTIONS.map((menu) => {
                  const { href, key, title } = menu
                  return (
                    <RadioGroup.Option key={key} value={key}>
                      {({ active }) => (
                        <Menu.Item>
                          <div
                            className={`${
                              active
                                ? 'bg-gray-100 dark:bg-gray-600'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary-500 dark:hover:text-primary-500`}
                          >
                            <Link href={href} onClick={closeMenu} className="w-full">
                              {title}
                            </Link>
                          </div>
                        </Menu.Item>
                      )}
                    </RadioGroup.Option>
                  )
                })}
              </div>
            </RadioGroup>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default AuthorsMenu
