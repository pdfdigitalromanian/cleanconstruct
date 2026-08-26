import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function NotFoundPage() {
  return (
    <section className="not-found shell">
      <Seo title="Pagina nu a fost găsită | CleanConstruct" description="Pagina solicitată nu există." noIndex />
      <span>404</span>
      <h1>Pagina pe care o cauți nu este aici.</h1>
      <p>Poate că adresa s-a schimbat sau linkul nu mai este disponibil.</p>
      <Link className="button" to="/"><ArrowLeft /> Înapoi la pagina principală</Link>
    </section>
  )
}
