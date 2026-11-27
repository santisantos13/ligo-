// Solicitação: preenche as listas do formulário com os dados de dados.js

const campoCategoria = document.querySelector("#categoria");
const campoCidade = document.querySelector("#cidade");
const formularioSolicitacao = document.querySelector("#formulario-solicitacao");

function preencherLista(select, itens) {
  itens.forEach(function (item) {
    const opcao = document.createElement("option");

    opcao.value = item.slug;
    opcao.textContent = item.nome;
    select.append(opcao);
  });
}

preencherLista(campoCategoria, categorias);
preencherLista(campoCidade, cidades);

// Provisório: o envio de verdade entra na próxima etapa
formularioSolicitacao.addEventListener("submit", function (event) {
  event.preventDefault();
});
