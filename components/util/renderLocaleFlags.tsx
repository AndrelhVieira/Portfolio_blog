export default function renderLocaleFlags(newLocale: string) {
  switch (newLocale) {
    case 'en':
      return '🇬🇧'
    case 'pt-BR':
      return '🇧🇷'
    case 'es':
    default:
      return '🇪🇸'
  }
}
