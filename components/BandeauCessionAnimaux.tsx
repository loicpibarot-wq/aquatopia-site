// Message de sensibilisation obligatoire sur chaque annonce d'animal vivant
// (code rural, art. L214-8 et D214-32 ; arrêté du 28/06/2023, message 2).
// NE PAS MODIFIER le texte : il est imposé mot pour mot par l'arrêté.
// Encadré discret aux couleurs du site (le format jaune de l'annexe n'est pas appliqué :
// à revoir si la DDPP l'exige pour les poissons).
const LIEN_MINISTERE = 'https://agriculture.gouv.fr/conseils-et-reglementation-tout-savoir-sur-les-animaux-de-compagnie';

export function estAnnonceAnimal(categorie: string | null | undefined): boolean {
  return categorie === 'Vivant';
}

export default function BandeauCessionAnimaux() {
  return (
    <aside className="cession-animaux" aria-label="Message de sensibilisation">
      <span className="cession-animaux-icone" aria-hidden="true">🐾</span>
      <p>
      Un animal est un être sensible. Vous êtes responsable de la santé et du bien-être de votre animal pour toute sa
      vie. Pour plus d&apos;informations, consultez le site du ministère chargé de l&apos;agriculture :{' '}
      <a href={LIEN_MINISTERE} target="_blank" rel="noopener noreferrer">
        agriculture.gouv.fr
      </a>
      . Afin de préserver la vie sauvage, ne relâchez jamais un animal dans la nature.
      </p>
    </aside>
  );
}
