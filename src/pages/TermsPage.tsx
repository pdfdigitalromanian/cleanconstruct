import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

const updatedAt = '2 septembrie 2026'

export function TermsPage() {
  const phone = import.meta.env.VITE_BUSINESS_PHONE || '+40 726 631 898'
  const phoneHref = phone.replace(/[^+\d]/g, '')

  return (
    <>
      <Seo title="Termeni și condiții | CleanConstruct" description="Condițiile de utilizare a site-ului CleanConstruct și informații despre solicitarea și contractarea serviciilor." />
      <header className="legal-header">
        <div className="shell legal-header-inner">
          <span className="eyebrow">Informații contractuale</span>
          <h1>Termeni și condiții</h1>
          <p>Regulile de utilizare a site-ului și cadrul general pentru solicitarea serviciilor CleanConstruct.</p>
          <small>Ultima actualizare: {updatedAt}</small>
        </div>
      </header>

      <article className="legal-page shell">
        <section>
          <h2>1. Identitatea prestatorului</h2>
          <p>Site-ul cleanconstruct.ro este administrat de STEFI CLEAN CONSTRUCT S.R.L., CUI 43678075, nr. Registrul Comerțului J51/101/2021, EUID ROONRC.J51/101/2021. Ne poți contacta la <a href="mailto:contact@cleanconstruct.ro">contact@cleanconstruct.ro</a> sau la <a href={`tel:${phoneHref}`}>{phone}</a>.</p>
        </section>

        <section>
          <h2>2. Rolul site-ului</h2>
          <p>Site-ul prezintă servicii de curățenie, construcții, renovare și finisare și permite trimiterea unei solicitări de ofertă. Informațiile publicate au caracter general și nu înlocuiesc evaluarea concretă a spațiului, proiectul tehnic, autorizațiile sau consultanța unui specialist autorizat.</p>
          <p>Trimiterea formularului, un mesaj sau o discuție telefonică nu reprezintă automat o comandă acceptată și nu încheie un contract.</p>
        </section>

        <section>
          <h2>3. Oferte și contractarea serviciilor</h2>
          <p>Disponibilitatea, operațiunile incluse, materialele, prețul, calendarul, condițiile de plată și responsabilitățile părților se stabilesc pentru fiecare proiect. Un serviciu este contractat numai după ce părțile acceptă în mod clar oferta sau documentul contractual aplicabil.</p>
          <p>Estimările preliminare se pot modifica dacă evaluarea la fața locului, starea suportului, suprafețele, cantitățile ori cerințele reale diferă de informațiile comunicate inițial. Orice modificare relevantă se discută înainte de executarea operațiunilor suplimentare.</p>
        </section>

        <section>
          <h2>4. Obligațiile utilizatorului</h2>
          <p>Când trimiți o solicitare, te rugăm să furnizezi informații corecte, să ai dreptul de a transmite fotografiile atașate și să nu încarci conținut ilegal, ofensator ori date personale care nu sunt necesare proiectului. Folosirea abuzivă, încercarea de acces neautorizat sau afectarea funcționării site-ului sunt interzise.</p>
        </section>

        <section>
          <h2>5. Conținut și proprietate intelectuală</h2>
          <p>Textele, elementele grafice, identitatea vizuală și structura site-ului sunt protejate de legislația aplicabilă și pot aparține CleanConstruct ori furnizorilor săi. Poți consulta și distribui linkuri către pagini, însă reproducerea substanțială sau folosirea comercială necesită acordul titularului drepturilor.</p>
        </section>

        <section>
          <h2>6. Disponibilitate și linkuri externe</h2>
          <p>Depunem eforturi pentru ca informațiile și funcțiile site-ului să fie disponibile și corecte, dar pot apărea întreruperi, erori tehnice sau actualizări. Linkurile către site-uri terțe sunt oferite pentru informare; conținutul și practicile acelor site-uri sunt controlate de titularii lor.</p>
        </section>

        <section>
          <h2>7. Date personale și cookie-uri</h2>
          <p>Modul în care folosim datele trimise prin formular este descris în <Link to="/politica-de-confidentialitate/">Politica de confidențialitate</Link>. Tehnologiile de analiză și opțiunile tale sunt explicate în <Link to="/politica-de-cookies/">Politica de cookie-uri</Link>.</p>
        </section>

        <section>
          <h2>8. Reclamații și soluționarea litigiilor</h2>
          <p>Pentru o soluționare directă, contactează-ne mai întâi la <a href="mailto:contact@cleanconstruct.ro">contact@cleanconstruct.ro</a>. Consumatorii pot consulta și procedura de <a href="https://reclamatiisal.anpc.ro" target="_blank" rel="noreferrer">Soluționare Alternativă a Litigiilor (SAL) din cadrul ANPC</a>.</p>
          <p>Dacă o neînțelegere nu poate fi rezolvată amiabil, aceasta va fi soluționată de instanțele competente potrivit legislației române, fără a limita drepturile legale ale consumatorilor.</p>
        </section>

        <section>
          <h2>9. Modificarea termenilor</h2>
          <p>Putem actualiza acești termeni pentru a reflecta schimbări ale serviciilor, site-ului sau cadrului legal. Versiunea aplicabilă este cea publicată aici la momentul folosirii site-ului, cu data ultimei actualizări afișată în partea de sus.</p>
        </section>
      </article>
    </>
  )
}
