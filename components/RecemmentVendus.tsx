import Image from 'next/image';
import Link from 'next/link';
import { buildSlug, dateCourte, libelleVendu, type AnnonceVendue } from '@/lib/annonces';

type CarteVendue = Pick<AnnonceVendue, 'id' | 'titre' | 'ville' | 'photos' | 'is_don' | 'is_echange' | 'vendu_at'>;

// Section « Récemment vendus » des pages catégorie, ville et département.
// Preuve que les annonces trouvent preneur, sans aucune information sur le
// vendeur ni prix. N'affiche rien s'il n'y a aucune annonce vendue pertinente.
export default function RecemmentVendus({
  annonces,
  titre,
  surtitre = 'Ils ont trouvé preneur',
}: {
  annonces: CarteVendue[];
  titre: string;
  surtitre?: string;
}) {
  if (annonces.length === 0) return null;
  return (
    <section style={{ marginTop: 56 }} aria-labelledby="recemment-vendus">
      <div className="section-head" style={{ marginBottom: 8 }}>
        <span className="eyebrow">{surtitre}</span>
        <h2 id="recemment-vendus" style={{ fontSize: '1.2rem', marginTop: 10 }}>{titre}</h2>
        <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Ces annonces ont déjà trouvé preneur. Créez une alerte dans l&apos;application pour être prévenu de la
          prochaine.
        </p>
      </div>
      <div className="annonce-grille-liens">
        {annonces.map((a) => {
          const libelle = libelleVendu(a);
          return (
            <Link key={a.id} href={`/annonce/${buildSlug(a)}`} className="annonce-card-mini vendue">
              <span className="badge-vendu">{libelle}</span>
              {a.photos?.[0] && <Image src={a.photos[0]} alt={`${a.titre} (${libelle.toLowerCase()})`} width={300} height={225} />}
              <div className="body">
                <h4 style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{a.titre}</h4>
                <span className="date">
                  {a.ville ? `${a.ville} · ` : ''}
                  {a.vendu_at ? `${libelle} le ${dateCourte(a.vendu_at)}` : libelle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
