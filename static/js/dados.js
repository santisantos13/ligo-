// Dados de exemplo da LIGO!: nenhum prestador é real.
// Os "slug" precisam ser iguais aos usados nos links (?categoria=... e ?cidade=...).

const categorias = [
  { slug: "reparos-e-manutencao", nome: "Reparos e Manutenção" },
  { slug: "eletrica", nome: "Elétrica" },
  { slug: "hidraulica", nome: "Hidráulica" },
  { slug: "reformas", nome: "Reformas" },
  { slug: "limpeza", nome: "Limpeza" },
  { slug: "tecnologia", nome: "Tecnologia" },
  { slug: "desenvolvimento-web", nome: "Desenvolvimento Web" },
  { slug: "criacao-de-sites", nome: "Criação de Sites" },
  { slug: "e-commerce", nome: "E-commerce e Lojas Virtuais" },
  { slug: "ui-ux-design", nome: "UI/UX e Design Web" },
  { slug: "design-e-criacao", nome: "Design e Criação" },
  { slug: "seo-e-marketing-digital", nome: "SEO e Marketing Digital" },
  { slug: "suporte-e-manutencao-web", nome: "Suporte e Manutenção Web" },
];

const cidades = [
  { slug: "belo-horizonte", nome: "Belo Horizonte" },
  { slug: "contagem", nome: "Contagem" },
  { slug: "betim", nome: "Betim" },
];

const anuncios = [
  {
    id: 1,
    titulo: "Eletricista: instalação e reparos elétricos",
    prestador: "Eletro Mineiro",
    categoria: "eletrica",
    cidade: "contagem",
    descricao: "Troca de tomadas, disjuntores e chuveiros, além de revisão geral da instalação elétrica."
  },
  {
    id: 2,
    titulo: "Encanador: desentupimento e reparo de vazamentos",
    prestador: "Hidrofácil",
    categoria: "hidraulica",
    cidade: "belo-horizonte",
    descricao: "Atendimento para vazamentos, caixas d'água, torneiras e desentupimento de pias e ralos."
  },
  {
    id: 3,
    titulo: "Encanador para instalações e reformas hidráulicas",
    prestador: "Água Certa",
    categoria: "hidraulica",
    cidade: "betim",
    descricao: "Instalação de louças, registros e tubulações em casas e apartamentos."
  },
  {
    id: 4,
    titulo: "Diarista e limpeza residencial",
    prestador: "Casa em Ordem",
    categoria: "limpeza",
    cidade: "betim",
    descricao: "Limpeza completa de casas e apartamentos, com opção de diária ou limpeza pós-obra."
  },
  {
    id: 5,
    titulo: "Limpeza de escritórios e pequenos comércios",
    prestador: "Brilho Total",
    categoria: "limpeza",
    cidade: "contagem",
    descricao: "Limpeza semanal ou quinzenal para escritórios, consultórios e lojas."
  },
  {
    id: 6,
    titulo: "Reforma de banheiros e cozinhas",
    prestador: "Alvenaria Viva",
    categoria: "reformas",
    cidade: "belo-horizonte",
    descricao: "Troca de revestimentos, bancadas e instalações, com acompanhamento até a entrega."
  },
  {
    id: 7,
    titulo: "Pequenos reparos e montagem de móveis",
    prestador: "Faz-Tudo Prático",
    categoria: "reparos-e-manutencao",
    cidade: "contagem",
    descricao: "Pendurar prateleiras, ajustar portas, trocar fechaduras e montar móveis."
  },
  {
    id: 8,
    titulo: "Desenvolvedor web para sites e sistemas",
    prestador: "Código Mineiro",
    categoria: "desenvolvimento-web",
    cidade: "belo-horizonte",
    descricao: "Desenvolvimento de sites e sistemas web sob medida, do planejamento à publicação."
  },
  {
    id: 9,
    titulo: "Criação de site institucional",
    prestador: "Site Fácil Studio",
    categoria: "criacao-de-sites",
    cidade: "contagem",
    descricao: "Site simples e rápido para pequenos negócios, pronto para celular e computador."
  },
  {
    id: 10,
    titulo: "Loja virtual completa para vender online",
    prestador: "Vitrine Digital",
    categoria: "e-commerce",
    cidade: "belo-horizonte",
    descricao: "Configuração de loja virtual, cadastro de produtos e meios de pagamento."
  },
  {
    id: 11,
    titulo: "Design de interfaces e protótipos",
    prestador: "Pixel Prático",
    categoria: "ui-ux-design",
    cidade: "betim",
    descricao: "Telas de aplicativos e sites, com protótipo navegável antes do desenvolvimento."
  },
  {
    id: 12,
    titulo: "Identidade visual e logotipos",
    prestador: "Traço Criativo",
    categoria: "design-e-criacao",
    cidade: "belo-horizonte",
    descricao: "Criação de logotipo, paleta de cores e peças para redes sociais."
  },
  {
    id: 13,
    titulo: "SEO e gestão de redes sociais",
    prestador: "Alcance Digital",
    categoria: "seo-e-marketing-digital",
    cidade: "belo-horizonte",
    descricao: "Melhoria de posicionamento no Google e planejamento de conteúdo para redes sociais."
  },
  {
    id: 14,
    titulo: "Manutenção e suporte para sites",
    prestador: "Suporte Web Ágil",
    categoria: "suporte-e-manutencao-web",
    cidade: "contagem",
    descricao: "Correção de erros, atualizações e monitoramento de sites já publicados."
  },
  {
    id: 15,
    titulo: "Formatação, redes e suporte técnico",
    prestador: "TI Resolve",
    categoria: "tecnologia",
    cidade: "betim",
    descricao: "Formatação de computadores, configuração de redes Wi-Fi e suporte para pequenas empresas."
  },
];
