
# Software Requirements Specification (SRS)
## Multigroup Service

Este documento fornece uma especificação detalhada dos requisitos para o projeto Multigroup Service, que adota uma arquitetura de microsserviços utilizando tecnologias como Node.js, NestJS, TypeScript, gRPC e Prisma.

## Índice

1. [Introdução](#introdução)
2. [Descrição Geral](#descrição-geral)
3. [Funcionalidades do Sistema](#funcionalidades-do-sistema)
4. [Requisitos de Interface Externa](#requisitos-de-interface-externa)
5. [Outros Requisitos Não Funcionais](#outros-requisitos-não-funcionais)
6. [Atributos de Qualidade do Software](#atributos-de-qualidade-do-software)
7. [Outros Requisitos](#outros-requisitos)
8. [Apêndices](#apêndices)
9. [Iniciando o Projeto](#iniciando-o-projeto)
10. [Fazendo o Deploy](#fazendo-o-deploy)
11. [Documentação Adicional](#documentação-adicional)

## Introdução

### Propósito

Este documento fornece uma visão detalhada dos requisitos para a plataforma Multigroup Service, que é projetada para gerenciar serviços como Multipark e Multirent.

### Escopo

O Multigroup Service é destinado a empresas que necessitam gerenciar veículos e locações de forma eficiente.

### Definições, Acrônimos e Abreviações

- **gRPC**: Remote Procedure Call
- **Prisma**: ORM para Node.js e TypeScript
- **NestJS**: Framework para construção de aplicativos do lado do servidor
- **Node.js**: Ambiente de execução JavaScript

### Referências

- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Documentação do gRPC](https://grpc.io/docs/)

## Descrição Geral

### Perspectiva do Produto

O Multigroup Service atua como o núcleo da plataforma Multigroup, gerenciando usuários e facilitando a comunicação entre serviços por meio de gRPC. É desenvolvido usando NestJS e TypeScript, com Prisma como ORM.

### Funcionalidades do Produto

- Registro e gerenciamento de usuários
- Autenticação e autorização de usuários
- Comunicação eficiente entre serviços

### Classes e Características

O sistema é composto por várias classes importantes:
- **Proto Files**: Definem mensagens e serviços para gRPC.
- **Generated Proto Classes**: Contêm definições automáticas para comunicação gRPC.
- **Prisma Models**: Gerenciam operações de banco de dados e facilitam CRUD.

### Classes do Código

- **Controllers**: Lidam com requisições e respostas.
- **Services**: Implementam a lógica de negócios e interagem com repositórios.
- **Modules**: Agrupam controllers e services.
- **Interceptors**: Transformam dados de requisições e respostas.
- **Repositories**: Gerenciam operações de banco de dados com Prisma.
- **Results**: Representam os resultados processados pelos serviços.

### Ambiente Operacional

Este sistema funciona como backend para serviços como Multipark, lidando com autenticação e comunicação entre serviços. Não há interação direta com o usuário final.

### Restrições de Design e Implementação

O sistema deve estar em conformidade com regulamentos de proteção de dados (como GDPR), garantir segurança de dados e ser escalável para acomodar um número crescente de usuários. A implementação segue os princípios SOLID para manter um código sustentável.

### Documentação para Desenvolvedores

Inclui manuais de desenvolvimento.

### Assumptions and Dependencies

O sistema é acessado indiretamente através de serviços da plataforma Multigroup, como Multipark, e apenas esses "sub-serviços" têm acesso.

## Funcionalidades do Sistema

### Funcionalidades Gerais

- Gerenciamento de usuários

### Funcionalidades Específicas

- **Autenticação**: Gerenciamento de login, registro e validação de usuários.
- **Serviço de Usuários**: Gerenciamento de perfis de usuários, incluindo CRUD.
- **Serviço de Veículos**: Gerenciamento de informações de veículos.

## Requisitos de Interface Externa

### Interfaces de Comunicação

Utiliza gRPC para comunicação entre microsserviços e protocolos de email para notificações.

## Outros Requisitos Não Funcionais

### Requisitos de Desempenho

O sistema deve suportar 10.000 usuários concorrentes e ter tempo de resposta inferior a 2 segundos para ações do usuário.

### Requisitos de Segurança

Implementar autenticação e autorização robustas, além de criptografia de dados em trânsito e em repouso.

## Atributos de Qualidade do Software

- **Confiabilidade**: 99,9% de uptime.
- **Usabilidade**: Interface intuitiva e fácil de usar.
- **Escalabilidade**: Capacidade de escalar conforme a carga de usuários aumenta.

## Outros Requisitos

Atualizações regulares e ciclos contínuos de feedback e melhorias.

## Apêndices

- Glossário de termos.
- Diagramas detalhados de casos de uso.
- Diagramas de fluxo de dados.
- Documentação da API.

## Iniciando o Projeto

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositório>
   cd multigroup-service
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias conforme o arquivo `.env.example`.

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run start:dev
   ```

## Fazendo o Deploy

1. **Build do projeto**:
   ```bash
   npm run build
   ```

2. **Inicie o servidor em modo de produção**:
   ```bash
   npm run start:prod
   ```

## Documentação Adicional

A documentação adicional está na pasta `docs` dentro do projeto, incluindo detalhes sobre a arquitetura do sistema, endpoints da API e guias de integração.
