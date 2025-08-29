# PersonalizAgro - Landing Page MVP

Este projeto é um landing page desenvolvido em Next.js para validar a proposta de valor do serviço de mapeamento agrícola com drones customizados para pequenos e médios produtores do Norte Pioneiro do Paraná.

## Sobre o Projeto

O objetivo deste landing page é funcionar como um "MVP Fumaça" (Smoke Test) para:

1.  **Validar o interesse:** Capturar leads de produtores interessados em um projeto piloto.
2.  **Validar a dor:** Confirmar se a proposta de valor (drone customizado, maior autonomia) atende a uma necessidade real.
3.  **Testar a proposta de preço:** Obter feedback sobre o valor percebido do serviço.

## Tecnologias Utilizadas

- **Framework:** Next.js (React Framework)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Formulário:** Integração com Google Forms (ou similar) para coleta de dados.

## Estrutura de Pastas

```
personalizagro-landing/
├── README.md
├── package.json
├── next.config.js
├── public/                  (Arquivos estáticos como imagens)
│   └── images/
│       ├── logo-personalizagro.png
│       └── drone-hero.jpg
├── src/                     (Código fonte da aplicação)
│   ├── app/                 (Estrutura do App Router do Next.js)
│   │   ├── page.tsx         (Página principal)
│   │   ├── layout.tsx       (Layout principal)
│   │   └── globals.css      (Estilos globais)
│   ├── components/          (Componentes reutilizáveis da UI)
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── ValuePropositionSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   └── MainForm.tsx
│   ├── styles/              (Arquivos CSS adicionais, se necessário)
│   └── utils/               (Funções utilitárias)
└── .env.local               (Variáveis de ambiente)
```

## Como Iniciar

### Pré-requisitos

- Node.js instalado (versão 18 ou superior recomendada)
- npm ou yarn

### Instalação

1.  Clone este repositório:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd personalizagro-landing
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

### Configuração do `.env.local`

Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
# Exemplo para Google Forms
GOOGLE_FORMS_URL=https://docs.google.com/forms/d/e/SEU_ID_DO_FORMULARIO/viewform?embedded=true
```

_Substitua `SEU_ID_DO_FORMULARIO` pelo ID real do seu formulário Google._

### Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra seu navegador em `http://localhost:3000` para ver o landing page em funcionamento.

### Build para Produção

Para gerar a versão de produção:

```bash
npm run build
# ou
yarn build
```

Para iniciar o servidor de produção:

```bash
npm run start
# ou
yarn start
```

## Contribuições

Agradeço a colaboração. Para contribuir, por favor, siga os passos de instalação e envie um Pull Request.

## Autor

- **Ana Júlia Belchior** - `@retardelli` (ou seu GitHub/nome)
