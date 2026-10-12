/* Os contatos (WhatsApp, Instagram, TikTok, e-mail) ficam em assets/js/config.js */

/* ==========================================================================
   PORTFÓLIO — adicione, troque ou remova projetos nesta lista
   --------------------------------------------------------------------------
   titulo:    nome do projeto
   categoria: use uma das categorias de CATEGORIAS (ou crie uma nova lá)
   descricao: texto que aparece ao abrir o projeto
   selo:      etiqueta do card (remova a linha para não mostrar)
   imagens:   caminhos das imagens, ex.: ['./assets/images/portfolio/pizzaria-1.jpg']
              A primeira vira a capa. Deixe [] para mostrar o espaço reservado.
   formato:   proporção das imagens na galeria (opcional). Padrão: quadrado.
              Use '3 / 4' para páginas em pé, como cardápios.
   unidade:   como chamar as imagens no aviso do card (opcional). Padrão: 'artes'.
   ========================================================================== */
const CATEGORIAS = [
  'Restaurantes e pizzarias',
  'Barbearias',
  'Pet shops',
  'Minisites',
];

const PROJETOS = [
  {
    titulo: 'Posts para pizzaria',
    categoria: 'Restaurantes e pizzarias',
    descricao: 'Pacote de 9 artes para o feed de uma pizzaria, com promoções, oferta 2 por 1 e divulgação de delivery.',
    selo: 'Projeto conceitual',
    imagens: [
      './assets/images/portfolio/pizzaria-3.jpg',
      './assets/images/portfolio/pizzaria-7.jpg',
      './assets/images/portfolio/pizzaria-1.jpg',
      './assets/images/portfolio/pizzaria-9.jpg',
      './assets/images/portfolio/pizzaria-8.jpg',
      './assets/images/portfolio/pizzaria-2.jpg',
      './assets/images/portfolio/pizzaria-5.jpg',
      './assets/images/portfolio/pizzaria-4.jpg',
      './assets/images/portfolio/pizzaria-6.jpg',
    ],
  },
  {
    titulo: 'Cardápio digital para restaurante',
    categoria: 'Restaurantes e pizzarias',
    descricao: 'Cardápio digital de 6 páginas para restaurante, com capa, menu da casa, combos, destaques, bebidas e sobremesas.',
    selo: 'Projeto conceitual',
    formato: '3 / 4',
    unidade: 'páginas',
    imagens: [
      './assets/images/portfolio/cardapio-1-capa.jpg',
      './assets/images/portfolio/cardapio-2-menu.jpg',
      './assets/images/portfolio/cardapio-3-combos.jpg',
      './assets/images/portfolio/cardapio-4-destaques.jpg',
      './assets/images/portfolio/cardapio-5-bebidas.jpg',
      './assets/images/portfolio/cardapio-6-favorito.jpg',
    ],
  },
  {
    titulo: 'Posts para barbearia',
    categoria: 'Barbearias',
    descricao: 'Estudo de posts com tabela de serviços, horários de atendimento e chamadas para agendamento.',
    selo: 'Projeto conceitual',
    imagens: [],
  },
  {
    titulo: 'Posts para pet shop',
    categoria: 'Pet shops',
    descricao: 'Estudo de artes para divulgar banho e tosa, produtos e campanhas sazonais.',
    selo: 'Projeto conceitual',
    imagens: [],
  },
  {
    titulo: 'Minisite para negócio local',
    categoria: 'Minisites',
    descricao: 'Estudo de página única com apresentação, serviços, localização e botão de WhatsApp.',
    selo: 'Projeto conceitual',
    imagens: [],
  },
];

/* ==========================================================================
   A partir daqui é o funcionamento do site — não precisa editar
   ========================================================================== */

const whatsappUrl = (mensagem) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;

const abrirEmNovaAba = (link, url) => {
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
};

const ligarWhatsapp = (link, mensagem) => {
  abrirEmNovaAba(link, whatsappUrl(mensagem));
  abrirNoApp(
    link,
    'whatsapp',
    `phone=${CONFIG.whatsapp}&text=${encodeURIComponent(mensagem)}`,
    whatsappUrl(mensagem)
  );
};

const aplicarWhatsapp = (raiz = document) => {
  raiz.querySelectorAll('[data-whatsapp]').forEach((link) => {
    ligarWhatsapp(link, link.dataset.whatsapp);
  });
};

aplicarWhatsapp();

const linksSociais = {
  instagram: `https://www.instagram.com/${CONFIG.instagram}/`,
  tiktok: `https://www.tiktok.com/@${CONFIG.tiktok}`,
};

document.querySelectorAll('[data-link]').forEach((link) => {
  const tipo = link.dataset.link;
  if (tipo === 'email') {
    if (CONFIG.email) {
      link.href = `mailto:${CONFIG.email}`;
    } else {
      link.closest('li').remove();
    }
  } else if (linksSociais[tipo]) {
    abrirEmNovaAba(link, linksSociais[tipo]);
    abrirNoApp(link, tipo, CONFIG[tipo], linksSociais[tipo]);
  }
});

/* ----- Portfólio ----- */

const filtros = document.getElementById('portfolio-filtros');
const grade = document.getElementById('portfolio-grade');
const dialogo = document.getElementById('projeto-dialogo');
const TODOS = 'Todos';
let categoriaAtiva = TODOS;

const criar = (tag, classe, texto) => {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
};

const criarMidia = (projeto, indice = 0) => {
  const caminho = projeto.imagens && projeto.imagens[indice];
  if (caminho) {
    const imagem = criar('img');
    imagem.src = caminho;
    imagem.alt = `${projeto.titulo} (${projeto.categoria})`;
    imagem.loading = 'lazy';
    return imagem;
  }
  const reserva = criar('div', 'placeholder');
  reserva.append(criar('span', 'placeholder-label', projeto.categoria));
  return reserva;
};

const abrirProjeto = (projeto) => {
  const midia = document.getElementById('projeto-midia');
  midia.replaceChildren();
  const imagens = projeto.imagens || [];
  const total = Math.max(1, imagens.length);
  // Com várias imagens, mostra uma grade; tocar numa imagem abre ela inteira.
  midia.classList.toggle('is-gallery', total > 1);
  midia.style.setProperty('--formato', projeto.formato || '1');
  for (let i = 0; i < total; i += 1) {
    const item = criarMidia(projeto, i);
    if (total > 1) {
      const link = criar('a');
      abrirEmNovaAba(link, imagens[i]);
      link.setAttribute('aria-label', `Abrir imagem ${i + 1} de ${total} em tamanho maior`);
      link.style.setProperty('--ordem', i);
      link.append(item);
      midia.append(link);
    } else {
      midia.append(item);
    }
  }

  document.getElementById('projeto-categoria').textContent = projeto.selo
    ? `${projeto.categoria} · ${projeto.selo}`
    : projeto.categoria;
  document.getElementById('projeto-titulo').textContent = projeto.titulo;
  document.getElementById('projeto-descricao').textContent = projeto.descricao;
  ligarWhatsapp(
    document.getElementById('projeto-cta'),
    `Olá! Vi o projeto "${projeto.titulo}" no site e quero algo parecido para o meu negócio.`
  );

  if (typeof dialogo.showModal === 'function') {
    dialogo.showModal();
  } else {
    dialogo.setAttribute('open', '');
  }
};

/* Capa animada: projetos com várias imagens alternam entre elas no card. */
const INTERVALO_CAPA = 1800;
const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let carrosseis = [];

const iniciarCarrossel = (capa, projeto) => {
  const camadas = [capa.querySelector('img'), criar('img')];
  camadas[0].classList.add('is-active');
  camadas[1].alt = '';
  capa.classList.add('is-carousel');
  capa.append(camadas[1]);

  let indice = 0;
  let ativa = 0;
  carrosseis.push(
    setInterval(() => {
      indice = (indice + 1) % projeto.imagens.length;
      const proxima = camadas[1 - ativa];
      proxima.onload = () => {
        proxima.classList.add('is-active');
        camadas[ativa].classList.remove('is-active');
        ativa = 1 - ativa;
      };
      proxima.src = projeto.imagens[indice];
    }, INTERVALO_CAPA)
  );
};

const desenharProjetos = () => {
  carrosseis.forEach(clearInterval);
  carrosseis = [];

  const visiveis = PROJETOS.filter(
    (projeto) => categoriaAtiva === TODOS || projeto.categoria === categoriaAtiva
  );

  grade.replaceChildren(
    ...visiveis.map((projeto) => {
      const card = criar('button', 'project-card');
      card.type = 'button';
      card.setAttribute('aria-haspopup', 'dialog');

      const capa = criar('span', 'project-thumb');
      capa.append(criarMidia(projeto));
      if (projeto.formato) capa.classList.add('is-portrait');
      if (projeto.imagens && projeto.imagens.length > 1 && !semMovimento) {
        iniciarCarrossel(capa, projeto);
      }
      if (projeto.selo) capa.append(criar('span', 'project-badge', projeto.selo));
      if (projeto.imagens && projeto.imagens.length > 1) {
        const aviso = criar('span', 'project-more', `Ver as ${projeto.imagens.length} ${projeto.unidade || 'artes'} `);
        const seta = criar('span', '', '→');
        seta.setAttribute('aria-hidden', 'true');
        aviso.append(seta);
        capa.append(aviso);
      }

      const info = criar('span', 'project-info');
      info.append(
        criar('span', 'project-category', projeto.categoria),
        criar('span', 'project-title', projeto.titulo)
      );

      card.append(capa, info);
      card.addEventListener('click', () => abrirProjeto(projeto));
      return card;
    })
  );

  if (!visiveis.length) {
    grade.append(criar('p', 'fine-print', 'Em breve, projetos nesta categoria.'));
  }
};

const desenharFiltros = () => {
  filtros.replaceChildren(
    ...[TODOS, ...CATEGORIAS].map((categoria) => {
      const botao = criar('button', 'filter-chip', categoria);
      botao.type = 'button';
      botao.setAttribute('aria-pressed', String(categoria === categoriaAtiva));
      botao.addEventListener('click', () => {
        categoriaAtiva = categoria;
        desenharFiltros();
        desenharProjetos();
      });
      return botao;
    })
  );
};

if (filtros && grade && dialogo) {
  desenharFiltros();
  desenharProjetos();

  document.getElementById('projeto-fechar').addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('click', (evento) => {
    if (evento.target === dialogo) dialogo.close();
  });
}

/* ----- Animações leves de entrada ----- */

const itensAnimados = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  itensAnimados.forEach((item) => observador.observe(item));
} else {
  itensAnimados.forEach((item) => item.classList.add('is-visible'));
}
