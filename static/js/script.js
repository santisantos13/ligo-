const botaoMenu = document.querySelector(".menu-botao");
const menu = document.querySelector("#menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
}

// Marca o link ativo no menu conforme a página atual
const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
const linksMenu = document.querySelectorAll(".links > li > a");

linksMenu.forEach(function (link) {
  const hrefLink = link.getAttribute("href");

  if (hrefLink === paginaAtual) {
    link.classList.add("ativo");
    link.setAttribute("aria-current", "page");
  }
});

// Seletor de cidades na barra de busca
const cidadeSeletor = document.querySelector("#cidade-seletor");
const cidadeTexto = document.querySelector("#cidade-texto");
const cidadeInput = document.querySelector("#cidade-input");

if (cidadeSeletor) {
  const botoesCidade = cidadeSeletor.querySelectorAll(".cidade-lista button");

  botoesCidade.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const valor = botao.dataset.value;
      cidadeInput.value = valor;
      cidadeTexto.textContent = valor ? botao.textContent : "Sua cidade";
      cidadeSeletor.removeAttribute("open");
    });
  });
}

// Fecha os menus suspensos (Categorias e Cidades) ao clicar fora
const categoriasSeletor = document.querySelector(".categorias");

document.addEventListener("click", function (event) {
  if (cidadeSeletor && !cidadeSeletor.contains(event.target)) {
    cidadeSeletor.removeAttribute("open");
  }

  if (categoriasSeletor && !categoriasSeletor.contains(event.target)) {
    categoriasSeletor.removeAttribute("open");
  }
});