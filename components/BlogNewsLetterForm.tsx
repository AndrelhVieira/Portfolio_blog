import NewsletterForm, { NewsletterFormProps } from './NewsletterForm'

const BlogNewsletterForm = ({ title }: NewsletterFormProps) => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8">
      <NewsletterForm title={title} />
    </div>
  </div>
)

export default BlogNewsletterForm
