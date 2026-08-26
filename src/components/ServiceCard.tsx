import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../types'

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className="service-card">
      <Link className="service-card-image" to={`/${service.slug}/`} tabIndex={-1} aria-hidden="true">
        <img src={service.image} alt="" loading={index < 3 ? 'eager' : 'lazy'} />
      </Link>
      <div className="service-card-copy">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <h3><Link to={`/${service.slug}/`}>{service.shortTitle}</Link></h3>
        <p>{service.description}</p>
        <Link className="circle-link" to={`/${service.slug}/`} aria-label={`Vezi serviciul ${service.shortTitle}`}><ArrowUpRight /></Link>
      </div>
    </article>
  )
}
