import Image from 'next/image';
import Link from 'next/link';
import { LienGererCookies } from '@/components/ConsentementAnalytics';

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
          <a href="/#categories">Annonces</a>
          <a href="/#confiance">Confiance</a>
          <a href="/#telecharger">Télécharger</a>
          <Link href="/dons">À donner</Link>
          <Link href="/echanges">À échanger</Link>
          <Link href="/aquarium-occasion">Annonces par ville</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/especes">Espèces</Link>
          <Link href="/faq">FAQ débutant</Link>
          <Link href="/glossaire">Glossaire</Link>
          <Link href="/a-propos">À propos</Link>
          <LienGererCookies />
          <a href="https://www.facebook.com/share/1DmYnkCM4g/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/aquatopia.app" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@aquatopia.app" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
