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
  campo.setAttribute("aria-invalid", "true");
  mostrarMensagem(area, texto, "erro");
  campo.focus();
}

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
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
}
