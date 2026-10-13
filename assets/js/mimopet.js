/* Página de links conceitual da MimoPet.
   Os contatos vêm de assets/js/config.js (os mesmos do site da Blue Rose). */

document.querySelectorAll('[data-zap]').forEach((link) => {
  const texto = encodeURIComponent(link.dataset.zap);
  const web = `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
  link.href = web;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  abrirNoApp(link, 'whatsapp', `phone=${CONFIG.whatsapp}&text=${texto}`, web);
});
