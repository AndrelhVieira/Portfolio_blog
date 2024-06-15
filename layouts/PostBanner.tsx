import { ReactNode } from 'react'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import WalineComments from '@/components/walinecomponents/walineComments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { PostSeriesBox } from '@/components/PostseriesBox'
import Share from '@/components/Share'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import NewsletterForm from '@/components/NewsletterForm'

interface PostBannerProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  params: { locale: LocaleTypes }
}

export default function PostMinimal({
  content,
  next,
  prev,
  children,
  params: { locale },
}: PostBannerProps) {
  const { slug, title, images, series } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-[2/1] w-full">
                  <Image src={displayImage} alt={title} fill className="object-cover" />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
          {series && (
            <div className="not-prose mt-4">
              <PostSeriesBox data={series} />
            </div>
          )}
          <div className="prose max-w-none break-words py-4 text-justify dark:prose-invert">
            {children}
          </div>

          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>

          <Share title={title} slug={slug} />
          <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
            {siteMetadata.iswaline === true && <WalineComments />}
            {siteMetadata.comments && siteMetadata.iscomments === true && <Comments slug={slug} />}
          </div>
          <footer>
            <div className="grid-row-2 grid gap-5 text-sm font-medium sm:grid-cols-2 sm:flex-row sm:justify-between sm:text-base md:gap-10">
              {prev && prev.slug && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${locale}/blog/${prev.slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.slug && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${locale}/blog/${next.slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
