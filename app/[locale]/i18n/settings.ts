import type { InitOptions } from 'i18next'
import { fallbackLng, secondLng, thirdyLng } from './locales'

export const locales = [fallbackLng, secondLng, thirdyLng] as const
export type LocaleTypes = (typeof locales)[number]
export const defaultNS = 'common'

export function getOptions(locale = fallbackLng, ns = defaultNS): InitOptions {
  return {
    debug: true,
    supportedLngs: locales,
    fallbackLng,
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
