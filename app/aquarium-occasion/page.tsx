import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/breadcrumb';
import { chargerAnnoncesLocales, grouperVilles, grouperDepartements } from '@/lib/lieux';
import ListeLieux from '@/components/ListeLieux';

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Annonces d'aquariophilie par ville et département",
  description:
    "Trouvez des aquariums d'occasion, des poissons, des plantes et du matériel près de chez vous : annonces par ville et par département, entre particuliers.",
  alternates: { canonical: '/aquarium-occasion' },
};

export default async function HubLieux() {
  let villes: Awaited<ReturnType<typeof grouperVilles>> = [];
  let depts: Awaited<ReturnType<typeof grouperDepartements>> = [];
  try {
    const liste = await chargerAnnoncesLocales();
    villes = grouperVilles(liste);
    depts = grouperDepartements(liste);
  } catch {
    // Supabase injoignable : la page s'affiche sans listes plutôt que d'échouer.
  }
  const fil = [{ name: 'Accueil', url: '/' }, { name: 'Annonces par ville' }];

  return (
    <div className="wrap annonce-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(fil)) }} />
      <div className="breadcrumb"><Link href="/">Accueil</Link> · Annonces par ville</div>

      <div className="section-head" style={{ marginBottom: 28 }}>
        <span className="eyebrow">Près de chez vous</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginTop: 14 }}>
          Aquarium d&apos;occasion et poissons à vendre, par ville et par département
        </h1>
        <p style={{ marginTop: 14 }}>
          Les annonces d&apos;aquariophilie d&apos;Aquatopia sont classées par distance. Choisissez votre ville ou votre
          département pour voir les aquariums d&apos;occasion, les poissons, les plantes et le matériel proposés près de chez vous.
        </p>
      </div>

      {depts.length > 0 && (
        <section aria-labelledby="h-depts" style={{ marginBottom: 36 }}>
          <h2 id="h-depts" style={{ fontSize: '1.2rem', marginBottom: 14 }}>Par département</h2>
          <ListeLieux
            placeholder="Rechercher un département"
            items={[...depts].sort((a, b) => a.nom.localeCompare(b.nom, 'fr')).map((d) => ({ href: `/poissons-a-vendre/${d.slug}`, nom: d.nom, code: d.dep, n: d.annonces.length }))}
          />
        </section>
      )}

      {villes.length > 0 && (
        <section aria-labelledby="h-villes">
          <h2 id="h-villes" style={{ fontSize: '1.2rem', marginBottom: 14 }}>Par ville</h2>
          <ListeLieux
            placeholder="Rechercher une ville"
            items={[...villes].sort((a, b) => a.nom.localeCompare(b.nom, 'fr')).map((v) => ({ href: `/aquarium-occasion/${v.slug}`, nom: v.nom, code: v.dep, n: v.annonces.length }))}
          />
        </section>
      )}

      {villes.length === 0 && depts.length === 0 && (
        <p style={{ color: 'var(--text-muted)' }}>
          Les annonces par ville apparaîtront ici dès qu&apos;un lieu en comptera plusieurs.
          En attendant, parcourez les <Link href="/categorie/cuves">aquariums d&apos;occasion</Link> et les{' '}
          <Link href="/categorie/vivant">poissons à vendre</Link>.
        </p>
      )}
    </div>
  );
}
