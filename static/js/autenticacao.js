// ---------- Funções reutilizáveis ----------

function mostrarMensagem(area, texto, tipo) {
  area.textContent = texto;
  area.classList.toggle("formulario-erro--sucesso", tipo === "sucesso");
  area.hidden = false;
}

function limparErros(formulario, area) {
  area.hidden = true;
  area.textContent = "";

  formulario.querySelectorAll("[aria-invalid]").forEach(function (campo) {
    campo.removeAttribute("aria-invalid");
  });
}

function marcarInvalido(campo, area, texto) {
  void campo.offsetWidth;
  campo.setAttribute("aria-invalid", "true");
  mostrarMensagem(area, texto, "erro");
  campo.focus();
}

function formatoEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------- Mostrar/ocultar senha ----------

document.querySelectorAll(".campo-senha-botao").forEach(function (botao) {
  const campo = document.getElementById(botao.getAttribute("aria-controls"));

  botao.addEventListener("click", function () {
    const estavaVisivel = campo.type === "text";

    campo.type = estavaVisivel ? "password" : "text";
    botao.classList.toggle("senha-visivel", !estavaVisivel);
    botao.setAttribute("aria-label", estavaVisivel ? "Mostrar senha" : "Ocultar senha");
    campo.focus();
  });
});

// ---------- Login ----------

const formularioLogin = document.querySelector("#formulario-login");

if (formularioLogin) {
  const campoEmail = formularioLogin.querySelector("#email");
  const campoSenha = formularioLogin.querySelector("#senha");
  const areaMensagem = formularioLogin.querySelector("#login-erro");

  formularioLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    limparErros(formularioLogin, areaMensagem);

    const email = campoEmail.value.trim();
    const emailValido = formatoEmailValido(email);

    if (!emailValido) {
      marcarInvalido(campoEmail, areaMensagem, "Digite um e-mail válido.");
      return;
    }

    if (campoSenha.value === "") {
      marcarInvalido(campoSenha, areaMensagem, "Digite sua senha.");
      return;
    }

    mostrarMensagem(
      areaMensagem,
      "Dados válidos! Login simulado: ainda não há servidor para autenticar.",
      "sucesso"
    );
  });

  formularioLogin.addEventListener("input", function () {
    limparErros(formularioLogin, areaMensagem);
  });
}

// ---------- Cadastro ----------

const formularioCadastro = document.querySelector("#formulario-cadastro");

if (formularioCadastro) {
  const campoNome = formularioCadastro.querySelector("#nome");
  const campoEmail = formularioCadastro.querySelector("#email");
  const campoSenha = formularioCadastro.querySelector("#senha");
  const campoConfirmar = formularioCadastro.querySelector("#confirmar-senha");
  const areaMensagem = formularioCadastro.querySelector("#cadastro-erro");

  formularioCadastro.addEventListener("submit", function (event) {
    event.preventDefault();
    limparErros(formularioCadastro, areaMensagem);

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const emailValido = formatoEmailValido(email);
    const senha = campoSenha.value;
    const confirmacao = campoConfirmar.value;

    if (nome === "") {
      marcarInvalido(campoNome, areaMensagem, "Digite seu nome completo.");
      return;
    }

    if (!emailValido) {
      marcarInvalido(campoEmail, areaMensagem, "Digite um e-mail válido.");
      return;
    }

    if (senha.length < 8) {
      marcarInvalido(campoSenha, areaMensagem, "A senha precisa ter no mínimo 8 caracteres.");
      return;
    }

    if (confirmacao !== senha) {
      marcarInvalido(campoConfirmar, areaMensagem, "As senhas não coincidem.");
      return;
    }

    mostrarMensagem(
      areaMensagem,
      "Dados válidos! Cadastro simulado: ainda não há servidor para criar contas.",
      "sucesso"
    );
  });

  formularioCadastro.addEventListener("input", function () {
    limparErros(formularioCadastro, areaMensagem);
  });

  const textoDescricao = document.querySelector("#cadastro-descricao");
  const itensBeneficios = document.querySelectorAll("#cadastro-beneficios li");
  const caixaContratante = formularioCadastro.querySelector('input[name="papeis"][value="contratante"]');
  const caixaProfissional = formularioCadastro.querySelector('input[name="papeis"][value="profissional"]');

  const textosPorPapel = {
    nenhum: {
      descricao: "Crie sua conta e tenha acesso a uma plataforma completa, segura e cheia de vantagens.",
      beneficios: [
        "Encontre profissionais qualificados",
        "Avalie e seja avaliado",
        "Construa sua reputação na plataforma"
      ]
    },
    contratante: {
      descricao: "Publique solicitações, receba propostas e contrate o profissional certo.",
      beneficios: [
        "Publique solicitações do que você precisa",
        "Compare propostas de profissionais",
        "Avalie quem realizou o serviço"
      ]
    },
    profissional: {
      descricao: "Divulgue seus serviços, encontre solicitações e envie propostas para conquistar clientes.",
      beneficios: [
        "Divulgue seus serviços",
        "Envie propostas para solicitações",
        "Construa sua reputação na plataforma"
      ]
    },
    ambos: {
      descricao: "Contrate profissionais e ofereça seus serviços, tudo com a mesma conta.",
      beneficios: [
        "Contrate profissionais qualificados",
        "Ofereça seus serviços",
        "Avalie e seja avaliado"
      ]
    }
  };

  function atualizarTextos() {
    let situacao = "nenhum";

    if (caixaContratante.checked && caixaProfissional.checked) {
      situacao = "ambos";
    } else if (caixaContratante.checked) {
      situacao = "contratante";
    } else if (caixaProfissional.checked) {
      situacao = "profissional";
    }

    const textos = textosPorPapel[situacao];
    textoDescricao.textContent = textos.descricao;

    itensBeneficios.forEach(function (item, indice) {
      item.textContent = textos.beneficios[indice];
    });
  }

  formularioCadastro.addEventListener("change", atualizarTextos);
  atualizarTextos();
}

// ---------- Recuperação de senha ----------

const formularioRecuperacao = document.querySelector("#formulario-recuperacao");

if (formularioRecuperacao) {
  const campoEmail = formularioRecuperacao.querySelector("#email");
  const areaMensagem = formularioRecuperacao.querySelector("#recuperacao-erro");

  formularioRecuperacao.addEventListener("submit", function (event) {
    event.preventDefault();
    limparErros(formularioRecuperacao, areaMensagem);

    const email = campoEmail.value.trim();
    const emailValido = formatoEmailValido(email);

    if (!emailValido) {
      marcarInvalido(campoEmail, areaMensagem, "Digite um e-mail válido.");
      return;
    }

    mostrarMensagem(
      areaMensagem,
      "Se houver uma conta com esse e-mail, enviaremos as instruções. (Simulação: ainda não há servidor.)",
      "sucesso"
    );
  });

  formularioRecuperacao.addEventListener("input", function () {
    limparErros(formularioRecuperacao, areaMensagem);
  });
}
