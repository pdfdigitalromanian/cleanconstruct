import { useParams } from 'react-router-dom'
import { getService } from '../data/services'
import { PostPage } from './PostPage'
import { ServiceDetailPage } from './ServiceDetailPage'

export function ContentPage() {
  const { slug = '' } = useParams()
  if (getService(slug)) return <ServiceDetailPage slug={slug} />
  return <PostPage slug={slug} />
}
