import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
}

export function PageHero({ eyebrow, title, description, image, imageAlt = '' }: PageHeroProps) {
  return (
    <section className={`page-hero ${image ? 'with-image' : ''}`}>
      <div className="shell page-hero-inner">
        <div className="page-hero-copy">
          <nav className="breadcrumbs" aria-label="Fir de navigare">
            <Link to="/">Acasă</Link><ArrowRight size={14} aria-hidden="true" /><span>{eyebrow}</span>
          </nav>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        {image ? <div className="page-hero-image"><img src={image} alt={imageAlt} /></div> : null}
      </div>
    </section>
  )
}
