import type { ComponentType, SvgProps } from 'react'

declare module '*.svg' {
  const content: ComponentType<SvgProps>

  // eslint-disable-next-line import/no-unused-modules
  export default content
}
