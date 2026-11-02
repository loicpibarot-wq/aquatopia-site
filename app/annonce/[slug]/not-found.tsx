import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap annonce-wrap" style={{ textAlign: 'center', padding: '100px 0' }}>
      <span className="eyebrow" style={{ justifyContent: 'center' }}>404</span>
      <h1 style={{ marginTop: 16 }}>Cette annonce n&apos;est plus disponible</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: 14 }}>
        Elle a peut-être été vendue, ou l&apos;annonce a été retirée par son vendeur.
      </p>
      <Link href="/" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: 28 }}>
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
