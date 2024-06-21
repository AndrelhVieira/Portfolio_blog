export default function renderLocaleFlags(newLocale: string) {
  switch (newLocale) {
    case 'en':
      return '🇬🇧'
      break
    case 'pt-BR':
      return '🇧🇷'
      break
    case 'en':
    default:
      return '🇪🇸'
  }
}
