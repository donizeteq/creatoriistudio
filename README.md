# Creatorii Studio — Landing "Em Construção"

Landing page institucional da Creatorii Studio com efeitos modernos (partículas, cursor, ripple, parallax), countdown, captura de e-mail, integração com WhatsApp e exportação para múltiplos alvos de deploy (Lovable, Hostoo Node.js, WordPress/Elementor, HTML estático).

---

## 🧰 Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v3** + shadcn/ui
- **Fonte global:** Poppins (300–800)
- **Paleta:** Coral `#E05A3A` + Lilás `#9B87B2` (tema escuro)
- **Backend opcional:** Node.js + Express + PostgreSQL (pacote Hostoo)

---

## 🚀 Rodar localmente

Requer Node.js 18+ e npm (ou bun).

```bash
npm install
npm run dev
```

Acesse `http://localhost:8080`.

Build de produção:

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura

```
src/
├── pages/            # Index, Dashboard, NotFound
├── components/       # Particle, Cursor, Ripple, Countdown, etc.
├── assets/           # Logo, ícones
└── index.css         # Design tokens (HSL) + tema dark

public/export/
├── creatorii-landing.html      # HTML estático standalone
├── creatorii-complete.html     # Versão completa com tudo embutido
├── hostoo/                     # Pacote estático para Hostoo
│   ├── index.html
│   ├── DOWNLOAD.html           # Hub de download dos assets
│   └── README.txt
├── hostoo-node/                # Pacote Node.js + Analytics
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── DOWNLOAD.html
│   ├── README.md
│   └── public/ (index, dashboard, assets)
└── README-ELEMENTOR.md         # Guia de integração WordPress
```

---

## 🟢 Pacote Hostoo Node.js — automático via GitHub Actions

O projeto é distribuído como uma aplicação **Node.js + Express + PostgreSQL** pronta para deploy na Hostoo. Os arquivos-fonte vivem em `public/export/hostoo-node/` e o usuário final pode baixá-los de três formas:

### 1. Hub de download no navegador

Abra [`/export/hostoo-node/DOWNLOAD.html`](public/export/hostoo-node/DOWNLOAD.html) no site publicado:

- Baixar arquivos individualmente
- **Baixar tudo como ZIP** — monta o pacote no cliente via JSZip + FileSaver
- **Baixar última release oficial** — pega o ZIP buildado pelo GitHub Actions

### 2. GitHub Releases (rolling)

A cada push em `main`, o workflow [`.github/workflows/build-hostoo-package.yml`](.github/workflows/build-hostoo-package.yml) gera e publica:

- ZIP versionado: `creatorii-hostoo-<sha>.zip`
- Alias estável: `creatorii-hostoo-latest.zip`
- Tag/release: `hostoo-latest` → [download direto](https://github.com/donizeteq/creatoriistudio/releases/tag/hostoo-latest)

### 3. Deploy automático na Hostoo (SFTP/FTP)

Se os secrets estiverem configurados no GitHub (Settings → Secrets and variables → Actions), o mesmo workflow publica o pacote direto no servidor. O `.env` do servidor é **preservado** (`--exclude=.env`), então a conexão com o banco de dados não é afetada.

| Secret | Descrição |
|---|---|
| `HOSTOO_HOST` | Host SSH/FTP (ex: `seusite.hostoo.io`) |
| `HOSTOO_USER` | Usuário |
| `HOSTOO_SSH_KEY` | Chave privada SSH (preferencial) |
| `HOSTOO_PORT` | Opcional — 22 (SFTP) ou 21 (FTP) |
| `HOSTOO_REMOTE_PATH` | Caminho remoto, ex: `/home/usuario/hostoo-node/` |
| `HOSTOO_FTP_PASSWORD` | Fallback se não houver SSH key |
| `HOSTOO_FTP_PROTOCOL` | Opcional — `ftps` (padrão) ou `ftp` |
| `HOSTOO_PACKAGES_PATH` | Opcional — pasta para armazenar o `.zip` |

Após o sync, no servidor:

```bash
cd ~/hostoo-node
npm ci --production
pm2 restart creatorii --update-env
```

Instruções completas: [`public/export/hostoo-node/README.md`](public/export/hostoo-node/README.md)

---

## 🎨 Design System

Tudo definido em `src/index.css` e `tailwind.config.ts` — **nunca use cores hardcoded** em componentes, sempre tokens semânticos (`bg-background`, `text-foreground`, `text-primary`, etc.).

---

## 📞 Contato

- Instagram: [@creatoriistudio](https://instagram.com/creatoriistudio)
- Behance: [natashaqueiroz](https://behance.net/natashaqueiroz)
- WhatsApp: +55 11 95856-6518

---

© Creatorii Studio
