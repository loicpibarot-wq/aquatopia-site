import Image from 'next/image';
import DownloadButton from '@/components/DownloadButton';

const FAQ = [
  {
    q: "L'application Aquatopia est-elle gratuite ?",
    a: "Oui, le téléchargement, la recherche et la publication d'annonces pour les particuliers sont 100 % gratuits.",
  },
  {
    q: 'Retrouve-t-on des professionnels et des éleveurs sur l’application ?',
    a: "Absolument. Aquatopia réunit des particuliers, des éleveurs passionnés et des boutiques spécialisées proposant du vivant issu d'élevages locaux ainsi que du matériel neuf ou reconditionné.",
  },
  {
    q: 'Peut-on vendre du matériel de bassin ou du récifal ?',
    a: "Oui, l'application couvre l'ensemble de l'aquariophilie : eau douce, eau de mer (récifal), bassin extérieur, ainsi que tous les éclairages, décors et accessoires.",
  },
  {
    q: 'Comment se déroulent les transactions ?',
    a: "Pour préserver le bien-être animal et éviter les risques liés aux envois, toutes les remises s'effectuent en main propre directement entre l'acheteur et le vendeur.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Données structurées FAQ — reprend mot pour mot le contenu affiché
          juste plus bas dans #faq, pour l'affichage enrichi dans les
          résultats Google. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Marketplace aquariophile</span>
            <h1 style={{ marginTop: 16 }}>
              Aquatopia — la marketplace locale pour <span className="accent">l&apos;aquariophilie et le bassin</span>
            </h1>
            <h2
              className="lede"
              style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 600, fontSize: '1.14rem', color: 'var(--text)', marginTop: 22 }}
            >
              Achetez, vendez et donnez vivant, équipements et accessoires entre particuliers et professionnels.
            </h2>
            <p className="lede" style={{ marginTop: 10 }}>
              Poissons, coraux, plantes, bassins, éclairages, décors — annonces vérifiées, messagerie en temps réel, remise en main propre.
            </p>
            <div className="hero-ctas">
              <DownloadButton className="btn btn-primary" >
                <span style={{ padding: '2px 12px' }}>Télécharger maintenant</span>
              </DownloadButton>
              <a
                href="https://www.facebook.com/share/1DmYnkCM4g/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener"
                className="btn btn-ghost"
                style={{ padding: '10px 18px', fontSize: '0.82rem', alignSelf: 'center' }}
              >
                Rejoindre la communauté
              </a>
            </div>
            <div className="store-badges">
              <a href="https://apps.apple.com/app/id6774605218" target="_blank" rel="noopener" className="store-badge">
                <span>▸</span>
                <span><small>Disponible sur</small><strong>App Store</strong></span>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.noula34.aquatopia" target="_blank" rel="noopener" className="store-badge">
                <span>▸</span>
                <span><small>Disponible sur</small><strong>Google Play</strong></span>
              </a>
            </div>
            <p style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--text-faint)' }}>Disponible dans toute la France.</p>
            <div className="hero-stats">
              <div className="stat"><b>100%</b><span>annonces modérées</span></div>
              <div className="stat"><b>iOS + Android</b><span>disponible dès maintenant</span></div>
            </div>
          </div>

          <div className="phone-stage">
            <div className="phone-frame">
              <Image
                src="/phone-shot-1.webp"
                alt="Application Aquatopia - recherche d'annonces par catégorie : vivant, plantes, éclairage, cuves"
                width={225}
                height={487}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnement">
        <div className="wrap steps-wrap">
          <div>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <span className="eyebrow">Comment ça marche</span>
              <h2>Comment vendre ou adopter en remise en main propre ?</h2>
              <p>L&apos;envoi d&apos;êtres vivants est interdit par la loi : chez Aquatopia, chaque échange se fait en main propre, sans intermédiaire, entre passionnés près de chez vous.</p>
            </div>
            <div className="steps">
              <div className="step">
                <div className="step-num">01</div>
                <div><h3>Publiez une fiche biotope</h3><p>Photos, volume, état, catégorie — votre annonce donne tout ce qu&apos;il faut pour bien accueillir l&apos;espèce ou le matériel.</p></div>
              </div>
              <div className="step">
                <div className="step-num">02</div>
                <div><h3>Échangez par messagerie</h3><p>Discutez en temps réel avec le vendeur ou l&apos;acheteur, posez vos questions, convenez d&apos;un lieu et d&apos;un horaire.</p></div>
              </div>
              <div className="step">
                <div className="step-num">03</div>
                <div><h3>Récupérez en main propre</h3><p>Rendez-vous près de chez vous, où que vous soyez en France, pour une remise directe.</p></div>
              </div>
            </div>
          </div>
          <div className="step-visual">
            <div className="phone-frame">
              <Image
                src="/phone-shot-2.webp"
                alt="Publier une annonce d'occasion sur Aquatopia - vente de poissons, plantes, éclairage LED et matériel d'aquarium"
                width={190}
                height={412}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="categories" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Catégories</span>
            <h2>Tout pour votre passion : vivant, plantes, éclairage, décor &amp; accessoires — en eau douce, récifal ou bassin</h2>
          </div>
          <div className="biotope-grid">
            <div className="biotope-card">
              <div className="biotope-icon" style={{ background: '#1E85B0' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c3.5 4.2 6 7.7 6 10.5a6 6 0 0 1-12 0C6 10.7 8.5 7.2 12 3z" /></svg>
              </div>
              <h3>Eau Douce</h3>
              <p>Le plus grand rayon : poissons, plantes et invertébrés d&apos;eau douce.</p>
            </div>
            <div className="biotope-card">
              <div className="biotope-icon" style={{ background: '#00284F' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 15c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" /><path d="M3 10c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" /></svg>
              </div>
              <h3>Eau de Mer</h3>
              <p>Récifal et marin : poissons, coraux et invertébrés.</p>
            </div>
            <div className="biotope-card">
              <div className="biotope-icon" style={{ background: '#0F6B4F' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c2 2.5 2 4.5 0 6-2-1.5-2-3.5 0-6z" /><path d="M12 9c3 0 5.5 2.5 5.5 6H6.5C6.5 11.5 9 9 12 9z" /><path d="M4 19c2-1.3 4-1.3 6 0s4 1.3 6 0 4-1.3 4-1.3" /></svg>
              </div>
              <h3>Bassin</h3>
              <p>Plantes de bassin, poissons de bassin et extérieur.</p>
            </div>
          </div>

          <p className="subcat-label eyebrow" style={{ marginTop: 44 }}>Catégories, disponibles dans chaque univers</p>
          <div className="subcat-row">
            <span className="subcat-chip"><svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12c3-6 8-9 13-9 2 0 4 1 4 1s-1 4-4 6c-5 3-10 3-13 2z" /><circle cx={18} cy={6} r={1} fill="currentColor" stroke="none" /></svg> Vivant</span>
            <span className="subcat-chip"><svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={3.2} /><path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6" /></svg> Matériel</span>
            <span className="subcat-chip"><svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3.5} y={6} width={17} height={12} rx={1.5} /><path d="M3.5 10.5h17" /></svg> Cuves</span>
            <span className="subcat-chip"><svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 21V10" /><path d="M12 10C12 6 9 4 5 4c0 4 3 6 7 6z" /><path d="M12 13c0-3.5 2.5-5.2 6-5.2 0 3.5-2.5 5.2-6 5.2z" /></svg> Plantes</span>
            <span className="subcat-chip"><svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3z" /></svg> Éclairage</span>
            <span className="subcat-chip"><svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={9} width={18} height={4.5} rx={1} transform="rotate(-8 12 11)" /><path d="M5 15.5c3 1.4 11 1.4 14 0" /></svg> Décor</span>
          </div>
        </div>
      </section>

      <section id="confiance">
        <div className="wrap trust">
          <div>
            <span className="eyebrow">Confiance</span>
            <h2 style={{ marginTop: 14 }}>Une communauté modérée, pas une brocante anonyme.</h2>
            <p style={{ marginTop: 14, color: 'var(--text-muted)' }}>Chaque annonce et chaque profil passe par une validation avant publication, pour que la priorité reste le bien-être des espèces échangées.</p>
            <div className="trust-list" style={{ marginTop: 32 }}>
              <div className="trust-item">
                <div className="dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z" /></svg></div>
                <div><h3>Modération des annonces</h3><p>Une équipe vérifie chaque fiche avant sa mise en ligne.</p></div>
              </div>
              <div className="trust-item">
                <div className="dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={12} cy={8} r={3.2} /><path d="M5 20c1.5-4 4-5.5 7-5.5S18.5 16 20 20" /></svg></div>
                <div><h3>Profils suivis</h3><p>Statistiques de ventes, dons et historique visibles sur chaque profil.</p></div>
              </div>
              <div className="trust-item">
                <div className="dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><path d="M14 4v5h5" /></svg></div>
                <div><h3>Signalement en un geste</h3><p>Contenu ou comportement litigieux : un bouton, une réponse rapide.</p></div>
              </div>
            </div>
          </div>

          <div className="trust-visual">
            <div>
              <div className="phone-frame">
                <Image
                  src="/phone-shot-3.webp"
                  alt="Profil vendeur Aquatopia - annonces de crevettes et plantes d'aquarium d'occasion près de Lyon"
                  width={215}
                  height={466}
                />
              </div>
              <div className="trust-caption">profil réel · annonces, vues et favoris suivis</div>
            </div>
          </div>
        </div>
      </section>

      <section id="univers" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Recherches populaires</span>
            <h2>Tout l&apos;univers de l&apos;aquariophilie et du bassin, en un seul endroit</h2>
            <p>Que vous cherchiez un poisson tropical, une bouture de corail ou une pompe de bassin, Aquatopia couvre l&apos;ensemble du vivant et du matériel, neuf comme d&apos;occasion.</p>
          </div>
          <div className="seo-grid">
            <div className="seo-card">
              <h3>Eau douce</h3>
              <p>Poissons tropicaux (Guppy, Betta, Scalaire, Ancistrus, Cichlidés), crevettes (Red Cherry, Caridina), escargots et invertébrés.</p>
            </div>
            <div className="seo-card">
              <h3>Eau de mer &amp; Récifal</h3>
              <p>Poissons marins, boutures de coraux (LPS/SPS), roches vivantes, sel marin, eau osmosée.</p>
            </div>
            <div className="seo-card">
              <h3>Bassin &amp; Étang</h3>
              <p>Carpes Koï, poissons rouges, esturgeons, plantes de berge, pompes de filtration pour bassin.</p>
            </div>
            <div className="seo-card">
              <h3>Équipements &amp; Matériel</h3>
              <p>Rampes LED et éclairages, filtres externes, systèmes CO2, pompes de brassage, chauffages, aquariums complets (30L à 500L+).</p>
            </div>
            <div className="seo-card">
              <h3>Plantes, Décors &amp; Accessoires</h3>
              <p>Plantes d&apos;eau douce, mousses, racines (Bogwood, Mangrove), roches de décoration, substrats, kits de tests d&apos;eau.</p>
            </div>
            <div className="seo-card">
              <h3>Pour tous les passionnés</h3>
              <p>Petites annonces de particuliers, éleveurs passionnés et boutiques spécialisées — matériel neuf et reconditionné.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Foire aux questions sur l&apos;application Aquatopia</h2>
          </div>
          <div className="faq-list">
            {FAQ.map(({ q, a }) => (
              <details className="faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="telecharger">
        <div className="wrap">
          <div className="cta-band">
            <span className="eyebrow">Envie d&apos;aller plus loin</span>
            <h2>Rejoignez la communauté Aquatopia</h2>
            <p>Conseils, coups de cœur et nouveautés — retrouvez-nous sur Facebook.</p>
            <a
              href="https://www.facebook.com/share/1DmYnkCM4g/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
              style={{ padding: '16px 34px', fontSize: '1.05rem' }}
            >
              Rejoindre la communauté sur Facebook
            </a>
            <div style={{ marginTop: 22, paddingTop: 22, borderTop: '1px solid var(--border)', width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>Aquatopia est aussi disponible gratuitement sur :</span>
              <div className="store-badges" style={{ marginTop: 0 }}>
                <a href="https://apps.apple.com/app/id6774605218" target="_blank" rel="noopener" className="store-badge">
                  <span>▸</span>
                  <span><small>Disponible sur</small><strong>App Store</strong></span>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.noula34.aquatopia" target="_blank" rel="noopener" className="store-badge">
                  <span>▸</span>
                  <span><small>Disponible sur</small><strong>Google Play</strong></span>
                </a>
              </div>
            </div>
            <span className="cta-domain">aquatopia.fr</span>
          </div>
        </div>
      </section>
    </>
  );
}
