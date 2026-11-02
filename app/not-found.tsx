import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap annonce-wrap" style={{ textAlign: 'center', padding: '100px 0' }}>
      <span className="eyebrow" style={{ justifyContent: 'center' }}>404</span>
      <h1 style={{ marginTop: 16 }}>Cette page n&apos;existe pas</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: 14 }}>
        L&apos;adresse est peut-être incorrecte, ou la page a été déplacée. Essayez nos guides ou les annonces.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 28 }}>
        <Link href="/" className="btn btn-primary">Retour à l&apos;accueil</Link>
        <Link href="/guides" className="btn btn-ghost">Voir les guides</Link>
        <Link href="/#categories" className="btn btn-ghost">Voir les annonces</Link>
      </div>
    </div>
  );
}
