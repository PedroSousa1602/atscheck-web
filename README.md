# 💻 AtsCheck Web (Frontend React)

![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=flat-square)

Interface web desenvolvida em **React.js** com **Vite** para a plataforma **AtsCheck**. A aplicação oferece uma experiência interativa e intuitiva estilo SaaS, permitindo que os candidatos façam o upload do seu CV em formato PDF, insiram o anúncio da vaga e recebam um relatório analítico detalhado em tempo real.

---

## ✨ Principais Funcionalidades

* 📤 **Upload de Documentos PDF:** Interface drag-and-drop para submissão de currículos com validação de formato no client-side.
* 🔍 **Análise em Tempo Real:** Comunicação assíncrona com a API Spring Boot para processamento de feedback por IA.
* 📊 **Dashboard de Match Rate:** Exibição visual da pontuação de compatibilidade (0 a 100%) e métricas do candidato.
* 🔑 **Mapeamento de Gaps:** Apresentação categorizada de competências técnicas (*hard skills*) e *soft skills* ausentes.
* 💡 **Sugestões Práticas:** Painel de recomendações para reescrita quantificável de experiências profissionais.

---

## 🛠️ Tecnologias Utilizadas

* **React.js (Vite)** — Biblioteca principal de UI focada em performance e rapidez de build.
* **React Router DOM** — Gestão de rotas e navegação na aplicação.
* **CSS Modules** — Estilização modular e isolada para evitar conflitos globais.
* **Axios** — Cliente HTTP para consumo da API REST em Spring Boot.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js** (v18+) e **npm** instalados.
* A **AtsCheck-API (Spring Boot)** a correr na tua máquina local (porta `8080`).

### 1. Clonar o Repositório
```bash
git clone [https://github.com/PedroSousa1602/AtsCheck-Web.git](https://github.com/PedroSousa1602/AtsCheck-Web.git)
cd AtsCheck-Web
