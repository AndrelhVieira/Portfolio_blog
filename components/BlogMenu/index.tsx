'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon, TagIcon } from '@heroicons/react/20/solid'
import { RiReactjsFill } from 'react-icons/ri'
import { LuFileStack } from 'react-icons/lu'
import { PiClockClockwise } from 'react-icons/pi'
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Link from 'next/link'
import { useTagStore } from '../util/useTagStore'

type MenuType = {
  name: string
  description: string
  href: string
  icon: any
  tag?: 'mobile' | 'react'
}

type BlogMenuPropsType = {
  params: { locale: LocaleTypes }
}

export default function BlogMenu({ params: { locale } }: BlogMenuPropsType) {
  const [isOpen, setIsOpen] = useState(false)
  const { setSelectedTag } = useTagStore()
  const pathname = usePathname()
  const { t } = useTranslation(locale, 'common')

  const blog: MenuType[] = [
    {
      name: t('blog_menu.latest.label'),
      description: t('blog_menu.latest.description'),
      href: `/${locale}/blog/latest`,
      icon: PiClockClockwise,
    },
    {
      name: t('blog_menu.all_posts.label'),
      description: t('blog_menu.all_posts.description'),
      href: `/${locale}/blog`,
      icon: LuFileStack,
    },
    {
      name: t('blog_menu.all_tags.label'),
      description: t('blog_menu.all_tags.description'),
      href: `/${locale}/tags`,
      icon: TagIcon,
    },
    {
      name: t('blog_menu.react.label'),
      description: t('blog_menu.react.description'),
      href: `/${locale}/blog`,
      icon: RiReactjsFill,
      tag: 'react',
    },
    {
      name: t('blog_menu.mobile.label'),
      description: t('blog_menu.mobile.description'),
      href: `/${locale}/blog`,
      icon: DevicePhoneMobileIcon,
      tag: 'mobile',
    },
  ]

  const handleClick = useCallback(
    (item: MenuType) => {
      if (item.href !== `/${locale}/blog`) {
        closeMenu()
        return
      }

      setSelectedTag(item.tag!)
      closeMenu()
    },
    [setSelectedTag]
  )

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const popoverPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverPanelRef.current && !popoverPanelRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isSelected = pathname!.includes('/blog' as string)

  return (
    <Popover className="relative hidden outline-none md:block">
      <PopoverButton
        className={`inline-flex items-center gap-x-1 font-medium leading-6 text-gray-900
            ${isSelected ? 'text-primary-500' : 'text-gray-900 dark:text-gray-100'}`}
        onClick={toggleMenu}
      >
        <p>Blog</p>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </PopoverButton>

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
        <PopoverPanel
          ref={popoverPanelRef}
          className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-5xl -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800">
            <div className="p-4">
              {blog.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-500"
                >
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-600 dark:group-hover:bg-gray-800">
                    <item.icon
                      className="h-6 w-6 text-gray-600 group-hover:text-primary-600 dark:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <Link
                      href={item.href}
                      className="font-semibold text-gray-900 dark:text-white"
                      onClick={() => handleClick(item)}
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </Link>
                    <p className="mt-1 text-gray-600 dark:text-white">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
