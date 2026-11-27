// Solicitação: listas do formulário, pré-preenchimento, validação e envio simulado
// (usa mostrarMensagem, limparErros e marcarInvalido, de autenticacao.js)

const LIMITE_DESCRICAO = 500;
const MINIMO_TITULO = 5;
const MINIMO_DESCRICAO = 20;

const formularioSolicitacao = document.querySelector("#formulario-solicitacao");
const areaMensagem = document.querySelector("#solicitacao-erro");
const campoTitulo = document.querySelector("#titulo");
const campoCategoria = document.querySelector("#categoria");
const campoCidade = document.querySelector("#cidade");
const campoDescricao = document.querySelector("#descricao");
const contadorDescricao = document.querySelector("#descricao-contador");

// ---------- Listas ----------

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

// ---------- Pré-preenchimento (?categoria=, ?cidade= e ?servico=) ----------

function existeNaLista(lista, slug) {
  return lista.some(function (item) {
    return item.slug === slug;
  });
}

const parametros = new URLSearchParams(window.location.search);
const categoriaUrl = parametros.get("categoria") || "";
const cidadeUrl = parametros.get("cidade") || "";
const servicoUrl = (parametros.get("servico") || "").replace(/-/g, " ").trim();

if (existeNaLista(categorias, categoriaUrl)) {
  campoCategoria.value = categoriaUrl;
}

if (existeNaLista(cidades, cidadeUrl)) {
  campoCidade.value = cidadeUrl;
}

campoTitulo.value = servicoUrl.slice(0, campoTitulo.maxLength);

// ---------- Contador de caracteres ----------

function atualizarContador() {
  contadorDescricao.textContent = campoDescricao.value.length + "/" + LIMITE_DESCRICAO;
}

campoDescricao.addEventListener("input", atualizarContador);
atualizarContador();

// ---------- Envio ----------

formularioSolicitacao.addEventListener("submit", function (event) {
  event.preventDefault();
  limparErros(formularioSolicitacao, areaMensagem);

  if (campoTitulo.value.trim().length < MINIMO_TITULO) {
    marcarInvalido(campoTitulo, areaMensagem, "Digite o que você precisa (mínimo de " + MINIMO_TITULO + " caracteres).");
    return;
  }

  if (campoCategoria.value === "") {
    marcarInvalido(campoCategoria, areaMensagem, "Escolha uma categoria.");
    return;
  }

  if (campoCidade.value === "") {
    marcarInvalido(campoCidade, areaMensagem, "Escolha sua cidade.");
    return;
  }

  if (campoDescricao.value.trim().length < MINIMO_DESCRICAO) {
    marcarInvalido(campoDescricao, areaMensagem, "Descreva com mais detalhes (mínimo de " + MINIMO_DESCRICAO + " caracteres).");
    return;
  }

  const entrar = document.createElement("a");

  entrar.href = "login.html";
  entrar.textContent = "Entrar na conta";

  mostrarMensagem(
    areaMensagem,
    "Solicitação válida! Para publicá-la, é preciso entrar na sua conta. (Simulação: ainda não há servidor, nada foi enviado.) ",
    "sucesso"
  );
  areaMensagem.append(entrar);
});

formularioSolicitacao.addEventListener("input", function () {
  limparErros(formularioSolicitacao, areaMensagem);
});
