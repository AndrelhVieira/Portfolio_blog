import React, { HTMLAttributes, ReactNode } from 'react'
import { useKBar } from 'kbar'

interface KbarButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

/**
 * Button wrapper component that triggers the KBar modal on click.
 *
 * @return {*}
 */
export const KBarButton: React.FC<KbarButtonProps> = ({ children, ...rest }) => {
  const { query } = useKBar()

  return (
    <button {...rest} onClick={() => query.toggle()}>
      {children}
    </button>
  )
}
