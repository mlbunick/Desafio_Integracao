# Desafio Técnico

## 📖 Sobre o Projeto

Esta aplicação em Node.js simula um processo de sincronização de dados de usuários (RH), consumindo uma API externa, processando as informações e persistindo os dados em banco local.

O fluxo da aplicação contempla:

1. Consumo da API externa (RandomUser)
2. Processamento e validação dos dados
3. Persistência em banco SQLite
4. Geração de relatório detalhado da execução

---

## Estrutura

src/
├── database/
│   └── connection.js
├── repositories/
│   └── userRepository.js
├── services/
│   ├── randomUserService.js
│   ├── userService.js
│   └── reportService.js
└── index.js

reports/
└── report_*.json

database.sqlite (criado ao executar)

Camadas:

- Service → Regras de negócio
- Repository → Acesso ao banco de dados
- Database → Configuração e conexão
- Reports → Armazenamento dos relatórios gerados

---

## Fluxo da Aplicação

1. A aplicação consome a API:
https://randomuser.me/api

2. Processa os dados:
- Filtra apenas usuários maiores de 18 anos
- Traz todas as informações
- Utiliza o campo email como chave única

3. Persistência:
- Se o usuário não existir → é inserido
- Se o usuário já existir → é atualizado
- Se for menor de idade → é ignorado

4. Geração de relatório contendo:
- Total de registros processados
- Quantidade de inseridos
- Quantidade de atualizados
- Quantidade de ignorados
- Erros encontrados (se houver)

---

## Banco de Dados

Banco utilizado: SQLite

Estrutura da tabela users:

- id
- external_id
- name
- email (UNIQUE)
- gender
- birth_date
- age
- street_number
- street_name
- city
- state
- country
- postcode
- latitude
- longitude
- timezone_offset
- timezone_description
- phone
- cell
- picture_large
- picture_medium
- picture_thumbnail

O campo email é definido como chave única conforme solicitado e para evitar duplicidade.

---

## Como Executar o Projeto

Pré-requisitos:

- Node.js 18+
- npm

Verificar versão:

node -v

Instalar dependências:

npm install

Executar aplicação:

node src/index.js

---

## Relatório

Ao final da execução, será gerado um arquivo JSON na pasta:

reports/

Exemplo:

report_20-02-2026_15-25-45.json

Exemplo de conteúdo:

{
    processado: 0,
    adicionado: 0,
    atualizado: 0,
    ignorado: 0,
    erros: []
}
