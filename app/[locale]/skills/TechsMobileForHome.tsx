import React from 'react'

import {
  Figma,
  Git,
  Java,
  Javascript,
  Next,
  Php,
  Python,
  ReactIcon,
  Tailwind,
  Typescript,
} from 'public/static/icons'

const TechsMobileForHome = async () => {
  return (
    <div className="items-start space-y-2 pt-8 xl:hidden">
      <div className="flex flex-col gap-5">
        <div className="mb-10">
          <div className="flex flex-shrink-0 flex-wrap items-stretch justify-between gap-10">
            <div className="flex flex-col items-center gap-2">
              <Javascript width={75} height={75} />
              <p>Javascript</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Next width={75} height={75} />
              <p>Next</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ReactIcon width={75} height={75} />
              <p>React</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Typescript width={75} height={75} />
              <p>Typescript</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Tailwind width={75} height={75} />
              <p>Tailwind</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Java width={75} height={75} />
              <p>Java</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Php width={75} height={75} />
              <p>Php</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Git width={75} height={75} />
              <p>Git</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechsMobileForHome
