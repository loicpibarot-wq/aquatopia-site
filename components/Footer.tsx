import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-row">
        <div className="foot-brand">
          <Image src="/logo.webp" alt="" width={20} height={21} />
          © 2026 Aquatopia — aquatopia.fr
        </div>
        <div className="foot-links">
          <a href="/#fonctionnement">Comment ça marche</a>
          <a href="/#categories">Catégories</a>
          <a href="/#confiance">Confiance</a>
          <a href="/#telecharger">Télécharger</a>
        </div>
      </div>
    </footer>
  );
}
