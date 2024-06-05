import React from 'react'

type CustomTitlePropsType = {
  children: React.ReactNode
}

const CustomTitle: React.FC<CustomTitlePropsType> = ({ children }) => {
  return (
    <h3 className="mb-2 mt-5 text-xl font-bold uppercase tracking-wide underline">{children}</h3>
  )
}

export default CustomTitle
