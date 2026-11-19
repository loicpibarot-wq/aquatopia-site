// Lien de signalement / demande de retrait d'une annonce (DSA, art. 16) :
// ouvre un e-mail à l'équipe avec l'adresse complète de la page en objet.
const SITE_URL = 'https://aquatopia.fr';
const CONTACT = 'contact@aquatopia.fr';

function mailtoRetrait(chemin: string): string {
  const objet = `Demande de retrait : ${SITE_URL}${chemin}`;
  return `mailto:${CONTACT}?subject=${encodeURIComponent(objet)}`;
}

export default function LienRetraitAnnonce({ chemin, vendue }: { chemin: string; vendue: boolean }) {
  const href = mailtoRetrait(chemin);
  return (
    <p style={{ marginTop: 40, fontSize: '0.82rem', color: 'var(--text-faint)', lineHeight: 1.6 }}>
      {vendue ? (
        <>
          C&apos;est votre annonce, ou elle contient une information qui vous concerne ?{' '}
          <a href={href} style={{ color: 'var(--text-muted)' }}>Demandez son retrait</a>. On la retire sous 72 h.
        </>
      ) : (
        <a href={href} style={{ color: 'var(--text-muted)' }}>Signaler cette annonce ou demander son retrait</a>
      )}
    </p>
  );
}
