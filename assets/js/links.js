/* Abre WhatsApp, Instagram e TikTok direto no aplicativo quando a pessoa está
   no celular. Se o aplicativo não abrir, cai no endereço normal do navegador.
   Usado pelo site (script.js) e pela página de links (bio.js). */

const NO_ANDROID = /Android/i.test(navigator.userAgent);
const NO_IOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const ESPERA_DO_APP = 1500;

const enderecoDoApp = (tipo, valor, web) => {
  if (NO_ANDROID) {
    const reserva = `S.browser_fallback_url=${encodeURIComponent(web)};end`;
    if (tipo === 'whatsapp') return `intent://send?${valor}#Intent;scheme=whatsapp;${reserva}`;
    if (tipo === 'instagram') {
      return `intent://instagram.com/_u/${valor}/#Intent;package=com.instagram.android;scheme=https;${reserva}`;
    }
    if (tipo === 'tiktok') {
      return `intent://www.tiktok.com/@${valor}#Intent;package=com.zhiliaoapp.musically;scheme=https;${reserva}`;
    }
  }
  if (NO_IOS) {
    if (tipo === 'whatsapp') return `whatsapp://send?${valor}`;
    if (tipo === 'instagram') return `instagram://user?username=${valor}`;
  }
  return '';
};

/* tipo: 'whatsapp', 'instagram' ou 'tiktok'
   valor: usuário (Instagram/TikTok) ou "phone=...&text=..." (WhatsApp)
   web: endereço normal, usado se o aplicativo não abrir */
const abrirNoApp = (link, tipo, valor, web) => {
  const app = enderecoDoApp(tipo, valor, web);
  if (!app) return;

  link.dataset.app = app;
  link.dataset.web = web;
  link.removeAttribute('target');
  if (link.dataset.appLigado) return;
  link.dataset.appLigado = 'sim';

  link.addEventListener('click', (evento) => {
    evento.preventDefault();
    const reserva = setTimeout(() => {
      if (!document.hidden) window.location.href = link.dataset.web;
    }, ESPERA_DO_APP);
    window.addEventListener('pagehide', () => clearTimeout(reserva), { once: true });
    window.location.href = link.dataset.app;
  });
};
