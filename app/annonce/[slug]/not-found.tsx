import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';

export default function NotFound() {
  return (
    <div className="wrap annonce-wrap" style={{ textAlign: 'center', padding: '100px 0' }}>
      <span className="eyebrow" style={{ justifyContent: 'center' }}>404</span>
      <h1 style={{ marginTop: 16 }}>Cette annonce n&apos;est plus disponible</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: 14 }}>
        Elle a peut-être été vendue, ou l&apos;annonce a été retirée par son vendeur.
      </p>
      <p style={{ color: 'var(--text-muted)', marginTop: 10 }}>
        Dans l&apos;application gratuite Aquatopia, créez une alerte pour être prévenu dès qu&apos;une annonce
        similaire est publiée près de chez vous.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
        <DownloadButton className="btn btn-primary">Télécharger l&apos;application</DownloadButton>
        <Link href="/" className="btn" style={{ display: 'inline-flex' }}>
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
