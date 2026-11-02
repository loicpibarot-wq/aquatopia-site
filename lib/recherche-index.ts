import { GUIDES } from '@/lib/guides';
import { ESPECES_PUBLIEES } from '@/lib/especes';
import { GLOSSAIRE } from '@/lib/glossaire';
import { FAQ_CATEGORIES } from '@/lib/faq';
import { normaliser, type ElementIndex } from '@/lib/recherche';

const PAGES: { titre: string; sous: string; href: string; mots: string }[] = [
  { titre: 'Simulateur d’aquarium', sous: 'Page', href: '/simulateur', mots: 'configurer peuplement compatibilite volume litres poissons bac' },
  { titre: 'Comment ça marche', sous: 'Page', href: '/#fonctionnement', mots: 'fonctionnement remise main propre vendre adopter application' },
  { titre: 'Télécharger l’application', sous: 'Page', href: '/#telecharger', mots: 'app iphone android ios google play app store installer gratuit' },
  { titre: 'Catalogue des espèces', sous: 'Page', href: '/especes', mots: 'poissons plantes coraux crevettes fiches techniques' },
  { titre: 'Tous les guides', sous: 'Page', href: '/guides', mots: 'conseils articles apprendre' },
  { titre: 'FAQ débutant', sous: 'Page', href: '/faq', mots: 'questions reponses debuter aide' },
  { titre: 'Glossaire', sous: 'Page', href: '/glossaire', mots: 'definitions vocabulaire termes lexique' },
  { titre: 'Annonces de poissons et vivant', sous: 'Annonces', href: '/categorie/vivant', mots: 'acheter poissons crevettes escargots vivant' },
  { titre: 'Annonces de plantes', sous: 'Annonces', href: '/categorie/plantes', mots: 'acheter plantes aquatiques boutures mousse' },
  { titre: 'Annonces d’aquariums', sous: 'Annonces', href: '/categorie/cuves', mots: 'acheter aquarium cuve bac occasion' },
  { titre: 'Annonces de matériel', sous: 'Annonces', href: '/categorie/materiel', mots: 'acheter filtre chauffage pompe materiel occasion' },
  { titre: 'Annonces d’éclairage', sous: 'Annonces', href: '/categorie/eclairage', mots: 'rampe led lumiere' },
  { titre: 'Annonces de décors', sous: 'Annonces', href: '/categorie/decor', mots: 'roche bois decoration racines' },
  { titre: 'Dons d’aquariophilie', sous: 'Annonces', href: '/dons', mots: 'gratuit donner offrir don' },
  { titre: 'Échanges entre aquariophiles', sous: 'Annonces', href: '/echanges', mots: 'troc echanger boutures' },
  { titre: 'Aquariums d’occasion près de chez vous', sous: 'Annonces', href: '/aquarium-occasion', mots: 'ville departement proche chez moi occasion' },
  { titre: 'Poster une annonce', sous: 'Guide', href: '/guides/deposer-annonce-aquariophilie-gratuite', mots: 'vendre donner deposer publier annonce gratuite' },
  { titre: 'À propos d’Aquatopia', sous: 'Page', href: '/a-propos', mots: 'equipe qui sommes nous contact' },
];

export function construireIndex(): ElementIndex[] {
  const out: ElementIndex[] = [];

  for (const p of PAGES) out.push({ t: 'page', titre: p.titre, sous: p.sous, href: p.href, k: normaliser(p.titre), d: normaliser(p.mots) });

  for (const g of GUIDES) {
    const sections = g.sections.map((s) => s.titre ?? '').join(' ');
    out.push({ t: 'guide', titre: g.titre, sous: g.eyebrow, href: `/guides/${g.slug}`, k: normaliser(g.titre), d: normaliser(`${g.description} ${sections}`) });
  }

  for (const t of GLOSSAIRE) {
    out.push({ t: 'terme', titre: t.terme, sous: t.categorie, href: `/glossaire/${t.slug}`, k: normaliser(t.terme), d: normaliser(t.definition) });
  }

  for (const e of ESPECES_PUBLIEES) {
    out.push({
      t: 'espece',
      titre: e.nomCommun,
      sous: e.nomScientifique,
      href: `/especes/${e.slug}`,
      k: normaliser([e.nomCommun, e.nomScientifique, ...(e.autresNoms ?? [])].join(' ')),
      d: normaliser(e.categorie),
    });
  }

  for (const c of FAQ_CATEGORIES) {
    for (const q of c.questions) {
      out.push({
        t: 'faq',
        titre: q.question,
        sous: c.titre,
        href: q.guide ? `/guides/${q.guide}` : `/faq#${c.slug}`,
        k: normaliser(q.question),
        d: normaliser(q.reponse),
      });
    }
  }

  return out;
}
