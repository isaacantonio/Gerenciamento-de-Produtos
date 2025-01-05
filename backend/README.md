
Tecnologias Utilizadas
Nest.js: Framework para construção de APIs RESTful.
Prisma: ORM para interagir com o banco de dados.
PostgreSQL: Banco de dados relacional para armazenar informações sobre os produtos.

1. Pré-requisitos
Antes de rodar a aplicação, é necessário ter o seguinte instalado:
Node.js
PostgreSQL
Prisma CLI: Será instalado automaticamente, mas o Prisma é necessário para gerar o cliente e rodar as migrações.


2. Instalando Dependências
Na raiz do projeto backend, execute o comando para instalar todas as dependências do backend:

npm install

3. Configurando o Banco de Dados
O arquivo .env contém a string de conexão com o banco de dados. O Prisma usará essas variáveis para conectar à instância do PostgreSQL.

3.1. Variaveis importantes
Na raiz do projeto, no .env e defina a variável DATABASE_URL com a string de conexão correta para o seu banco de dados PostgreSQL. A string de conexão segue o formato:

postgresql://<usuario>:<senha>@localhost:5432/gerenciamento_produtos
Substitua usuario e senha por seu usuario e senha do postgres

exemplo:
user:postgres
senha:senha123

Resultado:
DATABASE_URL="postgresql://postgres:senha123@localhost:5432/gerenciamento_produtos"

Observação: A database deve ser criada automaticamente.

4. Rodando as Migrações
Execute as migrações para criar a estrutura da tabela products no PostgreSQL:

npx prisma migrate dev --name init

Esse comando vai gerar a tabela de produtos no banco de dados de acordo com a definição no Prisma Schema.

5. Rodando o Backend
Execute o comando abaixo para iniciar o servidor:

npm run start:dev
Por padrão, a API estará rodando em http://localhost:3001.
