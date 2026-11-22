import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { supabase } from '@/lib/supabase';
import { ESPECES_PUBLIEES } from '@/lib/especes';
import { ipClient } from '@/lib/anti-abus';

export const runtime = 'nodejs';

const MOTIFS: Record<string, string> = {
  mauvais_poisson:    "Ce n'est pas le bon animal / la bonne plante",
  floue:              'Photo floue ou de mauvaise qualité',
  variete_differente: 'Mâle / femelle ou variété différente',
  droits_auteur:      "Problème de droits d'auteur",
  autre:              'Autre',
};

const DESTINATAIRE = process.env.SIGNALEMENT_EMAIL_TO || 'contact@aquatopia.fr';
const EXPEDITEUR   = process.env.SIGNALEMENT_EMAIL_FROM || 'Aquatopia <onboarding@resend.dev>';

const echapper = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function envoyerMail(sujet: string, texte: string, html: string) {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    console.error('RESEND_API_KEY absente : mail de signalement non envoyé.');
    return; // Le signalement reste consultable dans Supabase.
  }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: EXPEDITEUR, to: [DESTINATAIRE], subject: sujet, text: texte, html }),
    });
    if (!r.ok) {
      // Visible dans Netlify > Logs > Functions (ex : destinataire non autorisé, clé invalide).
      console.error('Resend a refusé le mail de signalement', r.status, await r.text());
    }
  } catch (e) {
    console.error('Envoi du mail de signalement impossible', e);
  }
}

// POST /api/signaler-photo — { slug, motif, message?, site? (piège anti-robot) }
export async function POST(req: Request) {
  // Corps limité à quelques Ko : le formulaire n'envoie que 3 champs courts.
  const brut = await req.text().catch(() => '');
  if (!brut || brut.length > 4000) return NextResponse.json({ ok: false }, { status: 400 });
  let corps: { slug?: unknown; motif?: unknown; message?: unknown; site?: unknown };
  try { corps = JSON.parse(brut); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (!corps || typeof corps !== 'object') return NextResponse.json({ ok: false }, { status: 400 });

  // Champ piège : un robot le remplit, un visiteur ne le voit jamais.
  if (corps.site) return NextResponse.json({ ok: true });

  // Validation des types et des tailles (le champ message est limité à 500 caractères dans le formulaire).
  if (typeof corps.slug !== 'string' || corps.slug.length > 120) return NextResponse.json({ ok: false }, { status: 400 });
  if (typeof corps.motif !== 'string' || corps.motif.length > 40) return NextResponse.json({ ok: false }, { status: 400 });
  if (corps.message != null && (typeof corps.message !== 'string' || corps.message.length > 600)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const slug = corps.slug;
  const motif = corps.motif;
  const message = String(corps.message ?? '').trim().slice(0, 500);
  const espece = ESPECES_PUBLIEES.find((e) => e.slug === slug);
  if (!espece || !Object.prototype.hasOwnProperty.call(MOTIFS, motif)) return NextResponse.json({ ok: false }, { status: 400 });

  // IP fournie par Netlify (non falsifiable par le visiteur). Les limites (5 par IP et
  // 60 au total par heure) sont appliquées en base par signaler_photo_espece : elles
  // valent donc pour toutes les instances serverless.
  const ip = ipClient(req);
  const empreinte = createHash('sha256')
    .update(`${ip}|${process.env.SIGNALEMENT_SEL ?? 'aquatopia'}`).digest('hex').slice(0, 32);

  const { data, error } = await supabase.rpc('signaler_photo_espece', {
    p_slug: slug, p_motif: motif, p_message: message, p_empreinte: empreinte,
  });
  if (error) {
    console.error('signaler_photo_espece', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  if (data === 'limite') return NextResponse.json({ ok: false, limite: true }, { status: 429 });
  if (data !== 'ok')     return NextResponse.json({ ok: false }, { status: 400 });

  const url = `https://aquatopia.fr/especes/${slug}`;
  const image = `https://aquatopia.fr/especes/${slug}.webp`;
  await envoyerMail(
    `Photo signalée : ${espece.nomCommun}`,
    `Espèce : ${espece.nomCommun} (${espece.nomScientifique})\nMotif : ${MOTIFS[motif]}\n`
      + `${message ? `Message : ${message}\n` : ''}Fiche : ${url}\nPhoto : ${image}\n`,
    `<p><strong>${echapper(espece.nomCommun)}</strong> <em>(${echapper(espece.nomScientifique)})</em></p>`
      + `<p>Motif : <strong>${echapper(MOTIFS[motif])}</strong></p>`
      + (message ? `<p>Message : ${echapper(message)}</p>` : '')
      + `<p><a href="${url}">Voir la fiche</a> · <a href="${image}">Voir la photo</a></p>`
      + `<img src="${image}" alt="" style="max-width:420px;border-radius:8px" />`,
  );

  return NextResponse.json({ ok: true });
}
