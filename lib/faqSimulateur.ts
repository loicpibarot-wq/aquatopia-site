// FAQ affichée sous le simulateur : les questions que les débutants tapent le
// plus sur Google avant de choisir leur aquarium (quel poisson, quel volume,
// quel matériel, quel budget). Volontairement distincte de /faq (qui couvre
// aussi l'entretien, la santé, l'alimentation) : ici, tout est tourné vers le
// choix d'un setup, ce que le simulateur calcule justement.
//
// Les chiffres donnés sont des repères prudents de l'aquariophilie courante,
// toujours présentés comme indicatifs : la bonne réponse dépend de l'espèce
// précise (voir les fiches espèces) et du bac réel.
import type { FaqCategorie } from './faq';

export const FAQ_SIMULATEUR: FaqCategorie[] = [
  {
    titre: 'Choisir ses poissons',
    slug: 'choisir-poissons',
    questions: [
      {
        question: 'Quel poisson choisir pour débuter en aquarium ?',
        reponse:
          "Pour un premier bac, choisissez des espèces robustes, paisibles et pardonnantes : Guppy, Platy, Danio zébré, Corydoras ou Rasbora, par exemple. Évitez les espèces délicates ou à forte croissance, et choisissez toujours vos poissons en fonction du volume réel de votre bac. C'est précisément ce que le simulateur ci-dessus calcule pour vous.",
      },
      {
        question: 'Quels sont les poissons les plus faciles à entretenir ?',
        reponse:
          "Les plus résistants sont en général les petits vivipares (Guppy, Platy, Xipho), le Danio zébré, les Corydoras et certains Rasboras : ils tolèrent mieux les petites variations de l'eau et mangent sans difficulté. Facile ne veut pas dire sans entretien : un bac cyclé et des changements d'eau réguliers restent indispensables.",
      },
      {
        question: 'Quels poissons pour un aquarium de 60 L, 100 L ou 200 L ?',
        reponse:
          "À 60 litres, privilégiez de petites espèces de banc (Rasboras, Néons, petits Tétras) et quelques Corydoras. Vers 100 litres, on peut ajouter des poissons un peu plus grands ou un Gourami nain. À partir de 200 litres, des espèces plus grandes ou des Cichlidés paisibles deviennent possibles. Le volume minimum de chaque espèce est indiqué sur sa fiche.",
      },
      {
        question: 'Quel poisson pour un petit aquarium de 20 à 30 L ?',
        reponse:
          "Dans un nano-bac, restez sur de très petits habitants : un seul Betta mâle, un petit groupe de Rasboras nains (Boraras) ou de Danios, quelques Guppys ou Endlers, ou des crevettes Neocaridina. Les petits volumes pardonnent peu : mieux vaut peu d'habitants et une eau stable.",
      },
      {
        question: 'Quels poissons vivent en banc, et combien en mettre ?',
        reponse:
          "Les Néons, Rasboras, Tétras, Danios ou Barbus vivent en groupe et se stressent quand ils sont seuls. On compte généralement au moins 6 individus de la même espèce (davantage pour les plus actifs) : en dessous, ils deviennent timides ou s'en prennent aux autres poissons.",
      },
      {
        question: 'Quels poissons peuvent vivre ensemble dans un aquarium communautaire ?',
        reponse:
          "Associez des poissons de même gabarit et de tempérament calme, qui apprécient la même température et le même type d'eau. Évitez de mélanger espèces territoriales, prédateurs (qui avalent les plus petits) et poissons à longues nageoires avec des espèces qui les mordillent. Le simulateur ne vous propose que des espèces adaptées à votre bac.",
      },
      {
        question: 'Quels poissons pour un aquarium sans chauffage ?',
        reponse:
          "Quelques espèces supportent une eau tempérée (environ 18 à 22 °C) : le poisson rouge (dans un grand bac ou un bassin), le Tanichthys albonubes ou le Danio zébré dans une pièce suffisamment tempérée. Les poissons tropicaux classiques, eux, ont besoin d'un chauffage.",
      },
      {
        question: 'Quel poisson nettoie l’aquarium ?',
        reponse:
          "Aucun poisson n'entretient un aquarium à lui seul. Certains aident : les Otocinclus et plusieurs crevettes (Neocaridina, Caridina) broutent les algues, et les Corydoras récupèrent la nourriture tombée au sol. Méfiez-vous des « nettoyeurs » vendus tout petits qui deviennent très grands, comme certains Plécos.",
      },
      {
        question: 'Quelle crevette choisir pour débuter ?',
        reponse:
          "La Neocaridina (crevette cerise et ses variétés colorées) est la plus tolérante et s'adapte à la plupart des eaux du robinet traitées. Les Caridina (Crystal, Taiwan Bee) demandent une eau plus douce et plus stable : mieux vaut les réserver à un second bac.",
      },
      {
        question: 'Peut-on mettre un poisson rouge avec des poissons tropicaux ?',
        reponse:
          "Non, ce n'est pas recommandé : le poisson rouge est un poisson d'eau tempérée qui supporte mal la chaleur d'un bac tropical, et il salit beaucoup l'eau. Il se garde idéalement avec d'autres poissons rouges, dans un grand bac ou en bassin.",
      },
      {
        question: 'Un Betta peut-il vivre avec d’autres poissons ?',
        reponse:
          "Un Betta mâle peut cohabiter avec des espèces paisibles, petites et sans longues nageoires colorées (Corydoras, certaines crevettes), dans un bac assez grand et bien planté. Jamais deux mâles ensemble, et on évite les Guppys mâles, trop proches d'un rival à ses yeux.",
      },
    ],
  },
  {
    titre: 'Choisir la taille et le volume',
    slug: 'taille-volume',
    questions: [
      {
        question: 'Quelle taille d’aquarium choisir pour commencer ?',
        reponse:
          "Visez au moins 60 litres si vous le pouvez : plus le volume est grand, plus l'eau reste stable et plus les erreurs sont pardonnées. Un petit bac (moins de 30 litres) est réservé à de très petits habitants et demande davantage de rigueur.",
      },
      {
        question: 'Combien de litres pour un aquarium de départ ?',
        reponse:
          "Un bac de 60 à 100 litres est un bon compromis : assez stable pour pardonner, assez compact pour un salon et abordable. N'oubliez pas le poids : un aquarium plein pèse environ 1 kg par litre, plus celui du meuble et du décor.",
      },
      {
        question: 'Combien de poissons dans un aquarium de 60 L, 100 L ou 200 L ?',
        reponse:
          "À titre indicatif, pour de petits poissons paisibles de 3 à 4 cm dans un bac planté et bien filtré, on compte environ 10 à 12 poissons à 60 litres, une vingtaine à 100 litres et une quarantaine à 200 litres. Peuplez progressivement et observez l'eau : ces repères baissent pour des espèces plus grandes ou plus actives.",
      },
      {
        question: 'Combien de poissons par litre ?',
        reponse:
          "Il n'existe pas de formule fiable : la règle du « 1 cm de poisson par litre » est trop simpliste, car la bonne charge dépend de la filtration, de la taille adulte, du comportement et du volume réellement disponible. Pour de petits poissons paisibles, un repère prudent est un poisson de 3 à 4 cm pour 4 à 5 litres.",
      },
      {
        question: 'Un petit aquarium est-il plus difficile qu’un grand ?',
        reponse:
          "Oui, contrairement à ce qu'on imagine : dans un petit volume, une erreur (trop de nourriture, panne de chauffage, poisson mort) fait varier l'eau beaucoup plus vite. À partir de 60 litres, on dispose de plus de temps pour corriger.",
      },
      {
        question: 'Comment calculer le volume en litres d’un aquarium ?',
        reponse:
          "Multipliez la longueur, la largeur et la hauteur d'eau en centimètres, puis divisez par 1 000 : un bac de 100 × 40 × 50 cm contient 200 litres bruts. Le volume réel est plus faible (sol, décor, niveau d'eau sous le bord), souvent de 10 à 15 %.",
      },
      {
        question: 'Quel aquarium pour un poisson rouge ?',
        reponse:
          "Prévoyez un grand volume : on recommande généralement au moins 100 à 150 litres pour un premier poisson rouge, davantage par poisson supplémentaire. Les variétés communes et les Comètes grandissent beaucoup et sont à l'aise surtout en bassin.",
      },
    ],
  },
  {
    titre: 'Matériel et budget',
    slug: 'materiel-budget',
    questions: [
      {
        question: 'Quel matériel faut-il pour un aquarium ?',
        reponse:
          "Pour un bac tropical d'eau douce, il faut l'aquarium et son support, un filtre, un chauffage avec thermomètre, un éclairage, un sol, du décor ou des plantes, un conditionneur d'eau et des tests d'eau. Une épuisette et un seau réservé à l'aquarium complètent l'équipement.",
      },
      {
        question: 'Quel filtre choisir pour son aquarium ?',
        reponse:
          "Un repère courant est un débit nominal d'environ 3 à 5 fois le volume du bac par heure. Un filtre intérieur suffit pour un petit bac ; au-delà de 100 litres, un filtre extérieur offre plus de volume de filtration et libère de la place dans la cuve.",
      },
      {
        question: 'Quelle puissance de chauffage pour mon aquarium ?',
        reponse:
          "Comptez en repère environ 1 watt par litre, à ajuster selon la température de la pièce : un bac de 100 litres s'équipe donc d'un chauffage d'environ 100 W. Mieux vaut un modèle avec thermostat réglable, et un thermomètre pour contrôler.",
      },
      {
        question: 'Quel éclairage choisir pour un aquarium ?',
        reponse:
          "Les rampes LED sont aujourd'hui le choix courant : économes et peu chauffantes. Pour des poissons seuls, un éclairage modéré suffit ; pour des plantes, il faut plus d'intensité et un spectre adapté. Une durée de 6 à 8 heures par jour limite les algues.",
      },
      {
        question: 'Quel sol ou substrat choisir pour son aquarium ?',
        reponse:
          "Un sable ou un gravier fin de 2 à 4 mm convient à la plupart des bacs. Pour les poissons qui fouillent le fond (Corydoras), un sable fin ménage leurs barbillons. Pour un aquarium très planté, un sol nutritif ou un fond enrichi facilite la croissance des plantes.",
      },
      {
        question: 'Faut-il un chauffage dans un aquarium ?',
        reponse:
          "Pour les poissons tropicaux, oui : leur température idéale (24 à 27 °C) dépasse souvent celle de la pièce, surtout la nuit. Seules quelques espèces d'eau tempérée, comme le poisson rouge, peuvent s'en passer.",
      },
      {
        question: 'Combien coûte un aquarium complet ?',
        reponse:
          "Pour un premier bac de 60 à 100 litres équipé (aquarium, filtre, chauffage, éclairage, sol), il faut compter plusieurs centaines d'euros en neuf, nettement moins en occasion. Le simulateur ci-dessus vous donne une estimation du budget selon votre projet.",
      },
      {
        question: 'Aquarium d’occasion : que vérifier avant d’acheter ?',
        reponse:
          "Vérifiez l'étanchéité (silicone intact, aucune fuite à la mise en eau), l'absence de fêlure ou de rayure profonde sur les vitres, et le bon fonctionnement du filtre, du chauffage et de l'éclairage. Nettoyez à l'eau claire, jamais avec un produit ménager. Les annonces d'Aquatopia permettent de comparer les offres près de chez vous.",
      },
    ],
  },
  {
    titre: 'Installation et démarrage',
    slug: 'installation-demarrage',
    questions: [
      {
        question: 'Comment installer un aquarium étape par étape ?',
        reponse:
          "Placez le bac sur un support stable et de niveau, à l'abri du soleil direct. Rincez le sol, installez-le avec le décor, remplissez en versant l'eau doucement avec un conditionneur, puis branchez filtre, chauffage et éclairage. Les plantes peuvent être ajoutées tout de suite ; les poissons attendent la fin du cyclage.",
      },
      {
        question: 'Combien de temps avant de mettre des poissons ?',
        reponse:
          "Comptez 4 à 6 semaines de cyclage avant d'introduire les premiers poissons, le temps que les bactéries utiles s'installent. Des tests montrant ammoniac et nitrites à zéro confirment que le bac est prêt.",
      },
      {
        question: 'Qu’est-ce que le cycle de l’azote ?',
        reponse:
          "C'est la transformation, par des bactéries, de l'ammoniac toxique rejeté par les poissons en nitrites (également toxiques), puis en nitrates beaucoup moins nocifs. Ces bactéries colonisent le filtre et le sol : tant qu'elles ne sont pas installées, les poissons sont exposés à des pics toxiques.",
      },
      {
        question: 'Comment acclimater ses poissons à l’arrivée ?',
        reponse:
          "Laissez le sachet flotter 15 à 20 minutes pour égaliser les températures, puis ajoutez progressivement un peu d'eau du bac dans le sachet pendant une trentaine de minutes. Transférez ensuite les poissons à l'épuisette, sans verser l'eau du magasin dans l'aquarium, de préférence lumière éteinte.",
      },
      {
        question: 'Plantes avant ou après les poissons ?',
        reponse:
          "Avant, de préférence : les plantes absorbent une partie de l'ammoniac pendant le cyclage et s'installent tranquillement sans être dérangées. Elles stabilisent aussi l'eau et fournissent des cachettes dès l'arrivée des poissons.",
      },
      {
        question: 'Eau du robinet ou eau osmosée pour un aquarium ?',
        reponse:
          "L'eau du robinet convient à la grande majorité des poissons d'eau douce une fois le chlore neutralisé avec un conditionneur. L'eau osmosée n'est utile que pour des espèces exigeant une eau très douce, ou en aquarium récifal.",
      },
    ],
  },
  {
    titre: 'Eau de mer et bassin',
    slug: 'mer-bassin',
    questions: [
      {
        question: 'Un aquarium marin est-il possible pour un débutant ?',
        reponse:
          "C'est possible, mais plus exigeant qu'en eau douce : il faut davantage de matériel (écumeur, osmoseur, éclairage adapté), un cyclage plus long et un suivi plus régulier des paramètres. Pour un premier bac marin, commencez par des poissons et des coraux résistants, avec un budget et du temps de côté.",
      },
      {
        question: 'Combien coûte un aquarium récifal ?',
        reponse:
          "Nettement plus qu'un bac d'eau douce : éclairage adapté, écumeur, pompes de brassage, osmoseur, sel, roches vivantes et suppléments pèsent à l'achat comme à l'entretien. Il faut compter plusieurs centaines à plusieurs milliers d'euros selon la taille et les ambitions.",
      },
      {
        question: 'Quels coraux choisir pour débuter ?',
        reponse:
          "Les coraux les plus tolérants sont les Discosoma (champignons), les zoanthaires (à manipuler avec précaution car ils contiennent une toxine) et les coraux cuir comme les Sarcophyton. Les espèces plus exigeantes en lumière et en stabilité viennent ensuite, quand le bac a fait ses preuves.",
      },
      {
        question: 'Quels poissons pour un bassin de jardin ?',
        reponse:
          "Les poissons rouges (Comète, Shubunkin) et les Koï sont les plus répandus, les Orfes et les Tanches complètent bien un bassin plus grand. Prévoyez un volume suffisant : un Koï adulte demande plusieurs milliers de litres, et le bassin doit pouvoir être maintenu hors gel en hiver.",
      },
    ],
  },
];
