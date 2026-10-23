import Image from 'next/image';
import Link from 'next/link';
import { buildSlug } from '@/lib/annonces';
import type { AnnonceLocale } from '@/lib/lieux';
import DownloadButton from '@/components/DownloadButton';

const PAR_PAGE = 24;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export default function AnnoncesLocales({ annonces }: { annonces: AnnonceLocale[] }) {
  const visibles = annonces.slice(0, PAR_PAGE);
  const reste = annonces.length - visibles.length;
  return (
    <>
      <div className="annonce-grille-liens">
        {visibles.map((a) => (
          <Link key={a.id} href={`/annonce/${buildSlug(a)}`} className="annonce-card-mini">
            {a.photos?.[0] && <Image src={a.photos[0]} alt={`${a.titre} à ${a.ville}`} width={300} height={225} />}
            <div className="body">
              <h4 style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{a.titre}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span className="prix">{a.is_don ? 'Don' : a.is_echange ? 'Échange' : `${a.prix} €`}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)', flexShrink: 0 }}>{a.ville} · {formatDate(a.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: 32, textAlign: 'center', padding: '28px 20px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 16 }}>
        <p style={{ margin: '0 0 6px', fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
          {reste > 0 ? `+${reste} autres annonces disponibles` : 'Retrouvez ces annonces dans l’application'}
        </p>
        <p style={{ margin: '0 0 22px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Téléchargez l&apos;application Aquatopia pour contacter les vendeurs
          et être alerté des nouvelles annonces près de chez vous.
        </p>
        <DownloadButton className="btn btn-primary" style={{ fontSize: '1rem', padding: '13px 36px' }}>
          Télécharger l&apos;application
        </DownloadButton>
      </div>
    </>
  );
}
