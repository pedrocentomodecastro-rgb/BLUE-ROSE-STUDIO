/* Minisite conceitual da Barbearia Dom Cortês.
   Os contatos vêm de assets/js/config.js (os mesmos do site da Blue Rose). */

const formatarTelefone = (numero) => {
  const local = numero.replace(/^55/, '');
  return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
};

document.querySelectorAll('[data-zap]').forEach((link) => {
  const texto = encodeURIComponent(link.dataset.zap);
  const web = `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
  link.href = web;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  abrirNoApp(link, 'whatsapp', `phone=${CONFIG.whatsapp}&text=${texto}`, web);
});

document.querySelectorAll('[data-insta]').forEach((link) => {
  const web = `https://www.instagram.com/${CONFIG.instagram}/`;
  link.href = web;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  abrirNoApp(link, 'instagram', CONFIG.instagram, web);
});

document.querySelectorAll('[data-telefone]').forEach((el) => {
  el.textContent = formatarTelefone(CONFIG.whatsapp);
});
document.querySelectorAll('[data-arroba]').forEach((el) => {
  el.textContent = `@${CONFIG.instagram}`;
});

/* Destaca o dia de hoje e diz se a barbearia está aberta agora */
const agora = new Date();
const status = document.getElementById('status');
document.querySelectorAll('.hours tr').forEach((linha) => {
  const dias = linha.dataset.dias.split(',').map(Number);
  if (!dias.includes(agora.getDay())) return;
  linha.classList.add('is-today');
  const hora = agora.getHours() + agora.getMinutes() / 60;
  const aberta = hora >= Number(linha.dataset.abre) && hora < Number(linha.dataset.fecha);
  status.textContent = aberta
    ? `Aberto agora, até as ${linha.dataset.fecha}h`
    : `Fechado agora. Hoje: ${linha.cells[1].textContent}`;
  status.classList.toggle('is-open', aberta);
  status.hidden = false;
});
