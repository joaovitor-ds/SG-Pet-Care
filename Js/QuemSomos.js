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
