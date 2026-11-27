// Anúncios: desenha na página os cards dos anúncios de dados.js.
// Mostra só os primeiros e libera o restante no botão "Ver mais anúncios".

const LIMITE_INICIAL = 6;

const listaAnuncios = document.querySelector("#anuncios-lista");
const rodapeAnuncios = document.querySelector("#anuncios-rodape");
const botaoMais = document.querySelector("#anuncios-mais");

let anunciosRestantes = [];

function buscarNome(lista, slug) {
  const item = lista.find(function (elemento) {
    return elemento.slug === slug;
  });

  return item ? item.nome : slug;
}

function criarCardAnuncio(anuncio, aparecerAoClicar) {
  const card = document.createElement("li");
  card.className = aparecerAoClicar ? "anuncio anuncio-extra" : "anuncio revelar";
  card.tabIndex = -1;

  const categoria = document.createElement("span");
  categoria.className = "anuncio-categoria";
  categoria.textContent = buscarNome(categorias, anuncio.categoria);

  const titulo = document.createElement("h3");
  titulo.textContent = anuncio.titulo;

  const prestador = document.createElement("p");
  prestador.className = "anuncio-prestador";
  prestador.textContent = "Por " + anuncio.prestador;

  const descricao = document.createElement("p");
  descricao.className = "anuncio-descricao";
  descricao.textContent = anuncio.descricao;

  const cidade = document.createElement("span");
  cidade.className = "anuncio-cidade";
  cidade.textContent = buscarNome(cidades, anuncio.cidade);

  card.append(categoria, titulo, prestador, descricao, cidade);

  return card;
}

function mostrarAnuncios(lista) {
  const iniciais = lista.slice(0, LIMITE_INICIAL);
  anunciosRestantes = lista.slice(LIMITE_INICIAL);

  listaAnuncios.replaceChildren(
    ...iniciais.map(function (anuncio) {
      return criarCardAnuncio(anuncio, false);
    })
  );

  rodapeAnuncios.hidden = anunciosRestantes.length === 0;
}

botaoMais.addEventListener("click", function () {
  const novos = anunciosRestantes.map(function (anuncio) {
    return criarCardAnuncio(anuncio, true);
  });

  listaAnuncios.append(...novos);
  anunciosRestantes = [];
  rodapeAnuncios.hidden = true;
  novos[0].focus();
});

mostrarAnuncios(anuncios);
