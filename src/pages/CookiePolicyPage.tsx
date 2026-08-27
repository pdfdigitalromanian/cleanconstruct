import { Seo } from '../components/Seo'

const updatedAt = '27 august 2026'

export function CookiePolicyPage() {
  return (
    <>
      <Seo title="Politica de cookie-uri | CleanConstruct" description="Află ce tehnologii de analiză folosește CleanConstruct, ce date colectează și cum îți poți modifica alegerea." />
      <header className="legal-header">
        <div className="shell legal-header-inner">
          <span className="eyebrow">Controlul tău</span>
          <h1>Politica de cookie-uri</h1>
          <p>Cookie-urile de analiză sunt opționale și sunt activate numai după ce le accepți.</p>
          <small>Ultima actualizare: {updatedAt}</small>
        </div>
      </header>

      <article className="legal-page shell">
        <section>
          <h2>1. Ce sunt cookie-urile</h2>
          <p>Cookie-urile sunt fișiere mici salvate de browser. Site-ul poate folosi și tehnologii similare, precum spațiul local al browserului, pentru a reține o preferință sau pentru a măsura utilizarea paginilor.</p>
        </section>
        <section>
          <h2>2. Alegerea ta și elementele necesare</h2>
          <p>Salvăm cheia <code>cleanconstruct_privacy_preferences_v2</code> în spațiul local al browserului ca să reținem dacă ai acceptat analiza. Cheia conține versiunea preferinței, alegerea și data actualizării; nu conține numele, telefonul sau adresa ta de e-mail. Dacă ștergi datele site-ului din browser, panoul de preferințe va fi afișat din nou.</p>
        </section>
        <section>
          <h2>3. Google Analytics</h2>
          <p>Cu acordul tău, încărcăm Google Analytics 4 prin identificatorul de măsurare <code>G-FEWRDX9CWL</code>. Serviciul ne ajută să înțelegem, în mod agregat, ce pagini sunt vizitate, sursa aproximativă a traficului, tipul dispozitivului și interacțiunile cu site-ul. Am dezactivat semnalele Google și personalizarea publicitară în configurația site-ului.</p>
          <p>Eticheta Google este instalată direct în antetul fiecărei pagini și folosește modul avansat de consimțământ. Înainte de alegere, stocarea pentru analiză și publicitate este setată la „refuzat”; Google poate primi semnale de măsurare limitate, fără cookie-uri de analiză. După „Accept statistici”, stocarea pentru Google Analytics este permisă. Nu trimitem către Google câmpurile completate în formularul de ofertă.</p>
          <div className="legal-table-wrap">
            <table>
              <thead><tr><th>Cookie</th><th>Scop</th><th>Durată uzuală</th></tr></thead>
              <tbody>
                <tr><td><code>_ga</code></td><td>Deosebește vizitatorii pentru statistici agregate.</td><td>Până la 2 ani</td></tr>
                <tr><td><code>_ga_&lt;ID&gt;</code></td><td>Păstrează starea sesiunii proprietății Google Analytics.</td><td>Până la 2 ani</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2>4. Vercel Web Analytics</h2>
          <p>Folosim în continuare Vercel Web Analytics pentru statistici agregate despre afișările de pagină. Potrivit documentației Vercel, serviciul nu folosește cookie-uri terțe, nu salvează permanent durata unei sesiuni și nu asociază datele cu un profil personal. Alegerea din banner controlează separat noua etichetă Google Analytics.</p>
        </section>
        <section>
          <h2>5. Cum modifici sau retragi acordul</h2>
          <p>Poți folosi oricând butonul „Setări cookie” din subsolul paginii. Dacă retragi acordul, oprim componentele de analiză, informăm eticheta Google despre noua alegere și ștergem cookie-urile Google Analytics accesibile site-ului. Poți șterge și manual cookie-urile sau datele locale din setările browserului.</p>
        </section>
        <section>
          <h2>6. Furnizori și informații suplimentare</h2>
          <p>Pentru detalii despre modul în care furnizorii gestionează datele, consultă <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Politica de confidențialitate Google</a> și <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">informațiile Vercel despre confidențialitatea Web Analytics</a>.</p>
        </section>
        <section>
          <h2>7. Contact</h2>
          <p>Pentru întrebări despre preferințele de confidențialitate, scrie-ne la <a href="mailto:contact@cleanconstruct.ro">contact@cleanconstruct.ro</a>.</p>
        </section>
      </article>
    </>
  )
}
