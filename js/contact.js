(function () {
  var form = document.getElementById("form-contato");
  if (!form || !window.SITE) return;

  var nome = document.getElementById("nome");
  var telefone = document.getElementById("telefone");
  var assunto = document.getElementById("assunto");
  var mensagem = document.getElementById("mensagem");
  var autorizacao = document.getElementById("autorizacao");
  var empresa = document.getElementById("empresa");
  var resultado = document.getElementById("form-resultado");

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function maskPhone(value) {
    var d = digits(value).slice(0, 11);
    if (d.length <= 10) {
      return d
        .replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, function (_, a, b, c) {
          var out = "";
          if (a) out += "(" + a;
          if (a.length === 2) out += ") ";
          if (b) out += b;
          if (c) out += "-" + c;
          return out;
        });
    }
    return d.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, function (_, a, b, c) {
      var out = "";
      if (a) out += "(" + a;
      if (a.length === 2) out += ") ";
      if (b) out += b;
      if (c) out += "-" + c;
      return out;
    });
  }

  function showError(id, msg) {
    var el = document.getElementById(id);
    var field = el && el.previousElementSibling;
    if (!el) return;
    if (msg) {
      el.textContent = msg;
      el.hidden = false;
      if (field && field.setAttribute) {
        field.setAttribute("aria-describedby", id);
        field.setAttribute("aria-invalid", "true");
      }
    } else {
      el.textContent = "";
      el.hidden = true;
      if (field && field.removeAttribute) {
        field.removeAttribute("aria-describedby");
        field.removeAttribute("aria-invalid");
      }
    }
  }

  function validate() {
    var ok = true;
    var nomeVal = (nome.value || "").trim();
    var telVal = digits(telefone.value);
    var assuntoVal = assunto.value;
    var auth = autorizacao.checked;

    if (nomeVal.length < 2) {
      showError("erro-nome", "Informe seu nome.");
      ok = false;
    } else {
      showError("erro-nome", "");
    }

    if (telVal.length < 10 || telVal.length > 11) {
      showError("erro-telefone", "Informe um WhatsApp com DDD.");
      ok = false;
    } else {
      showError("erro-telefone", "");
    }

    if (!assuntoVal) {
      showError("erro-assunto", "Escolha um assunto.");
      ok = false;
    } else {
      showError("erro-assunto", "");
    }

    if (!auth) {
      showError("erro-autorizacao", "Marque a autorização.");
      ok = false;
    } else {
      showError("erro-autorizacao", "");
    }

    return ok;
  }

  function buildMessage() {
    var lines = [
      "Olá! Tudo bem?",
      "",
      "Gostaria de conversar com a Ozon Vitta.",
      "",
      "*Nome:* " + nome.value.trim(),
      "*WhatsApp:* " + telefone.value.trim(),
      "*Assunto:* " + assunto.value
    ];
    var extra = (mensagem.value || "").trim();
    if (extra) {
      lines.push("", "*Mensagem:*", extra);
    }
    lines.push("", "Aguardo o retorno. Obrigado(a)!");
    return lines.join("\n");
  }

  function waUrl(text) {
    var num = SITE.contato.whatsapp;
    if (!num) return "";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(text);
  }

  function showResult(html) {
    resultado.innerHTML = html;
    resultado.hidden = false;
  }

  telefone.addEventListener("input", function () {
    telefone.value = maskPhone(telefone.value);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (empresa && empresa.value) return;
    if (!validate()) return;

    var text = buildMessage();
    var url = waUrl(text);

    if (url) {
      var opened = window.open(url, "_blank");
      if (!opened) {
        showResult(
          'Se o WhatsApp não abriu, use este link: <a href="' +
            url +
            '" target="_blank" rel="noopener">Abrir WhatsApp</a>.'
        );
      } else {
        showResult("Abrindo o WhatsApp com sua mensagem.");
      }
    } else {
      showResult(
        "Mensagem pronta para copiar:<br><code>" +
          text.replace(/</g, "&lt;") +
          '</code><br><button type="button" class="btn btn-ghost" id="btn-copiar">Copiar</button>'
      );
      var btn = document.getElementById("btn-copiar");
      if (btn) {
        btn.addEventListener("click", function () {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              showResult("Mensagem copiada.");
            });
          }
        });
      }
    }
  });

  function prefillAssunto(value, msg) {
    if (value) {
      assunto.value = value;
      if (![].some.call(assunto.options, function (o) { return o.value === value; })) {
        var opt = document.createElement("option");
        opt.value = value;
        opt.textContent = value;
        assunto.appendChild(opt);
        assunto.value = value;
      }
    }
    if (msg) mensagem.value = msg;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    nome.focus();
  }

  document.addEventListener("click", function (e) {
    var card = e.target.closest("[data-prefill-assunto]");
    if (!card) return;
    e.preventDefault();
    prefillAssunto(
      card.getAttribute("data-prefill-assunto"),
      card.getAttribute("data-prefill-mensagem") || ""
    );
  });

  document.querySelectorAll("[data-wa-quick]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      var num = SITE.contato.whatsapp;
      if (!num) return;
      e.preventDefault();
      var url = waUrl(SITE.cta.rapido);
      window.open(url, "_blank");
    });
  });

  var params = new URLSearchParams(window.location.search);
  var assuntoParam = params.get("assunto");
  if (assuntoParam && window.location.hash === "#contato") {
    prefillAssunto(assuntoParam, "");
  }
})();
