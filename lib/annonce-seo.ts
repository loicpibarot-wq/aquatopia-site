// Données structurées (JSON-LD) d'une page annonce.
// Règle d'or : on ne déclare à Google que ce qui est vrai et visible sur la
// page. Aucune note ni aucun avis n'est fabriqué : l'appli n'a pas de système
// d'avis, donc `aggregateRating` / `review` restent volontairement absents
// (ce sont des champs facultatifs, seulement signalés comme « non critiques »).
import { buildSlug, metaDescription, nomAffiche, type Annonce } from '@/lib/annonces';

const SITE_URL = 'https://aquatopia.fr';

// États proposés dans l'appli (ajouter.tsx) → valeurs schema.org.
const ETAT_VERS_SCHEMA: Record<string, string> = {
  Neuf: 'https://schema.org/NewCondition',
  'Très bon état': 'https://schema.org/UsedCondition',
  'Bon état': 'https://schema.org/UsedCondition',
  'État correct': 'https://schema.org/UsedCondition',
  'Pour pièces': 'https://schema.org/DamagedCondition',
};

const dansJours = (n: number) => new Date(Date.now() + n * 86_400_000).toISOString().slice(0, 10);

// Politique de retour commune à toutes les annonces.
// Sur une place de marché C2C, les retours ne sont généralement pas acceptés
// (échange de particulier à particulier). La déclarer évite l'avertissement
// non-critique Google « hasMerchantReturnPolicy manquant ».
const RETURN_POLICY = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'FR',
  returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
};

// Détails d'expédition selon que le vendeur propose l'envoi ou non.
function shippingDetails(envoi: boolean) {
  if (envoi) {
    return {
      '@type': 'OfferShippingDetails',
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'FR',
      },
      // Frais à définir entre acheteur et vendeur — on déclare le minimum
      // pour satisfaire le champ obligatoire sans induire en erreur.
      shippingRate: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        minValue: 0,
      },
    };
  }
  // Remise en main propre uniquement.
  return {
    '@type': 'OfferShippingDetails',
    doesNotShip: true,
  };
}

export function annonceJsonLd(annonce: Annonce, photos: string[]) {
  const url = `${SITE_URL}/annonce/${buildSlug(annonce)}`;
  const description = metaDescription(annonce);
  const nom = annonce.titre;
  // Une annonce sans photo reprend l'image générique du site plutôt que rien :
  // l'image est requise pour être éligible aux résultats enrichis produit.
  const images = photos.length ? photos : [`${SITE_URL}/og-image.jpg`];

  const prixConnu = annonce.is_don || (typeof annonce.prix === 'number' && annonce.prix > 0);

  // Échange sans prix (ou prix absent) : déclarer un prix de 0 € laisserait
  // croire à un produit gratuit. On décrit alors la page comme une page de
  // détail, sans offre chiffrée.
  if (!prixConnu) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      url,
      name: nom,
      description,
      image: images[0],
      datePublished: annonce.created_at,
      about: {
        '@type': 'Thing',
        name: nomAffiche(annonce),
        description,
        image: images,
      },
    };
  }

  const condition = annonce.etat ? ETAT_VERS_SCHEMA[annonce.etat] : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#produit`,
    url,
    sku: `aquatopia-${annonce.id}`,
    name: nom,
    description,
    image: images,
    category: annonce.categorie,
    // Identifiant de marque : les animaux et plantes n'ont pas de GTIN ;
    // déclarer Aquatopia comme marque-distributeur satisfait l'exigence
    // Google « identifiant global manquant ».
    brand: {
      '@type': 'Brand',
      name: 'Aquatopia',
    },
    ...(annonce.nom_scientifique ? { alternateName: annonce.nom_scientifique } : {}),
    offers: {
      '@type': 'Offer',
      url,
      price: annonce.is_don ? 0 : annonce.prix,
      priceCurrency: 'EUR',
      priceValidUntil: dansJours(30),
      validFrom: annonce.created_at,
      availability: 'https://schema.org/InStock',
      ...(condition ? { itemCondition: condition } : {}),
      ...(annonce.quantite ? { inventoryLevel: { '@type': 'QuantitativeValue', value: annonce.quantite } } : {}),
      areaServed: annonce.ville ?? 'France',
      hasMerchantReturnPolicy: RETURN_POLICY,
      shippingDetails: shippingDetails(Boolean(annonce.envoi_possible)),
    },
  };
}
