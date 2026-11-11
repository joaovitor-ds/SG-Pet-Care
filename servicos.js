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
