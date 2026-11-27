// Solicitação: listas do formulário, pré-preenchimento, validação e envio simulado
// (usa mostrarMensagem, limparErros e marcarInvalido, de autenticacao.js)

const LIMITE_DESCRICAO = 500;
const MINIMO_TITULO = 5;
const MINIMO_DESCRICAO = 20;

const formularioSolicitacao = document.querySelector("#formulario-solicitacao");
const areaMensagem = document.querySelector("#solicitacao-erro");
const campoTitulo = document.querySelector("#titulo");
const areaCategorias = document.querySelector("#categoria-grupos");
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

preencherLista(campoCidade, cidades);

// ---------- Categoria em dois passos: primeiro o grupo, depois a categoria ----------

const botoesGrupos = document.createElement("div");
const listasGrupos = [];

function criarOpcaoCategoria(categoria) {
  const rotulo = document.createElement("label");
  const radio = document.createElement("input");
  const cartao = document.createElement("span");
  const nome = document.createElement("strong");

  rotulo.className = "tipo-opcao";
  radio.type = "radio";
  radio.name = "categoria";
  radio.value = categoria.slug;
  cartao.className = "tipo-opcao-cartao";
  nome.textContent = categoria.nome;

  cartao.append(nome);
  rotulo.append(radio, cartao);

  return rotulo;
}

function abrirGrupo(slug) {
  botoesGrupos.hidden = true;

  listasGrupos.forEach(function (lista) {
    lista.hidden = lista.dataset.grupo !== slug;
  });
}

function voltarAosGrupos() {
  formularioSolicitacao.querySelectorAll('input[name="categoria"]').forEach(function (radio) {
    radio.checked = false;
  });

  listasGrupos.forEach(function (lista) {
    lista.hidden = true;
  });

  botoesGrupos.hidden = false;
}

function criarBotaoGrupo(grupo, total) {
  const botao = document.createElement("button");
  const nome = document.createElement("strong");
  const quantidade = document.createElement("small");

  botao.type = "button";
  botao.className = "categoria-grupo-botao";
  nome.textContent = grupo.nome;
  quantidade.textContent = total + (total === 1 ? " categoria" : " categorias");

  botao.append(nome, quantidade);

  botao.addEventListener("click", function () {
    abrirGrupo(grupo.slug);
    document.querySelector('.categoria-lista[data-grupo="' + grupo.slug + '"] input').focus();
  });

  return botao;
}

function criarListaGrupo(grupo, itens) {
  const lista = document.createElement("div");
  const topo = document.createElement("div");
  const titulo = document.createElement("p");
  const voltar = document.createElement("button");
  const opcoes = document.createElement("div");

  lista.className = "categoria-lista";
  lista.dataset.grupo = grupo.slug;
  lista.hidden = true;
  topo.className = "categoria-lista-topo";
  titulo.className = "categoria-lista-titulo";
  titulo.textContent = grupo.nome;
  voltar.type = "button";
  voltar.className = "categoria-voltar";
  voltar.textContent = "\u2190 Trocar grupo";
  opcoes.className = "tipo-opcoes categoria-opcoes";

  itens.forEach(function (categoria) {
    opcoes.append(criarOpcaoCategoria(categoria));
  });

  voltar.addEventListener("click", function () {
    voltarAosGrupos();
    botoesGrupos.querySelector("button").focus();
  });

  topo.append(titulo, voltar);
  lista.append(topo, opcoes);

  return lista;
}

function montarCategorias() {
  botoesGrupos.className = "categoria-grupos-botoes";

  grupos.forEach(function (grupo) {
    const itens = categorias.filter(function (categoria) {
      return categoria.grupo === grupo.slug;
    });
    const lista = criarListaGrupo(grupo, itens);

    botoesGrupos.append(criarBotaoGrupo(grupo, itens.length));
    listasGrupos.push(lista);
    areaCategorias.append(lista);
  });

  areaCategorias.prepend(botoesGrupos);
}

montarCategorias();

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
  const radioUrl = formularioSolicitacao.querySelector('input[name="categoria"][value="' + categoriaUrl + '"]');

  radioUrl.checked = true;
  abrirGrupo(radioUrl.closest(".categoria-lista").dataset.grupo);
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

  if (!formularioSolicitacao.querySelector('input[name="categoria"]:checked')) {
    const primeiroCampo =
      formularioSolicitacao.querySelector(".categoria-lista:not([hidden]) input") ||
      botoesGrupos.querySelector("button");

    marcarInvalido(primeiroCampo, areaMensagem, "Escolha uma categoria.");
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
