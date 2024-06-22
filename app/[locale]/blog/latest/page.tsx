import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import FeaturedLayout from '@/layouts/FeaturedLayout'

import { Bounce, ToastContainer } from 'react-toastify'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import LatestLayout from './LatestLayout'

type LatestProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: LatestProps) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      {posts.filter((post) => post.language === locale).some((post) => post.featured) && (
        <FeaturedLayout posts={posts} params={{ locale }} />
      )}
      <LatestLayout posts={posts} params={{ locale: locale }} />
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
    </>
  )
}
