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
}

// Carte « Voir aussi » avec la photo de l'espèce ; si le fichier manque, la
// carte reste telle quelle, sans image.
export default function CarteEspeceLiee({ slug, nomCommun, categorie, nomScientifique }: Props) {
  const [photoOk, setPhotoOk] = useState(true);
  return (
    <Link href={`/especes/${slug}`} className={`guide-card${photoOk ? ' avec-photo' : ''}`}>
      <div className="carte-texte">
        <span className="eyebrow">{categorie}</span>
        <h3>{nomCommun}</h3>
        {nomScientifique && <p style={{ fontStyle: 'italic' }}>{nomScientifique}</p>}
      </div>
      {photoOk && (
        <Image
          src={`/especes/${slug}.webp`}
          alt={nomCommun}
          width={256}
          height={168}
          sizes="128px"
          loading="lazy"
          className="espece-vignette"
          onError={() => setPhotoOk(false)}
        />
      )}
    </Link>
  );
}
