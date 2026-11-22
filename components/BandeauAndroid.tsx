'use client';

import { useEffect, useState } from 'react';
import DownloadButton from '@/components/DownloadButton';

// Bandeau « Ouvrir dans l'appli » pour Android (sur iPhone, Safari affiche son
// propre bandeau grâce à la balise apple-itunes-app du layout). Fermable : le
// choix est retenu 30 jours dans ce navigateur, sans aucun cookie.
const LIEN_PLAY = 'https://play.google.com/store/apps/details?id=com.noula34.aquatopia';
const CLE = 'aquatopia_bandeau_android_ferme';
const DUREE_MS = 30 * 24 * 60 * 60 * 1000;
// Clé du choix cookies (voir ConsentementAnalytics).
const CLE_CONSENTEMENT = 'aquatopia_consentement_v2';

export default function BandeauAndroid() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!/Android/i.test(navigator.userAgent)) return;
    try {
      const ferme = Number(localStorage.getItem(CLE) || 0);
      if (ferme && Date.now() - ferme < DUREE_MS) return;
    } catch {
      // stockage indisponible : on affiche quand même le bandeau
    }
    // Pas en même temps que la bannière cookies (petits écrans) : on attend que le
    // visiteur ait fait son choix.
    let choixFait = false;
    try {
      choixFait = !!localStorage.getItem(CLE_CONSENTEMENT);
    } catch {
      choixFait = true;
    }
    if (choixFait) {
      setVisible(true);
      return;
    }
    const surChoix = () => setVisible(true);
    window.addEventListener('aquatopia-consentement', surChoix);
    return () => window.removeEventListener('aquatopia-consentement', surChoix);
  }, []);

  if (!visible) return null;

  const fermer = () => {
    setVisible(false);
    try {
      localStorage.setItem(CLE, String(Date.now()));
    } catch {
      // rien à faire
    }
  };

  return (
    <div className="bandeau-appli" role="region" aria-label="Application Aquatopia">
      <button type="button" className="bandeau-appli-fermer" onClick={fermer} aria-label="Fermer">
        ×
      </button>
      <img src="/favicon-192.png" alt="" width={40} height={40} className="bandeau-appli-icone" />
      <div className="bandeau-appli-texte">
        <strong>Aquatopia</strong>
        <span>Gratuit sur Google Play</span>
      </div>
      <DownloadButton href={LIEN_PLAY} className="btn btn-primary bandeau-appli-bouton">
        Installer
      </DownloadButton>
    </div>
  );
}
