'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  slug: string;
  eyebrow: string;
  titre: string;
  description: string;
  /** Chemin de la couverture ; absent = carte texte seule. */
  couverture?: string | null;
}

// Carte de la liste des guides et de « À lire aussi » : couverture en haut qui se fond
// dans la carte ; sans couverture (ou si le fichier manque), la carte reste textuelle.
export default function CarteGuide({ slug, eyebrow, titre, description, couverture }: Props) {
  const [imageOk, setImageOk] = useState(true);
  const avecImage = Boolean(couverture) && imageOk;
  return (
    <Link href={`/guides/${slug}`} className={`guide-card${avecImage ? ' photo-grande' : ''}`}>
      {avecImage && couverture && (
        <div className="carte-photo">
          <Image
            src={couverture}
            alt=""
            width={960}
            height={600}
            sizes="(max-width: 600px) 100vw, 360px"
            loading="lazy"
            className="espece-vignette"
            onError={() => setImageOk(false)}
          />
        </div>
      )}
      <div className="carte-texte">
        <span className="eyebrow">{eyebrow}</span>
        <h3>{titre}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
