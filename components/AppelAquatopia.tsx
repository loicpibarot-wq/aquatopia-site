import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';
import type { AppelAppli } from '@/lib/cta';

// Encart d'invitation à utiliser Aquatopia, affiché dans les guides Acheter & vendre.
export default function AppelAquatopia({ appel }: { appel: AppelAppli }) {
  return (
    <aside
      style={{
        margin: '4px 0 32px',
        padding: '24px 22px',
        textAlign: 'center',
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: 16,
      }}
    >
      <p style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>{appel.titre}</p>
      <p style={{ margin: '0 auto 18px', maxWidth: 520, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{appel.texte}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
        <DownloadButton className="btn btn-primary">Télécharger l&apos;application</DownloadButton>
        {appel.lien && (
          <Link href={appel.lien.href} className="btn btn-ghost">
            {appel.lien.label}
          </Link>
        )}
      </div>
      <p style={{ margin: '14px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Disponible sur iPhone et Android</p>
    </aside>
  );
}
