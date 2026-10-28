'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  slug: string;
  nomCommun: string;
  categorie: string;
  /** Nom scientifique à afficher en italique (absent s'il est identique au nom courant). */
  nomScientifique?: string;
  /** Court texte sous le nom (optionnel). */
  extrait?: string;
}

// Carte espèce des guides et de « Voir aussi » : grande photo en haut qui se fond dans
// la carte ; si le fichier manque, la carte reste telle quelle, sans image.
export default function CarteEspeceLiee({ slug, nomCommun, categorie, nomScientifique, extrait }: Props) {
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <Link href={`/especes/${slug}`} className={`guide-card${photoOk ? ' photo-grande' : ''}`}>
      {photoOk && (
        <div className="carte-photo">
          <Image
            src={`/especes/${slug}.webp`}
            alt={nomCommun}
            width={640}
            height={400}
            sizes="(max-width: 600px) 100vw, 360px"
            loading="lazy"
            className="espece-vignette"
            onError={() => setPhotoOk(false)}
          />
        </div>
      )}
      <div className="carte-texte">
        <span className="eyebrow">{categorie}</span>
        <h3>{nomCommun}</h3>
        {nomScientifique && <p style={{ fontStyle: 'italic' }}>{nomScientifique}</p>}
        {extrait && <p style={{ marginTop: 8 }}>{extrait}</p>}
      </div>
    </Link>
  );
}
