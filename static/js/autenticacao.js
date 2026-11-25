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
}
