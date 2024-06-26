import NewsletterFormSimple, {
  NewsletterFormSimplePropsType,
} from './NewsletterForm/NewsletterFormSimple'

const BlogNewsletterForm = ({ title }: NewsletterFormSimplePropsType) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterFormSimple title={title} />
    </div>
  </div>
)

export default BlogNewsletterForm
