const botaoMenu = document.querySelector(".menu-botao");
const menu = document.querySelector("#menu");

botaoMenu.addEventListener("click", function () {
  const aberto = menu.classList.toggle("aberto");

  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});