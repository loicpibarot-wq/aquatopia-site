import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { supabase } from '@/lib/supabase';
import { ESPECES_PUBLIEES } from '@/lib/especes';

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
  let corps: { slug?: string; motif?: string; message?: string; site?: string };
  try { corps = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  // Champ piège : un robot le remplit, un visiteur ne le voit jamais.
  if (corps.site) return NextResponse.json({ ok: true });

  const slug = String(corps.slug ?? '');
  const motif = String(corps.motif ?? '');
  const message = String(corps.message ?? '').trim().slice(0, 500);
  const espece = ESPECES_PUBLIEES.find((e) => e.slug === slug);
  if (!espece || !MOTIFS[motif]) return NextResponse.json({ ok: false }, { status: 400 });

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim()
    || req.headers.get('x-nf-client-connection-ip') || 'inconnue';
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
