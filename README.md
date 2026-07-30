# Brasil em Números

Uma aplicação **Full Stack** desenvolvida para transformar dados públicos do **IBGE** em informações visuais, organizadas e fáceis de interpretar. O projeto disponibiliza um dashboard moderno e responsivo, permitindo que qualquer pessoa consulte indicadores estatísticos do Brasil por meio de gráficos, métricas e filtros inteligentes.

---

## Sobre o projeto

O **Brasil em Números** foi desenvolvido com o objetivo de facilitar a visualização e a interpretação de dados estatísticos brasileiros. Em vez de acessar tabelas extensas ou informações dispersas, o usuário encontra um painel único com indicadores organizados de forma clara.

A aplicação consome dados da API oficial do IBGE, processa essas informações no backend e as apresenta em uma interface intuitiva, moderna e totalmente responsiva.

O projeto foi construído seguindo uma arquitetura Full Stack, separando frontend, backend e banco de dados, garantindo organização, escalabilidade e facilidade de manutenção.

---

# Funcionalidades

✔ Consulta de indicadores oficiais do IBGE.

✔ Dashboard moderno e intuitivo.

✔ Filtros por indicador estatístico.

✔ Filtros por região do Brasil.

✔ Atualização dinâmica das informações.

✔ Área dedicada para gráficos interativos.

✔ Integração entre frontend e backend.

✔ Consumo de API REST.

✔ Documentação da API utilizando Swagger.

---

# Tecnologias Utilizadas

## Frontend

| Tecnologia | Finalidade |
|------------|------------|
| React | Construção da interface |
| TypeScript | Tipagem da aplicação |
| Vite | Ambiente de desenvolvimento |
| Tailwind CSS | Estilização |
| Lucide React | Biblioteca de ícones |

---

## Backend 

| Tecnologia | Finalidade |
|------------|------------|
| Node.js | Ambiente de execução |
| Express | API REST |
| Swagger | Documentação da API |
| Supabase | Armazenamento e gerenciamento dos dados da aplicação |

---

## Dados

| Tecnologia | Finalidade |
|------------|------------|
| Python | Processamento dos dados |
| Pandas | Limpeza e análise dos dados |
| Plotly | Geração dos gráficos |
| FastApi | API para fornecer os dados |

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| Git | Versionamento |
| GitHub | Hospedagem do código |
| Postman | Testes da API |

---

# Arquitetura do Projeto

```text
IBGE-ANALYTICS
│
├── backend
│   ├── src
│   │   ├── interfaces
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── server.ts
│   │   └── swagger.ts
│   │
│   └── package.json
│
├── dados
│   ├── amostra_densidade.json
│   ├── amostra_grafico.json
│   ├── amostra_populacao.json
│   ├── cleaning.py
│   ├── ingestion.py
│   ├── main.py
│   ├── requirements.txt
│   ├── sample_chart.py
│   └── visualization.py
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── dashboard
│   │   ├── lib
│   │   ├── pages
│   │   ├── styles
│   │   │── types
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── eslint.config.ts
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── tsconfig.json
│   
└────────── 
```

---

# Componentes da Interface

O dashboard foi dividido em componentes reutilizáveis para facilitar a manutenção do projeto.

| Componente | Responsabilidade |
|------------|------------------|
| Dashboard  | Responsavel por renderizar os outros componentes e o gráfico |
| DashboardHeader | Cabeçalho da aplicação |
| DashboardHero | Área principal com filtros |
| DashboardStatistics | Cards com indicadores |

---

# Responsividade


# Responsividade

A interface foi projetada para diferentes tamanhos de tela.

| Dispositivo | Compatibilidade |
|-------------|-----------------|
| Desktop | ✔ |
| Notebook | ✔ |
| Tablet | ✔ |
| Smartphone | ✔ |

---

# Como executar o projeto

## Clonando o repositório

```bash
git clone git@github.com:codevdu/IBGE-Analytics.git
```

```bash
cd IBGE-ANALYTICS
```

---

## Backend

```bash
cd backend
```

Instale as dependências.

```bash
npm install
```

Configure o arquivo `.env`.

```env
DATABASE_URL="..."
```

Inicie o servidor.

```bash
npm run dev
```

---

## Frontend

Abra um novo terminal.

```bash
cd frontend
```

Instale as dependências.

```bash
npm install
```

Execute a aplicação.

```bash
npm run dev
```

---

# Documentação da API

Após iniciar o backend, a documentação poderá ser acessada pelo Swagger.

```text
http://localhost:3333/api-docs
```

---

# Objetivos do Projeto

Este projeto foi desenvolvido para:

✔ Demonstrar conhecimentos em desenvolvimento Full Stack.

✔ Consumir APIs públicas.

✔ Trabalhar com integração entre frontend e backend.

✔ Utilizar banco de dados relacional.

✔ Organizar aplicações utilizando arquitetura em camadas.

✔ Construir interfaces modernas e responsivas.

✔ Aplicar boas práticas de desenvolvimento.

✔ Desenvolver componentes reutilizáveis.

✔ Utilizar TypeScript em toda a aplicação.

---

# Colaboradores

Anaelica Barbosa, Eduardo Teixeira, Malu Fernandes, Clarisse Maria, Alice, Levi Oliveira, Lianderson Ribeiro, Luiz Arthur, Sara Magalhães, Mateus. 

---

# Licença

Este projeto possui finalidade acadêmica e de estudo, utilizando dados disponibilizados publicamente pelo IBGE.

# Link do projeto na Web 

```text
https://github.com/codevdu/IBGE-Analytics.git
```
