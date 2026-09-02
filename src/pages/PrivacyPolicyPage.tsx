import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

const updatedAt = '2 septembrie 2026'

export function PrivacyPolicyPage() {
  return (
    <>
      <Seo title="Politica de confidențialitate | CleanConstruct" description="Află ce date personale prelucrează CleanConstruct, de ce le folosim, cât timp le păstrăm și ce drepturi ai." />
      <header className="legal-header">
        <div className="shell legal-header-inner">
          <span className="eyebrow">Datele tale</span>
          <h1>Politica de confidențialitate</h1>
          <p>Îți explicăm clar ce informații colectăm prin acest site și cum le protejăm.</p>
          <small>Ultima actualizare: {updatedAt}</small>
        </div>
      </header>

      <article className="legal-page shell">
        <section>
          <h2>1. Cine prelucrează datele</h2>
          <p>Operatorul datelor este STEFI CLEAN CONSTRUCT S.R.L., CUI 43678075, înregistrată la Registrul Comerțului cu nr. J51/101/2021, EUID ROONRC.J51/101/2021, denumită în continuare „CleanConstruct”.</p>
          <p>Pentru orice întrebare sau cerere privind datele personale ne poți contacta la <a href="mailto:contact@cleanconstruct.ro">contact@cleanconstruct.ro</a>.</p>
        </section>

        <section>
          <h2>2. Ce date colectăm</h2>
          <p>În funcție de modul în care folosești site-ul, putem prelucra:</p>
          <ul>
            <li>numele, numărul de telefon și adresa de e-mail;</li>
            <li>serviciul solicitat, localitatea, suprafața aproximativă și mesajul tău;</li>
            <li>fotografiile pe care alegi să le atașezi solicitării;</li>
            <li>adresa paginii de pe care ai trimis formularul;</li>
            <li>preferința privind analiza, precum și date tehnice și statistice limitate despre folosirea site-ului.</li>
          </ul>
          <p>Te rugăm să nu trimiți prin formular acte de identitate, date bancare, date medicale sau alte informații sensibile care nu sunt necesare evaluării proiectului.</p>
        </section>

        <section>
          <h2>3. Scopuri, temeiuri și perioade de păstrare</h2>
          <div className="legal-table-wrap">
            <table>
              <thead><tr><th>Scop</th><th>Temei</th><th>Păstrare</th></tr></thead>
              <tbody>
                <tr>
                  <td>Analizarea solicitării, pregătirea ofertei și comunicarea cu tine.</td>
                  <td>Demersuri la cererea ta înaintea încheierii unui contract (art. 6 alin. 1 lit. b RGPD).</td>
                  <td>Până la 24 de luni de la ultima comunicare dacă nu se încheie un contract, cu excepția cazului în care este necesară o perioadă mai lungă pentru o obligație legală sau un litigiu.</td>
                </tr>
                <tr>
                  <td>Executarea serviciilor, facturare și evidențe comerciale.</td>
                  <td>Executarea contractului și îndeplinirea obligațiilor legale (art. 6 alin. 1 lit. b și c RGPD).</td>
                  <td>Pe durata relației și ulterior conform termenelor legale aplicabile documentelor financiar-contabile și eventualelor pretenții.</td>
                </tr>
                <tr>
                  <td>Securitatea, funcționarea și îmbunătățirea site-ului prin statistici tehnice agregate.</td>
                  <td>Interesul legitim de a administra un site sigur și eficient (art. 6 alin. 1 lit. f RGPD).</td>
                  <td>Conform perioadelor tehnice ale furnizorilor și numai cât este necesar scopului.</td>
                </tr>
                <tr>
                  <td>Google Analytics și stocarea asociată analizelor opționale.</td>
                  <td>Consimțământul tău (art. 6 alin. 1 lit. a RGPD), pe care îl poți retrage oricând.</td>
                  <td>Conform <Link to="/politica-de-cookies/">Politicii de cookie-uri</Link> și setărilor furnizorului.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>4. Cui putem transmite datele</h2>
          <p>Accesul este limitat la persoanele care au nevoie de date pentru a răspunde solicitării sau a presta serviciul. Putem folosi furnizori care acționează pentru noi, inclusiv Supabase pentru stocarea privată a solicitărilor și fotografiilor, Vercel pentru găzduire și statistici web și Google pentru analiza opțională.</p>
          <p>Putem divulga date și consultanților profesionali ori autorităților atunci când legea impune acest lucru sau când este necesar pentru constatarea, exercitarea ori apărarea unui drept.</p>
        </section>

        <section>
          <h2>5. Transferuri în afara Spațiului Economic European</h2>
          <p>Unii furnizori tehnologici pot prelucra date și în afara Spațiului Economic European. În aceste situații sunt folosite mecanismele legale aplicabile, precum decizii de adecvare sau clauze contractuale standard, împreună cu măsuri suplimentare atunci când sunt necesare.</p>
        </section>

        <section>
          <h2>6. Drepturile tale</h2>
          <p>În condițiile RGPD, poți solicita accesul la date, rectificarea sau ștergerea lor, restricționarea prelucrării, portabilitatea, te poți opune anumitor prelucrări și îți poți retrage consimțământul fără ca retragerea să afecteze prelucrarea anterioară.</p>
          <p>Pentru exercitarea drepturilor scrie la <a href="mailto:contact@cleanconstruct.ro">contact@cleanconstruct.ro</a>. Pentru a proteja datele, îți putem cere informațiile strict necesare confirmării identității. Ai și dreptul de a depune o plângere la <a href="https://www.dataprotection.ro/" target="_blank" rel="noreferrer">Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal</a>.</p>
        </section>

        <section>
          <h2>7. Decizii automate și caracterul datelor</h2>
          <p>Nu folosim datele din formular pentru decizii bazate exclusiv pe prelucrare automată și nu realizăm profilare cu efecte juridice. Câmpurile marcate cu „*” sunt necesare pentru a putea analiza și răspunde cererii; fără ele nu putem procesa solicitarea.</p>
        </section>

        <section>
          <h2>8. Securitate și actualizări</h2>
          <p>Aplicăm măsuri tehnice și organizatorice rezonabile, inclusiv acces restricționat la solicitări și stocare privată pentru fotografii. Nicio transmitere online nu poate fi garantată ca fiind complet lipsită de risc.</p>
          <p>Putem actualiza această politică atunci când se schimbă site-ul, furnizorii sau cerințele legale. Versiunea curentă și data actualizării sunt publicate pe această pagină.</p>
        </section>
      </article>
    </>
  )
}
