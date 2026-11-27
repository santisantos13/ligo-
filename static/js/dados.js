// Dados de exemplo da LIGO!: nenhum profissional é real.
// "destaque" faz o anúncio aparecer também na faixa de destaques e explica o motivo:
//   { motivo: "nota", nota: 4.9, avaliacoes: 87 }  -> destaque por boa avaliação
//   { motivo: "patrocinado" }                       -> destaque pago pelo profissional
// Cada categoria pertence a um "grupo" (usado no formulário de solicitação).
// Os "slug" precisam ser iguais aos usados nos links (?categoria=... e ?cidade=...).

const grupos = [
  { slug: "casa", nome: "Casa e reparos" },
  { slug: "tecnologia", nome: "Tecnologia e criação" },
];

const categorias = [
  { slug: "reparos-e-manutencao", nome: "Reparos e Manutenção", grupo: "casa" },
  { slug: "eletrica", nome: "Elétrica", grupo: "casa" },
  { slug: "hidraulica", nome: "Hidráulica", grupo: "casa" },
  { slug: "reformas", nome: "Reformas", grupo: "casa" },
  { slug: "limpeza", nome: "Limpeza", grupo: "casa" },
  { slug: "tecnologia", nome: "Tecnologia", grupo: "tecnologia" },
  { slug: "desenvolvimento-web", nome: "Desenvolvimento Web", grupo: "tecnologia" },
  { slug: "criacao-de-sites", nome: "Criação de Sites", grupo: "tecnologia" },
  { slug: "e-commerce", nome: "E-commerce e Lojas Virtuais", grupo: "tecnologia" },
  { slug: "ui-ux-design", nome: "UI/UX e Design Web", grupo: "tecnologia" },
  { slug: "design-e-criacao", nome: "Design e Criação", grupo: "tecnologia" },
  { slug: "seo-e-marketing-digital", nome: "SEO e Marketing Digital", grupo: "tecnologia" },
  { slug: "suporte-e-manutencao-web", nome: "Suporte e Manutenção Web", grupo: "tecnologia" },
];

const cidades = [
  { slug: "belo-horizonte", nome: "Belo Horizonte" },
  { slug: "contagem", nome: "Contagem" },
  { slug: "betim", nome: "Betim" },
];

const anuncios = [
  {
    id: 1,
    destaque: { motivo: "nota", nota: 4.9, avaliacoes: 87 },
    titulo: "Eletricista: instalação e reparos elétricos",
    profissional: "Eletro Mineiro",
    categoria: "eletrica",
    cidade: "contagem",
    descricao: "Troca de tomadas, disjuntores e chuveiros, além de revisão geral da instalação elétrica."
  },
  {
    id: 2,
    titulo: "Encanador: desentupimento e reparo de vazamentos",
    profissional: "Hidrofácil",
    categoria: "hidraulica",
    cidade: "belo-horizonte",
    descricao: "Atendimento para vazamentos, caixas d'água, torneiras e desentupimento de pias e ralos."
  },
  {
    id: 3,
    titulo: "Encanador para instalações e reformas hidráulicas",
    profissional: "Água Certa",
    categoria: "hidraulica",
    cidade: "betim",
    descricao: "Instalação de louças, registros e tubulações em casas e apartamentos."
  },
  {
    id: 4,
    destaque: { motivo: "patrocinado" },
    titulo: "Diarista e limpeza residencial",
    profissional: "Casa em Ordem",
    categoria: "limpeza",
    cidade: "betim",
    descricao: "Limpeza completa de casas e apartamentos, com opção de diária ou limpeza pós-obra."
  },
  {
    id: 5,
    titulo: "Limpeza de escritórios e pequenos comércios",
    profissional: "Brilho Total",
    categoria: "limpeza",
    cidade: "contagem",
    descricao: "Limpeza semanal ou quinzenal para escritórios, consultórios e lojas."
  },
  {
    id: 6,
    titulo: "Reforma de banheiros e cozinhas",
    profissional: "Alvenaria Viva",
    categoria: "reformas",
    cidade: "belo-horizonte",
    descricao: "Troca de revestimentos, bancadas e instalações, com acompanhamento até a entrega."
  },
  {
    id: 7,
    titulo: "Pequenos reparos e montagem de móveis",
    profissional: "Faz-Tudo Prático",
    categoria: "reparos-e-manutencao",
    cidade: "contagem",
    descricao: "Pendurar prateleiras, ajustar portas, trocar fechaduras e montar móveis."
  },
  {
    id: 8,
    destaque: { motivo: "nota", nota: 5.0, avaliacoes: 34 },
    titulo: "Desenvolvedor web para sites e sistemas",
    profissional: "Código Mineiro",
    categoria: "desenvolvimento-web",
    cidade: "belo-horizonte",
    descricao: "Desenvolvimento de sites e sistemas web sob medida, do planejamento à publicação."
  },
  {
    id: 9,
    titulo: "Criação de site institucional",
    profissional: "Site Fácil Studio",
    categoria: "criacao-de-sites",
    cidade: "contagem",
    descricao: "Site simples e rápido para pequenos negócios, pronto para celular e computador."
  },
  {
    id: 10,
    titulo: "Loja virtual completa para vender online",
    profissional: "Vitrine Digital",
    categoria: "e-commerce",
    cidade: "belo-horizonte",
    descricao: "Configuração de loja virtual, cadastro de produtos e meios de pagamento."
  },
  {
    id: 11,
    titulo: "Design de interfaces e protótipos",
    profissional: "Pixel Prático",
    categoria: "ui-ux-design",
    cidade: "betim",
    descricao: "Telas de aplicativos e sites, com protótipo navegável antes do desenvolvimento."
  },
  {
    id: 12,
    titulo: "Identidade visual e logotipos",
    profissional: "Traço Criativo",
    categoria: "design-e-criacao",
    cidade: "belo-horizonte",
    descricao: "Criação de logotipo, paleta de cores e peças para redes sociais."
  },
  {
    id: 13,
    titulo: "SEO e gestão de redes sociais",
    profissional: "Alcance Digital",
    categoria: "seo-e-marketing-digital",
    cidade: "belo-horizonte",
    descricao: "Melhoria de posicionamento no Google e planejamento de conteúdo para redes sociais."
  },
  {
    id: 14,
    titulo: "Manutenção e suporte para sites",
    profissional: "Suporte Web Ágil",
    categoria: "suporte-e-manutencao-web",
    cidade: "contagem",
    descricao: "Correção de erros, atualizações e monitoramento de sites já publicados."
  },
  {
    id: 15,
    titulo: "Formatação, redes e suporte técnico",
    profissional: "TI Resolve",
    categoria: "tecnologia",
    cidade: "betim",
    descricao: "Formatação de computadores, configuração de redes Wi-Fi e suporte para pequenas empresas."
  },
];
