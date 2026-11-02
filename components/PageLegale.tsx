import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';

export type SectionLegale = { titre: string; paragraphes: string[]; partie?: boolean };

// Mise en page commune aux pages légales (mentions, confidentialité, conditions).
export default function PageLegale({
  titre, chemin, misAJour, intro, sections,
}: { titre: string; chemin: string; misAJour?: string; intro?: string; sections: SectionLegale[] }) {
  const fil = [{ name: 'Accueil', url: '/' }, { name: titre }];
  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <div className="breadcrumb">
        <Link href="/">Accueil</Link> · {titre}
      </div>
      <div className="section-head" style={{ marginBottom: 28, maxWidth: 720 }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 4 }}>{titre}</h1>
        {misAJour && <p style={{ marginTop: 10, fontSize: '0.85rem', color: 'var(--text-faint)' }}>Dernière mise à jour : {misAJour}</p>}
      </div>
      <div style={{ maxWidth: 720 }}>
        {intro && <p className="annonce-desc" style={{ marginTop: 0 }}>{intro}</p>}
        {sections.map((s, i) => (
          <div key={i} style={{ marginTop: s.partie ? 48 : 32 }}>
            <h2 style={s.partie ? { fontSize: '1.5rem', marginBottom: 4, color: 'var(--teal)' } : { fontSize: '1.2rem', marginBottom: 10 }}>{s.titre}</h2>
            {s.paragraphes.map((p, j) => (
              <p key={j} className="annonce-desc" style={{ marginTop: j === 0 ? 0 : 12 }}>{p}</p>
            ))}
          </div>
        ))}
        <p style={{ marginTop: 40, fontSize: '0.85rem', color: 'var(--text-faint)' }}>
          Une question sur ce texte ? Écrivez-nous à contact@aquatopia.fr. Adresse de cette page : aquatopia.fr{chemin}
        </p>
      </div>
    </div>
  );
}
