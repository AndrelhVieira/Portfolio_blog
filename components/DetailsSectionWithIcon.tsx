import React from 'react'

type DetailsSectionWithIconPropsType = {
  icon: React.ReactElement
  title: string
  text: string
  filled?: boolean
  horizontal?: boolean
}

const DetailsSectionWithIcon = ({
  icon,
  text,
  title,
  filled = false,
  horizontal = false,
}: DetailsSectionWithIconPropsType) => {
  return (
    <div
      className={`flex ${horizontal ? 'flex-row items-start gap-5' : 'flex-col items-center sm:items-start'}`}
    >
      <div
        className={`rounded-md p-2 text-primary-500 ring-2 ring-primary-500 ${filled ? 'bg-primary-500 text-white' : null}`}
      >
        {icon}
      </div>
      <div className={`${horizontal ? 'mt-0' : 'mt-4'}`}>
        <dt className="font-semibold text-primary-500">{title}</dt>
        <dd
          className={`mt-2 leading-7 text-gray-600 dark:text-gray-400 sm:text-start ${horizontal ? 'text-start' : 'text-center'}`}
        >
          {text}
        </dd>
      </div>
    </div>
  )
}

export default DetailsSectionWithIcon
