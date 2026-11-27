// Anúncios: filtra os anúncios de dados.js pelos parâmetros da URL
// (?categoria=, ?cidade= e ?servico=) e desenha os cards na página.
// Mostra só os primeiros e libera o restante no botão "Ver mais anúncios".

const LIMITE_INICIAL = 6;

// Palavras que não ajudam a achar nada ("preciso de um encanador" -> "encanador")
const PALAVRAS_IGNORADAS = [
  "um", "uma", "de", "do", "da", "dos", "das", "em", "no", "na",
  "para", "com", "por", "e", "o", "a", "preciso", "quero", "procuro", "busco"
];

const secaoDestaques = document.querySelector("#destaques");
const listaDestaques = document.querySelector("#destaques-lista");
const secaoAnuncios = document.querySelector("#anuncios");
const tituloAnuncios = document.querySelector("#anuncios-titulo");
const resumoAnuncios = document.querySelector("#anuncios-resumo");
const limparAnuncios = document.querySelector("#anuncios-limpar");
const listaAnuncios = document.querySelector("#anuncios-lista");
const vazioAnuncios = document.querySelector("#anuncios-vazio");
const rodapeAnuncios = document.querySelector("#anuncios-rodape");
const botaoMais = document.querySelector("#anuncios-mais");
const formularioBusca = document.querySelector(".busca");
const campoServico = document.querySelector('.busca input[name="servico"]');
const campoCidade = document.querySelector("#cidade-input");
const textoCidade = document.querySelector("#cidade-texto");

let anunciosRestantes = [];
let jaCarregada = false;
let digitando = false;

// ---------- Funções de apoio ----------

// Tira acento, maiúsculas e hífens, para "Elétrica" e "eletrica" serem iguais
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, " ")
    .trim();
}

function buscarNome(lista, slug) {
  const item = lista.find(function (elemento) {
    return elemento.slug === slug;
  });

  return item ? item.nome : slug;
}

// ---------- Cards ----------

// Só os cards do primeiro desenho usam .revelar (o observer do script.js já
// olhou a página). Os que nascem depois usam a animação "entrada".
function criarCardAnuncio(anuncio, aparecerAoClicar) {
  const card = document.createElement("li");
  card.className = aparecerAoClicar ? "anuncio anuncio-extra" : "anuncio revelar";

  // Durante a digitação os cards trocam a cada letra: sem animação, para não piscar
  if (digitando) {
    card.className = "anuncio";
  }
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

// Explica ao visitante por que o anúncio está em destaque
function criarMotivoDestaque(destaque) {
  const motivo = document.createElement("p");
  motivo.className = "anuncio-motivo";

  if (destaque.motivo === "patrocinado") {
    motivo.classList.add("anuncio-motivo-patrocinado");
    motivo.textContent = "Patrocinado: anúncio pago pelo prestador";
  } else {
    const nota = destaque.nota.toFixed(1).replace(".", ",");

    motivo.textContent = "★ " + nota + " · " + destaque.avaliacoes + " avaliações";
  }

  return motivo;
}

// Faixa de destaques: reaproveita o card normal e acrescenta o selo e a classe de destaque
function mostrarDestaques() {
  const destaques = anuncios.filter(function (anuncio) {
    return anuncio.destaque;
  });

  listaDestaques.replaceChildren(
    ...destaques.map(function (anuncio) {
      const card = criarCardAnuncio(anuncio, false);
      const selo = document.createElement("span");

      selo.className = "anuncio-selo";
      selo.textContent = "★ Destaque";
      card.classList.add("anuncio-destaque");
      card.prepend(selo, criarMotivoDestaque(anuncio.destaque));

      return card;
    })
  );
}

function mostrarAnuncios(lista) {
  const iniciais = lista.slice(0, LIMITE_INICIAL);
  anunciosRestantes = lista.slice(LIMITE_INICIAL);

  listaAnuncios.replaceChildren(
    ...iniciais.map(function (anuncio) {
      return criarCardAnuncio(anuncio, jaCarregada);
    })
  );

  vazioAnuncios.hidden = lista.length > 0;
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

// ---------- Filtros ----------

function lerFiltros() {
  const parametros = new URLSearchParams(window.location.search);

  return {
    categoria: parametros.get("categoria") || "",
    cidade: parametros.get("cidade") || "",
    servico: (parametros.get("servico") || "").trim()
  };
}

function filtrarAnuncios(lista, filtros) {
  const palavras = normalizar(filtros.servico)
    .split(/\s+/)
    .filter(function (palavra) {
      return palavra !== "" && !PALAVRAS_IGNORADAS.includes(palavra);
    });

  return lista.filter(function (anuncio) {
    if (filtros.categoria && anuncio.categoria !== filtros.categoria) {
      return false;
    }

    if (filtros.cidade && anuncio.cidade !== filtros.cidade) {
      return false;
    }

    const texto = normalizar(
      [
        anuncio.titulo,
        anuncio.prestador,
        anuncio.descricao,
        buscarNome(categorias, anuncio.categoria),
        buscarNome(cidades, anuncio.cidade)
      ].join(" ")
    );

    return palavras.every(function (palavra) {
      return texto.includes(palavra);
    });
  });
}

function montarResumo(filtros, quantidade) {
  let primeiraParte = "Nenhum anúncio encontrado";

  if (quantidade === 1) {
    primeiraParte = "1 anúncio encontrado";
  } else if (quantidade > 1) {
    primeiraParte = quantidade + " anúncios encontrados";
  }

  const partes = [primeiraParte];

  if (filtros.categoria) {
    partes.push("Categoria: " + buscarNome(categorias, filtros.categoria));
  }

  if (filtros.cidade) {
    partes.push("Cidade: " + buscarNome(cidades, filtros.cidade));
  }

  if (filtros.servico) {
    partes.push("Busca: " + filtros.servico.replace(/-/g, " "));
  }

  return partes.join(" · ");
}

// Deixa a barra de busca igual ao filtro aplicado
function preencherBusca(filtros) {
  const cidade = cidades.find(function (item) {
    return item.slug === filtros.cidade;
  });

  campoServico.value = filtros.servico.replace(/-/g, " ");
  campoCidade.value = cidade ? cidade.slug : "";
  textoCidade.textContent = cidade ? cidade.nome : "Sua cidade";
}

// Chips e categorias são links fixos: aqui eles passam a manter a cidade
// escolhida e a levar o usuário direto até os resultados (#anuncios)
function ajustarLinksDeFiltro(filtros) {
  const links = document.querySelectorAll('a[href^="contratante.html?"]');

  links.forEach(function (link) {
    const parametros = new URLSearchParams(link.search);

    if (filtros.cidade) {
      parametros.set("cidade", filtros.cidade);
    } else {
      parametros.delete("cidade");
    }

    link.search = parametros.toString();
    link.hash = "anuncios";
  });
}

// A solicitação leva o que a pessoa estava buscando, para o formulário já vir preenchido
function ajustarLinksDeSolicitacao(filtros) {
  const links = document.querySelectorAll("a[data-solicitar]");

  links.forEach(function (link) {
    const parametros = new URLSearchParams();

    if (filtros.categoria) {
      parametros.set("categoria", filtros.categoria);
    }

    if (filtros.cidade) {
      parametros.set("cidade", filtros.cidade);
    }

    if (filtros.servico) {
      parametros.set("servico", filtros.servico);
    }

    link.search = parametros.toString();
  });
}

// ---------- Aplicar filtros na própria página ----------

function montarUrl(filtros) {
  const parametros = new URLSearchParams();

  if (filtros.categoria) {
    parametros.set("categoria", filtros.categoria);
  }

  if (filtros.cidade) {
    parametros.set("cidade", filtros.cidade);
  }

  if (filtros.servico) {
    parametros.set("servico", filtros.servico);
  }

  const texto = parametros.toString();

  return window.location.pathname + (texto ? "?" + texto : "") + "#anuncios";
}

function aplicarFiltros(filtros, rolar) {
  const temFiltro = filtros.categoria !== "" || filtros.cidade !== "" || filtros.servico !== "";
  const resultados = filtrarAnuncios(anuncios, filtros);

  filtrosAtuais = filtros;
  tituloAnuncios.textContent = temFiltro ? "Resultados" : "Todos os anúncios";
  secaoDestaques.hidden = temFiltro;
  resumoAnuncios.textContent = temFiltro ? montarResumo(filtros, resultados.length) : "";
  resumoAnuncios.hidden = !temFiltro;
  limparAnuncios.hidden = !temFiltro;

  ajustarLinksDeFiltro(filtros);
  ajustarLinksDeSolicitacao(filtros);
  mostrarAnuncios(resultados);

  if (rolar) {
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    secaoAnuncios.scrollIntoView({ behavior: reduzirMovimento ? "auto" : "smooth" });
  }
}

// Troca o endereço sem recarregar. Se o navegador não deixar (ex.: abrindo o
// arquivo direto do disco), recarrega a página com o filtro na URL.
function buscarAgora(filtros) {
  try {
    history.pushState(null, "", montarUrl(filtros));
  } catch (erro) {
    window.location.assign(montarUrl(filtros));
    return;
  }

  aplicarFiltros(filtros, true);
}

formularioBusca.addEventListener("submit", function (event) {
  event.preventDefault();

  buscarAgora({
    categoria: "",
    cidade: campoCidade.value,
    servico: campoServico.value.trim()
  });
});

// Escolher uma cidade já aplica o filtro, mantendo categoria e texto
document.querySelectorAll(".cidade-lista button").forEach(function (botao) {
  botao.addEventListener("click", function () {
    buscarAgora({
      categoria: filtrosAtuais.categoria,
      cidade: botao.dataset.value,
      servico: campoServico.value.trim()
    });
  });
});

// Busca ao vivo: a lista acompanha o que é digitado, sem recarregar nem rolar a tela.
// replaceState atualiza o endereço sem criar um passo novo no histórico a cada letra.
campoServico.addEventListener("input", function () {
  const filtros = {
    categoria: "",
    cidade: campoCidade.value,
    servico: campoServico.value.trim()
  };

  history.replaceState(null, "", montarUrl(filtros));
  digitando = true;
  aplicarFiltros(filtros, false);
  digitando = false;
});

// Botões voltar e avançar do navegador
window.addEventListener("popstate", function () {
  const filtros = lerFiltros();

  preencherBusca(filtros);
  aplicarFiltros(filtros, false);
});

// ---------- Início ----------

let filtrosAtuais = lerFiltros();

mostrarDestaques();

if (filtrosAtuais.categoria || filtrosAtuais.cidade || filtrosAtuais.servico) {
  preencherBusca(filtrosAtuais);
}

aplicarFiltros(filtrosAtuais, false);
jaCarregada = true;

// A página recarrega no topo; leva o usuário até os resultados
if (filtrosAtuais.categoria || filtrosAtuais.cidade || filtrosAtuais.servico) {
  secaoAnuncios.scrollIntoView();
}
