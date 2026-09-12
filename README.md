# 🚀 AtsCheck - Otimizador de CVs e Analisador de Vagas com IA

O **AtsCheck** é uma plataforma desenvolvida para ajudar candidatos a otimizarem os seus currículos para sistemas de triagem automática (ATS). Através de Inteligência Artificial, a aplicação analisa a estrutura do PDF, identifica lacunas de palavras-chave e faz a comparação direta entre o perfil do candidato e os requisitos de uma vaga de emprego.

---

## ✨ Principais Funcionalidades

* **Análise Estrutural de ATS:** Avaliação da formatação, seções ausentes e legibilidade do documento PDF.
* **Match com Anúncios de Emprego:** Análise cruzada do conteúdo do CV contra a descrição e exigências de uma vaga específica.
* **Pontuação de Compatibilidade:** Score de 0 a 100 gerado dinamicamente com base nas boas práticas de recrutamento.
* **Extração de Palavras-Chave Faltantes:** Mapeamento categorizado de competências técnicas, ferramentas e *soft skills* ausentes.
* **Sugestões Práticas de Métricas:** Recomendações diretas de reescrita quantificável (foco em impacto percentual e resultados).

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Java 21 / Spring Boot 3**
* **Spring AI** (Integração com a API da Groq)
* **Modelo LLM:** `openai/gpt-oss-120b` (Geração estrita de JSON)
* **Apache Tika / PDFBox** (Extração e parsing de texto de ficheiros PDF)

### Frontend
* **React.js** (Vite)
* **React Router DOM** (Navegação multi-página)
* **CSS3 Modules** (UI consistente e isolada no padrão SaaS)
* **Axios** (Integração REST API)

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* **Java 21+** e **Node.js v18+** instalados.
* Chave de API da **Groq** (`GROQ_API_KEY`).

### 1. Backend (Spring Boot)

Clona o repositório e acede à pasta do backend:
```bash
git clone [https://github.com/teu-usuario/AtsCheck.git](https://github.com/teu-usuario/AtsCheck.git)
cd AtsCheck/AtsCheck-Backend
