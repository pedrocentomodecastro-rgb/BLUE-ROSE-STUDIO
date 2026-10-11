/* Página de links da bio. Os contatos ficam em assets/js/config.js */

const abrirEmNovaAba = (link, url) => {
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
};

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  abrirEmNovaAba(
    link,
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(link.dataset.whatsapp)}`
  );
});

const enderecos = {
  instagram: `https://www.instagram.com/${CONFIG.instagram}/`,
  tiktok: `https://www.tiktok.com/@${CONFIG.tiktok}`,
};

document.querySelectorAll('[data-link]').forEach((link) => {
  const tipo = link.dataset.link;
  if (tipo === 'site') {
    link.href = CONFIG.site;
  } else if (enderecos[tipo]) {
    abrirEmNovaAba(link, enderecos[tipo]);
  }
});

/* ----- Parallax simples -----
   Cada elemento com data-parallax se desloca numa velocidade diferente ao
   rolar a página (e, no computador, ao mover o mouse). */

const camadas = [...document.querySelectorAll('[data-parallax]')];
const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (camadas.length && !semMovimento) {
  let ponteiroX = 0;
  let ponteiroY = 0;
  let agendado = false;

  const atualizar = () => {
    agendado = false;
    const rolagem = window.scrollY;
    camadas.forEach((camada) => {
      const velocidade = parseFloat(camada.dataset.parallax);
      const x = ponteiroX * velocidade * 60;
      const y = rolagem * velocidade + ponteiroY * velocidade * 60;
      camada.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    });
  };

  const agendar = () => {
    if (!agendado) {
      agendado = true;
      requestAnimationFrame(atualizar);
    }
  };

  window.addEventListener('scroll', agendar, { passive: true });

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', (evento) => {
      ponteiroX = evento.clientX / window.innerWidth - 0.5;
      ponteiroY = evento.clientY / window.innerHeight - 0.5;
      agendar();
    });
  }

  atualizar();
}
