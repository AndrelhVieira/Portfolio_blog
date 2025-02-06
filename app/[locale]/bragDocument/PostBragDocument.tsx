import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { BragDocument } from 'contentlayer/generated'

import SectionContainer from '@/components/SectionContainer'
import { LocaleTypes } from '../i18n/settings'

interface PostBragDocumentProps {
  locale: LocaleTypes
  content: CoreContent<BragDocument>
  children: ReactNode
}

export default async function PostBragDocumentLayout({ children }: PostBragDocumentProps) {
  return (
    <SectionContainer>
      <article>
        <div>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
