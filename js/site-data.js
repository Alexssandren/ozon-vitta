(function () {
  var SITE = {
    marca: {
      nome: "Ozon Vitta",
      linha: "Clínica Integrada Saúde e Estética",
      razao: ""
    },
    meta: {
      titulo: "Ozon Vitta | Clínica Integrada Saúde e Estética em Araranguá",
      descricao:
        "Ozon Vitta em Araranguá: saúde integrada e estética com plano personalizado. Agende pelo WhatsApp."
    },
    ancoras: [
      { href: "#servico", rotulo: "Cuidado" },
      { href: "#areas", rotulo: "Atendemos" },
      { href: "#resultados", rotulo: "Resultados" },
      { href: "#atendimento", rotulo: "Atendimento" },
      { href: "#contato", rotulo: "Contato" },
      { href: "#duvidas", rotulo: "Dúvidas" }
    ],
    cta: {
      conversar: "Agendar consulta",
      como: "Como funciona",
      whatsapp: "Falar no WhatsApp",
      enviar: "Enviar no WhatsApp",
      preparar: "Preparar mensagem",
      rapido: "Olá, quero agendar uma avaliação na Ozon Vitta."
    },
    hero: {
      local: "Araranguá, SC",
      titulo: "A transformação da sua saúde começa no cuidado",
      texto:
        "Plano personalizado com terapias integrativas, saúde celular e estética. Você é a prioridade."
    },
    servico: {
      titulo: "Cuidado integrado e personalizado",
      texto:
        "Um ambiente acolhedor com precisão científica, onde você e a sua individualidade vêm primeiro.",
      paragrafos: [
        "Na Ozon Vitta, unimos conforto e rigor clínico para atendimento de saúde e estética. O primeiro passo é um espaço focado em você e no seu bem-estar.",
        "Não usamos protocolos prontos. Cada plano é montado a partir das suas necessidades, de forma integrada e única.",
        "A equipe conta com a Dra. Laís Alves e a nutricionista Laura, em Nutrição Clínica e Funcional, para um cuidado completo do início ao fim da jornada."
      ]
    },
    areas: {
      titulo: "O que atendemos",
      texto: "Conheça nossos principais atendimentos.",
      itens: [
        {
          titulo: "Nutrição clínica e funcional",
          texto:
            "Com a nutricionista Laura: metabolismo, energia e relação leve com a comida, sem dietas restritivas."
        },
        {
          titulo: "Terapias injetáveis",
          texto:
            "Vitaminas, minerais e antioxidantes por via injetável ou intramuscular, após avaliação das suas carências."
        },
        {
          titulo: "Estética",
          texto:
            "Preenchimento labial, otomodelação e outros cuidados estéticos com naturalidade e critério clínico."
        },
        {
          titulo: "Outros",
          texto: "Se o tema for outro, escreva e a equipe responde."
        }
      ]
    },
    resultados: {
      titulo: "Resultados",
      texto: "Antes e depois de pacientes da clínica.",
      itens: [
        { src: "assets/resultados/resultado-1.webp", titulo: "Botox" },
        { src: "assets/resultados/resultado-2.webp", titulo: "Botox" },
        { src: "assets/resultados/resultado-3.webp", titulo: "Preenchimento labial" },
        { src: "assets/resultados/resultado-4.webp", titulo: "Tratamento para acne" }
      ]
    },
    atendimento: {
      titulo: "Como começar",
      texto: "Três passos para o seu plano de cuidado.",
      passos: [
        {
          titulo: "Avaliação",
          texto:
            "Avaliação das suas necessidades e do que o corpo precisa agora."
        },
        {
          titulo: "Plano único",
          texto:
            "Montamos um cuidado integrado e personalizado. Sem protocolo pronto."
        },
        {
          titulo: "Agendamento",
          texto: "Agende pelo WhatsApp e confirme seu horário com a equipe."
        }
      ]
    },
    duvidas: {
      titulo: "Dúvidas frequentes",
      itens: [
        {
          pergunta: "Onde fica a clínica?",
          resposta:
            "Av. Padre Antonio Luiz Dias, Vila São José, Araranguá - SC."
        },
        {
          pergunta: "Como agendar?",
          resposta:
            "Pelo formulário desta página ou pelo WhatsApp (48) 99991-5748."
        },
        {
          pergunta: "O protocolo é o mesmo para todos?",
          resposta:
            "Não. Cada paciente é único. O plano sai da avaliação das suas necessidades."
        },
        {
          pergunta: "O site publica preço?",
          resposta:
            "Não. Valores e indicações são definidos no atendimento com a equipe."
        }
      ]
    },
    contato: {
      titulo: "Contato",
      texto: "Envie seus dados para agendar pelo WhatsApp.",
      whatsapp: "5548999915748",
      telefoneExibicao: "(48) 99991-5748",
      endereco: "Av. Padre Antonio Luiz Dias, Vila São José, Araranguá - SC",
      instagram: "",
      horarios: ""
    }
  };

  window.SITE = SITE;

  function setText(sel, value) {
    var el = document.querySelector(sel);
    if (el && value) el.textContent = value;
  }

  function setMeta() {
    if (SITE.meta.titulo) document.title = SITE.meta.titulo;
    var desc = document.querySelector('meta[name="description"]');
    if (desc && SITE.meta.descricao) desc.setAttribute("content", SITE.meta.descricao);
    var ogTitle = document.querySelector('meta[property="og:titulo"], meta[property="og:title"]');
    if (ogTitle && SITE.meta.titulo) ogTitle.setAttribute("content", SITE.meta.titulo);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && SITE.meta.descricao) ogDesc.setAttribute("content", SITE.meta.descricao);
  }

  function renderAncoras(sel) {
    var host = document.querySelector(sel);
    if (!host) return;
    host.innerHTML = "";
    SITE.ancoras.forEach(function (a) {
      var link = document.createElement("a");
      link.href = a.href;
      link.textContent = a.rotulo;
      host.appendChild(link);
    });
  }

  function renderAreas() {
    var host = document.querySelector("[data-areas-lista]");
    if (!host) return;
    host.innerHTML = "";
    SITE.areas.itens.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card reveal";
      btn.setAttribute("data-prefill-assunto", item.titulo);
      btn.innerHTML =
        "<h3>" + item.titulo + "</h3><p>" + item.texto + "</p>";
      host.appendChild(btn);
    });
  }

  function renderResultados() {
    var host = document.querySelector("[data-resultados-lista]");
    if (!host || !SITE.resultados) return;
    host.innerHTML = "";
    SITE.resultados.itens.forEach(function (item) {
      var figure = document.createElement("figure");
      figure.className = "resultado reveal";
      figure.innerHTML =
        '<img src="' +
        item.src +
        '" alt="' +
        (item.titulo || "Resultado") +
        '" width="400" height="700" loading="lazy" decoding="async">' +
        (item.titulo ? "<figcaption>" + item.titulo + "</figcaption>" : "");
      host.appendChild(figure);
    });
  }

  function renderPassos() {
    var host = document.querySelector("[data-atendimento-passos]");
    if (!host) return;
    host.innerHTML = "";
    SITE.atendimento.passos.forEach(function (passo, i) {
      var li = document.createElement("li");
      li.className = "step reveal";
      li.innerHTML =
        "<span class=\"step-num\">" +
        (i + 1) +
        "</span><h3>" +
        passo.titulo +
        "</h3><p>" +
        passo.texto +
        "</p>";
      host.appendChild(li);
    });
  }

  function renderDuvidas() {
    var host = document.querySelector("[data-duvidas-lista]");
    if (!host) return;
    host.innerHTML = "";
    SITE.duvidas.itens.forEach(function (item) {
      var details = document.createElement("details");
      details.className = "faq-item reveal";
      details.innerHTML =
        "<summary>" +
        item.pergunta +
        "</summary><p>" +
        item.resposta +
        "</p>";
      host.appendChild(details);
    });
  }

  function fillAssuntos() {
    var select = document.getElementById("assunto");
    if (!select) return;
    SITE.areas.itens.forEach(function (item) {
      var opt = document.createElement("option");
      opt.value = item.titulo;
      opt.textContent = item.titulo;
      select.appendChild(opt);
    });
  }

  function fillStatic() {
    setText("[data-marca-nome]", SITE.marca.nome);
    setText("[data-marca-linha]", SITE.marca.linha);
    setText("[data-marca-rodape]", SITE.marca.nome);
    setText("[data-hero-local]", SITE.hero.local);
    setText("[data-hero-titulo]", SITE.hero.titulo);
    setText("[data-hero-texto]", SITE.hero.texto);
    setText("[data-servico-titulo]", SITE.servico.titulo);
    setText("[data-servico-texto]", SITE.servico.texto);
    var corpo = document.querySelector("[data-servico-corpo]");
    if (corpo && SITE.servico.paragrafos) {
      corpo.innerHTML = SITE.servico.paragrafos
        .map(function (p) {
          return "<p>" + p + "</p>";
        })
        .join("");
    }
    setText("[data-areas-titulo]", SITE.areas.titulo);
    setText("[data-areas-texto]", SITE.areas.texto);
    setText("[data-resultados-titulo]", SITE.resultados.titulo);
    setText("[data-resultados-texto]", SITE.resultados.texto);
    setText("[data-atendimento-titulo]", SITE.atendimento.titulo);
    setText("[data-atendimento-texto]", SITE.atendimento.texto);
    setText("[data-contato-titulo]", SITE.contato.titulo);
    setText("[data-contato-texto]", SITE.contato.texto);
    setText("[data-duvidas-titulo]", SITE.duvidas.titulo);
    setText("[data-cta-conversar]", SITE.cta.conversar);
    setText("[data-cta-como]", SITE.cta.como);

    var tel = SITE.contato.telefoneExibicao || "";
    setText("[data-contato-telefone]", tel ? "WhatsApp: " + tel : "");
    setText("[data-rodape-telefone]", tel);

    var end = SITE.contato.endereco || "";
    setText("[data-contato-endereco]", end);
    setText("[data-rodape-endereco]", end);

    var enviar = document.querySelector("[data-cta-enviar]");
    if (enviar) {
      enviar.textContent = SITE.contato.whatsapp
        ? SITE.cta.enviar
        : SITE.cta.preparar;
    }

    document.querySelectorAll("[data-wa-quick]").forEach(function (el) {
      if (!SITE.contato.whatsapp) {
        el.hidden = true;
        return;
      }
      // .wa-float visibility is owned by nav.js
      if (!el.classList.contains("wa-float")) {
        el.hidden = false;
      }
      if (el.classList.contains("header-wa")) {
        el.textContent = SITE.cta.whatsapp;
      }
    });
  }

  function boot() {
    setMeta();
    renderAncoras("[data-ancoras]");
    renderAncoras("[data-ancoras-rodape]");
    renderAreas();
    renderResultados();
    renderPassos();
    renderDuvidas();
    fillAssuntos();
    fillStatic();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
