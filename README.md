# Cypress

A Notion-like productivity app for cross-functional team collaboration or personal chores.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Benjaminnnnnn/cypress.git
```

Install dependencies

```bash
  npm install
```

Configure dev server credentials in `.env` file.
.env file example:

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

DATABASE_URL=
DATABASE_SERVICE_ROLE_KEY=
DATABASE_PW=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Start the server

```bash
  npm run dev
```

## Roadmap

- [ ] Refactor app state provider.
- [ ] Add AI capabilities.
