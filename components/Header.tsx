import Image from 'next/image';
import Link from 'next/link';
import DownloadButton from './DownloadButton';

export default function Header() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <Link href="/" className="logo">
          <Image src="/logo.webp" alt="Logo Aquatopia, marketplace aquariophile" width={32} height={34} priority />
          <span className="logo-word">Aqua<b>topia</b></span>
        </Link>
        <nav className="nav-links">
          <a href="/#fonctionnement" className="hide-mobile">Comment ça marche</a>
          <a href="/#categories" className="hide-mobile">Catégories</a>
          <Link href="/guides" className="hide-mobile">Guides</Link>
          <a href="/#confiance" className="hide-mobile">Confiance</a>
          <Link href="/faq" className="hide-mobile">FAQ débutant</Link>
          <DownloadButton className="btn btn-primary">Télécharger</DownloadButton>
        </nav>
      </div>
    </header>
  );
}
