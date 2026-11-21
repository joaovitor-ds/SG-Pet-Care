(function(){
/* ==========================================================================
   SG PET CARE - BARRA DE NAVEGAÇÃO (navbar.js)
   Controla o menu do celular e o efeito do cabeçalho ao rolar a página.
   Não usa bibliotecas externas.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. PEGAR OS ELEMENTOS DA PÁGINA
   -------------------------------------------------------------------------- */

// Cabeçalho inteiro (a barra fixa no topo)
const cabecalho = document.querySelector('.cabecalho');

// Botão com o ícone de menu (três linhas)
const botaoMenu = cabecalho.querySelector('button');

// Menu de links usado no computador
const navegacao = cabecalho.querySelector('nav');


/* --------------------------------------------------------------------------
   2. CRIAR O MENU DO CELULAR
   O menu do celular é uma cópia do menu do computador,
   criada aqui para não precisar repetir os links no HTML.
   -------------------------------------------------------------------------- */

const menuMovel = document.createElement('div');       // caixa que guarda o menu
const navegacaoMovel = navegacao.cloneNode(true);      // cópia dos links

menuMovel.id = menuMovel.className = 'menu-movel';     // dá o nome "menu-movel" como id e classe
menuMovel.hidden = true;                               // começa escondido

navegacaoMovel.className = 'navegacao-movel';          // classe usada no CSS
navegacaoMovel.setAttribute('aria-label', 'Navegação móvel');

menuMovel.append(navegacaoMovel);                      // coloca os links dentro da caixa
cabecalho.append(menuMovel);                           // coloca a caixa dentro do cabeçalho

// Textos de acessibilidade (leitores de tela)
navegacao.setAttribute('aria-label', 'Navegação principal');
botaoMenu.setAttribute('aria-controls', menuMovel.id);
botaoMenu.setAttribute('aria-expanded', 'false');


/* --------------------------------------------------------------------------
   3. ABRIR E FECHAR O MENU
   -------------------------------------------------------------------------- */

// Guarda o ícone original (três linhas) e define o ícone de fechar (X)
const iconeMenu = botaoMenu.innerHTML;
const iconeFechar =
  '<svg class="icone icone-menu" viewBox="0 0 24 24" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12"/></svg>';

// Abre (aberto = true) ou fecha (aberto = false) o menu
function alternarMenu(aberto) {
  menuMovel.hidden = !aberto;
  botaoMenu.setAttribute('aria-expanded', aberto);
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  botaoMenu.innerHTML = aberto ? iconeFechar : iconeMenu;   // troca o ícone
}

// Clicar no botão abre/fecha o menu
botaoMenu.addEventListener('click', () => alternarMenu(menuMovel.hidden));

// Clicar em qualquer link do menu fecha o menu
navegacaoMovel.addEventListener('click', evento => {
  if (evento.target.closest('a')) alternarMenu(false);
});

// Apertar a tecla Esc fecha o menu e devolve o foco ao botão
document.addEventListener('keydown', evento => {
  if (evento.key === 'Escape' && !menuMovel.hidden) {
    alternarMenu(false);
    botaoMenu.focus();
  }
});

// Se a tela virar "grande" (1024px ou mais), fecha o menu do celular
const telaGrande = matchMedia('(min-width: 1024px)');
telaGrande.addEventListener('change', () => {
  if (telaGrande.matches) alternarMenu(false);
});


/* --------------------------------------------------------------------------
   4. EFEITO DO CABEÇALHO AO ROLAR A PÁGINA
   Depois de rolar mais de 12px, o cabeçalho ganha fundo desfocado
   e uma linha embaixo (classe "cabecalho-rolado").
   -------------------------------------------------------------------------- */

function atualizarCabecalho() {
  cabecalho.classList.toggle('cabecalho-rolado', scrollY > 12);
}

addEventListener('scroll', atualizarCabecalho, { passive: true });
atualizarCabecalho();   // roda uma vez ao abrir a página

})();
(function(){
/* ==========================================================================
   SG PET CARE - PÁGINA DE SERVIÇOS (servicos.js)
   Controla os cartões de serviço que viram (frente e verso).
   (O menu do celular fica no arquivo navbar.js)
   Não usa bibliotecas externas.
   ========================================================================== */


/* --------------------------------------------------------------------------
   CARTÕES DE SERVIÇO QUE VIRAM
   Cada cartão tem uma frente (nome e descrição) e um verso (preço e botão).
   O cartão vira:
   - ao clicar em "Saiba mais →" (e desvira em "Voltar")
   - ao passar o mouse (apenas em computadores com mouse)
   - a tecla Esc desvira o cartão
   -------------------------------------------------------------------------- */

// true se o aparelho usa mouse de verdade (e não toque na tela)
const usaMouse = matchMedia('(hover: hover) and (pointer: fine)');

// Repete o bloco abaixo para cada cartão da página
document.querySelectorAll('.cartao-servico').forEach((cartao, indice) => {

  // Partes do cartão
  const frente = cartao.querySelector('.frente-servico');
  const verso = cartao.querySelector('.verso-servico');
  const detalhes = frente.querySelector('button');   // botão "Saiba mais →"
  const voltar = verso.querySelector('button');      // botão "Voltar"

  // Dá um id único ao verso (detalhes-servico-1, -2, -3...) para acessibilidade
  verso.id = `detalhes-servico-${indice + 1}`;
  detalhes.setAttribute('aria-controls', verso.id);

  // Vira o cartão: aberto = true mostra o verso, false mostra a frente.
  // moverFoco = true leva o foco do teclado para o botão da face visível.
  function girar(aberto, moverFoco = false) {
    cartao.dataset.virado = aberto;                  // o CSS usa isso para girar
    frente.inert = aberto;                           // face escondida não recebe cliques/Tab
    verso.inert = !aberto;
    frente.setAttribute('aria-hidden', aberto);      // esconde a face invisível de leitores de tela
    verso.setAttribute('aria-hidden', !aberto);
    detalhes.setAttribute('aria-expanded', aberto);
    if (moverFoco) (aberto ? voltar : detalhes).focus({ preventScroll: true });
  }

  // Cliques nos botões
  detalhes.addEventListener('click', () => girar(true, true));
  voltar.addEventListener('click', () => girar(false, true));

  // Mouse entra no cartão: vira. Mouse sai: desvira.
  cartao.addEventListener('mouseenter', () => { if (usaMouse.matches) girar(true); });
  cartao.addEventListener('mouseleave', () => {
    if (usaMouse.matches) girar(false, verso.contains(document.activeElement));
  });

  // Tecla Esc desvira o cartão
  cartao.addEventListener('keydown', evento => {
    if (evento.key === 'Escape') girar(false, true);
  });

  // Estado inicial: cartão mostrando a frente
  girar(false);
});

})();

/* CARROSSEL - NOSSOS CLIENTES */
(function () {
  const slides = document.getElementsByClassName('carousel-img');
  const blurPrev = document.querySelector('.blur-prev');
  const blurNext = document.querySelector('.blur-next');
  let slideIndex = 0;

  function showSlide(n) {
    if (slides.length === 0) return;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
      slides[i].style.opacity = 0;
    }
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].style.display = 'block';
    setTimeout(() => { slides[slideIndex].style.opacity = 1; }, 10);
    const prev = (slideIndex - 1 + slides.length) % slides.length;
    const next = (slideIndex + 1) % slides.length;
    blurPrev.style.backgroundImage = `url('${slides[prev].src}')`;
    blurNext.style.backgroundImage = `url('${slides[next].src}')`;
  }

  document.querySelector('.btn-prev').addEventListener('click', () => showSlide(slideIndex - 1));
  document.querySelector('.btn-next').addEventListener('click', () => showSlide(slideIndex + 1));
  showSlide(0);
})();
