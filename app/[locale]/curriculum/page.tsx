import { Metadata } from 'next'
import { Curriculum, allCurriculums } from 'contentlayer/generated'
import { genPageMetadata } from 'app/[locale]/seo'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import PostCurriculumLayout from './PostCurriculum'
import PrintButton from './PrintButton'

type CurriculumProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: CurriculumProps): Promise<Metadata> {
  return genPageMetadata({
    title: 'Curriculum',
    params: { locale: locale },
  })
}

const CustomTitle = ({ children }) => (
  <h2 className="mb-2 inline-block border-b-2 border-gray-900 leading-4">{children}</h2>
)

export default function Page({ params: { locale } }: CurriculumProps) {
  const curriculum = allCurriculums.find((c) => c.language === locale) as Curriculum
  const mainContent = coreContent(curriculum)

  return (
    <>
      <PostCurriculumLayout locale={locale} content={mainContent}>
        <div>
          <MDXLayoutRenderer
            code={curriculum.body.code}
            components={{
              p: ({ children }) => <p className="my-3">{children}</p>,
              h2: CustomTitle,
            }}
          />
        </div>
      </PostCurriculumLayout>
      <PrintButton />
    </>
  )
}
