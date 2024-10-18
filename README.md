# DtMoney

DtMoney é uma aplicação full-stack desenvolvida para gerenciar finanças pessoais de forma simples e eficiente. O front-end foi construído com **React**, utilizando **Styled Components** para estilização e **Axios** para consumo de API. O back-end foi desenvolvido em **.NET** com **Entity Framework** e banco de dados **SQL Server**.

---

## Tecnologias Utilizadas

### Front-end
- **React**: Biblioteca JavaScript para criação de interfaces de usuário.
- **Styled Components**: Utilizado para estilização baseada em componentes, permitindo a criação de temas dinâmicos e reutilizáveis.
- **Axios**: Utilizado para realizar requisições HTTP e integrar o front-end com a API.
- **Context API**: Para gerenciamento de estado global de forma eficiente e otimizada.
- **Boas práticas de acessibilidade**: Implementadas para garantir uma experiência inclusiva a todos os usuários.
- **Gerenciamento de performance**: Técnicas de otimização foram aplicadas para melhorar o desempenho geral da aplicação.

### Back-end
- **.NET**: Framework robusto para desenvolvimento de aplicações web.
- **Entity Framework (EF Core)**: Para manipulação e mapeamento de dados entre a aplicação e o banco de dados **SQL Server**.
- **SQL Server**: Banco de dados utilizado para armazenar as informações financeiras de forma segura.
- **DTO (Data Transfer Objects)**: Utilizados para transferir dados entre a camada de API e o front-end, mantendo a consistência e separação de responsabilidades.
- **Controllers**: Controladores criados para gerenciar as rotas da API e processar as requisições HTTP.

---

## Funcionalidades

### Front-end
- Interface responsiva para gerenciar entradas e saídas financeiras.
- Conexão com API para cadastrar, listar e deletar transações financeiras.
- Controle de estado global utilizando Context API.
- Boas práticas de acessibilidade aplicadas para garantir uma melhor experiência ao usuário.
- Gerenciamento de performance para evitar renderizações desnecessárias e garantir a fluidez da aplicação.

### Back-end
- **API RESTful**: Endpoints para gerenciar transações financeiras (CRUD).
- **DTOs**: Implementados para facilitar a comunicação entre o front-end e back-end.
- **Entities**: Entidades mapeadas no banco de dados através do Entity Framework.
- **Controllers**: Gerenciam as rotas e manipulam as requisições, garantindo a correta operação do sistema.
- **SQL Server**: Banco de dados utilizado para armazenar as informações de forma segura e eficiente.

---
### Como rodar o projeto
Pré-requisitos
- Node.js (para rodar o front-end)
- .NET SDK (para rodar o back-end)
- SQL Server (para o banco de dados)

# Instalação
### Front-end

Clone o repositório
`git clone https://github.com/Gustavo-Targino/DtMoney`

 Navegue até o diretório do front-end
`cd dtmoney/dt-money`

 Instale as dependências
`npm install`

Inicie o servidor de desenvolvimento
`npm start`

### Back-end

Clone o repositório (se ainda não fez)
`git clone https://github.com/Gustavo-Targino/DtMoney`

Navegue até o diretório do back-end
`cd dtmoney/api_dt_money`

Restaure as dependências do .NET
`dotnet restore`

Crie o banco de dados no SQL Server
`dotnet ef database update`

Inicie o servidor
`dotnet run`