// Alternância de tema claro/escuro

// Alterna o tema salvo no botão 🌙/☀️
document.getElementById('theme-toggle').addEventListener('click', () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('preferred-theme', newTheme);
});
// Carrega o tema salvo ao iniciar a página


document.addEventListener("DOMContentLoaded", async () => {
  const savedTheme = localStorage.getItem('preferred-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  const username = "analuiza2102";
  const reposContainer = document.getElementById("repos-container");

  const selectedProjects = [
    "IdeiaPortfolio",
    "TaskFlow",
    "Painel-de-Agendamento",
    "ModuloVendas",
    "ComunicadorTCP-IP",
    "landingpageInsumoVet",
    "ConversorRubiniCoinsTIBIA",
    "DashboardPowerBIProjecaodeDespesasContasaPagar",
    "Gestao_de_Vendas_Bi"
  ];

  const projectInfo = {
    "IdeiaPortfolio": {
      title: "Portfólio Pessoal",
      description: "Projeto de portfólio com HTML, CSS e JavaScript.",
      image: "./components/img/Portfolio2025.png",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    "TaskFlow": {
      title: "TaskFlow - Gerenciador de Tarefas",
      description: "Sistema completo de gerenciamento de tarefas com autenticação e dashboard.",
      image: "./components/img/TaskFlow.png",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    "Painel-de-Agendamento": {
      title: "Painel de Agendamento",
      description: "Aplicação para agendamentos com salvamento em LocalStorage.",
      image: "./components/img/Painel-de-Agendamento.png",
      tags: ["HTML", "CSS","JavaScript","Bootstrap", "LocalStorage"]
    },
    "ModuloVendas": {
      title: "Módulo de Vendas",
      description: "Sistema de controle de vendas com Java e Swing.",
      image: "./components/img/ModuloVendas.png",
      tags: ["Java", "Swing", "JDBC"]
    },
    "ComunicadorTCP-IP": {
      title: "Comunicador TCP/IP",
      description: "Trabalho educacional utilizando sockets em Java.",
      image: "./components/img/ComunicadorTCP-IP.png",
      tags: ["Java", "Sockets", "Rede"]
    },
    "landingpageInsumoVet": {
      title: "Landing Page InsumoVet",
      description: "Página institucional da distribuidora InsumoVet com foco em conversão.",
      image: "./components/img/landingpageInsumoVet.png",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    "ConversorRubiniCoinsTIBIA": {
      title: "Conversor RubiniCoins - Tibia",
      description: "Conversor de moedas do OtServer RubiniOT baseado em Tibia.",
      image: "./components/img/ConversorRubiniCoinsTIBIA.png",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    "DashboardPowerBIProjecaodeDespesasContasaPagar": {
      title: "Dashboard Power BI - Despesas",
      description: "Dashboard interativo para análise de contas a pagar com DAX e SQL.",
      image: "./components/img/DashboardPowerBIProjecaodeDespesasContasaPagar.png",
      tags: ["Power BI", "SQL", "DAX"]
    },
    "Gestao_de_Vendas_Bi": {
      title: "Gestão de Vendas - BI",
      description: "Dashboard analítico de vendas com segmentações e indicadores.",
      image: "./components/img/Gestao_de_Vendas_Bi.jpg",
      tags: ["Power BI", "SQL", "DAX"]
    }
  };

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=200`);
    const repos = await response.json();
    console.log("Repositórios retornados pela API:", repos.map(r => r.name));

    selectedProjects.forEach((repoName) => {
      const repo = repos.find(r => r.name === repoName);
      if (!repo) {
        console.warn(`Repositório \"${repoName}\" não encontrado.`);
        return;
      }

      const info = projectInfo[repoName];

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img class="card-img-top" src="${info.image}" alt="${info.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title d-flex justify-content-between align-items-center">
            <span>${info.title}</span>
            <a href="${repo.html_url}" target="_blank" aria-label="Ver ${info.title}">↗️</a>
          </h5>
          <p class="card-text">${info.description}</p>
          <div class="mt-auto d-flex flex-wrap gap-1">
            ${info.tags.map(tag => `<span class="badge">${tag}</span>`).join("")}
          </div>
        </div>
      `;


      reposContainer.appendChild(card);
      console.log(`Renderizando card: ${info.title}`);
    });

  } catch (error) {
    console.error("Erro ao carregar os repositórios:", error);
    reposContainer.innerHTML = "<p class='text-danger'>Erro ao carregar projetos.</p>";
  }
});
