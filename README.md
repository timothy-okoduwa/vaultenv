<div align="center">

<!-- HERO SVG ILLUSTRATION -->
<svg width="720" height="200" viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="720" height="200" fill="#070707" rx="12"/>

  <!-- Grid lines (subtle) -->
  <line x1="0" y1="40" x2="720" y2="40" stroke="#111" stroke-width="1"/>
  <line x1="0" y1="80" x2="720" y2="80" stroke="#111" stroke-width="1"/>
  <line x1="0" y1="120" x2="720" y2="120" stroke="#111" stroke-width="1"/>
  <line x1="0" y1="160" x2="720" y2="160" stroke="#111" stroke-width="1"/>
  <line x1="120" y1="0" x2="120" y2="200" stroke="#111" stroke-width="1"/>
  <line x1="240" y1="0" x2="240" y2="200" stroke="#111" stroke-width="1"/>
  <line x1="360" y1="0" x2="360" y2="200" stroke="#111" stroke-width="1"/>
  <line x1="480" y1="0" x2="480" y2="200" stroke="#111" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="200" stroke="#111" stroke-width="1"/>

  <!-- Lock icon (left) -->
  <g transform="translate(54, 64)">
    <rect x="0" y="28" width="56" height="44" rx="4" fill="none" stroke="#22c55e" stroke-width="2.5"/>
    <path d="M11 28V18a17 17 0 0 1 34 0v10" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="28" cy="50" r="5" fill="#22c55e"/>
    <line x1="28" y1="55" x2="28" y2="62" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <!-- Arrow right -->
  <g transform="translate(150, 96)">
    <line x1="0" y1="0" x2="50" y2="0" stroke="#1e293b" stroke-width="2"/>
    <polyline points="42,-7 50,0 42,7" fill="none" stroke="#1e293b" stroke-width="2"/>
  </g>

  <!-- Terminal box (center) -->
  <g transform="translate(220, 44)">
    <rect width="280" height="112" rx="6" fill="#0d0d0d" stroke="#1e293b" stroke-width="1.5"/>
    <rect width="280" height="28" rx="6" fill="#141414"/>
    <rect y="22" width="280" height="6" fill="#141414"/>
    <circle cx="18" cy="14" r="5" fill="#ef4444" opacity="0.7"/>
    <circle cx="36" cy="14" r="5" fill="#f59e0b" opacity="0.7"/>
    <circle cx="54" cy="14" r="5" fill="#22c55e" opacity="0.7"/>
    <text x="14" y="56" font-family="monospace" font-size="11" fill="#e2e8f0">$ vaultenv backup</text>
    <text x="14" y="74" font-family="monospace" font-size="11" fill="#64748b">  Found 8 projects</text>
    <text x="14" y="92" font-family="monospace" font-size="11" fill="#22c55e">  ✓ Encrypted · AES-256-GCM</text>
    <text x="14" y="110" font-family="monospace" font-size="11" fill="#22c55e">  ✓ Backup complete</text>
  </g>

  <!-- Arrow right -->
  <g transform="translate(518, 96)">
    <line x1="0" y1="0" x2="50" y2="0" stroke="#1e293b" stroke-width="2"/>
    <polyline points="42,-7 50,0 42,7" fill="none" stroke="#1e293b" stroke-width="2"/>
  </g>

  <!-- Cloud / server icon (right) -->
  <g transform="translate(590, 62)">
    <rect x="0" y="16" width="76" height="52" rx="4" fill="none" stroke="#1e293b" stroke-width="2"/>
    <line x1="0" y1="30" x2="76" y2="30" stroke="#1e293b" stroke-width="1.5"/>
    <circle cx="10" cy="23" r="3" fill="#22c55e" opacity="0.6"/>
    <circle cx="22" cy="23" r="3" fill="#1e293b"/>
    <circle cx="34" cy="23" r="3" fill="#1e293b"/>
    <text x="8" y="46" font-family="monospace" font-size="9" fill="#334155">encrypted</text>
    <text x="8" y="58" font-family="monospace" font-size="9" fill="#334155">blob only</text>
    <line x1="14" y1="62" x2="62" y2="62" stroke="#1e293b" stroke-width="1" stroke-dasharray="3 2"/>
  </g>

  <!-- Title text -->
  <text x="360" y="178" font-family="monospace" font-size="13" fill="#1e293b" text-anchor="middle" letter-spacing="4">
    ENCRYPT LOCALLY · STORE SAFELY · RESTORE ANYWHERE
  </text>
</svg>

<br/>

# vaultenv

**Backup and restore `.env` files across machines with end-to-end encryption.**

No accounts. No passwords. Just a 12-word recovery phrase.

<br/>

[![npm version](https://img.shields.io/npm/v/vaultenv-cli?color=22c55e&labelColor=0a0a0a&style=flat-square)](https://www.npmjs.com/package/vaultenv-cli)
[![npm downloads](https://img.shields.io/npm/dm/vaultenv-cli?color=22c55e&labelColor=0a0a0a&style=flat-square)](https://www.npmjs.com/package/vaultenv-cli)
[![license](https://img.shields.io/badge/license-MIT-22c55e?labelColor=0a0a0a&style=flat-square)](./LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D18-22c55e?labelColor=0a0a0a&style=flat-square)](https://nodejs.org)

</div>

<br/>

---

## The problem

You've been there. New laptop. Three hours into setup. You've cloned all your projects but nothing runs because every `.env` file is sitting on your old machine — or worse, only ever existed there.

**vaultenv** is a CLI tool that backs up all your `.env` files in one command, encrypts them on your machine before they leave, and restores them automatically on any new machine.

---

## Quick start

```bash
npm install -g vaultenv-cli
```

```bash
# 1. Initialize — generates your recovery phrase
vaultenv init

# 2. Back up — from anywhere in your projects folder
cd ~/projects && vaultenv backup

# 3. Restore — on any new machine
vaultenv restore
```

---

## How it works

<!-- HOW IT WORKS DIAGRAM -->
<div align="center">
<svg width="680" height="280" viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="280" fill="#070707" rx="10"/>

  <!-- Step boxes -->
  <!-- Step 01 -->
  <rect x="20" y="30" width="190" height="220" rx="6" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="1.5"/>
  <text x="36" y="60" font-family="monospace" font-size="10" fill="#1e293b" letter-spacing="2">STEP 01</text>
  <text x="36" y="84" font-family="monospace" font-size="14" fill="#22c55e" font-weight="500">vaultenv init</text>
  <line x1="36" y1="96" x2="194" y2="96" stroke="#1a1a1a" stroke-width="1"/>
  <text x="36" y="118" font-family="monospace" font-size="10" fill="#334155">$ vaultenv init</text>
  <text x="36" y="136" font-family="monospace" font-size="10" fill="#1e293b">  Generating phrase</text>
  <text x="36" y="152" font-family="monospace" font-size="10" fill="#92400e">  cliff net equip</text>
  <text x="36" y="168" font-family="monospace" font-size="10" fill="#92400e">  resource upgrade</text>
  <text x="36" y="184" font-family="monospace" font-size="10" fill="#92400e">  tent ordinary...</text>
  <text x="36" y="208" font-family="monospace" font-size="10" fill="#22c55e">  ✓ Vault created</text>

  <!-- Arrow 1→2 -->
  <line x1="215" y1="140" x2="245" y2="140" stroke="#1e293b" stroke-width="1.5"/>
  <polyline points="238,133 245,140 238,147" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Step 02 -->
  <rect x="250" y="30" width="180" height="220" rx="6" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="1.5"/>
  <text x="266" y="60" font-family="monospace" font-size="10" fill="#1e293b" letter-spacing="2">STEP 02</text>
  <text x="266" y="84" font-family="monospace" font-size="14" fill="#22c55e" font-weight="500">vaultenv backup</text>
  <line x1="266" y1="96" x2="414" y2="96" stroke="#1a1a1a" stroke-width="1"/>
  <text x="266" y="118" font-family="monospace" font-size="10" fill="#334155">$ vaultenv backup</text>
  <text x="266" y="136" font-family="monospace" font-size="10" fill="#1e293b">  Found 8 projects</text>
  <text x="266" y="152" font-family="monospace" font-size="10" fill="#1e293b">  Encrypting...</text>
  <text x="266" y="168" font-family="monospace" font-size="10" fill="#22c55e">  ✓ AES-256-GCM</text>
  <text x="266" y="184" font-family="monospace" font-size="10" fill="#22c55e">  ✓ 6.2 KB uploaded</text>
  <text x="266" y="208" font-family="monospace" font-size="10" fill="#22c55e">  ✓ bkp_8f97b2...</text>

  <!-- Arrow 2→3 -->
  <line x1="435" y1="140" x2="465" y2="140" stroke="#1e293b" stroke-width="1.5"/>
  <polyline points="458,133 465,140 458,147" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Step 03 -->
  <rect x="470" y="30" width="190" height="220" rx="6" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="1.5"/>
  <text x="486" y="60" font-family="monospace" font-size="10" fill="#1e293b" letter-spacing="2">STEP 03</text>
  <text x="486" y="84" font-family="monospace" font-size="14" fill="#22c55e" font-weight="500">vaultenv restore</text>
  <line x1="486" y1="96" x2="644" y2="96" stroke="#1a1a1a" stroke-width="1"/>
  <text x="486" y="118" font-family="monospace" font-size="10" fill="#334155">$ vaultenv restore</text>
  <text x="486" y="136" font-family="monospace" font-size="10" fill="#1e293b">  Downloading...</text>
  <text x="486" y="152" font-family="monospace" font-size="10" fill="#1e293b">  Decrypting...</text>
  <text x="486" y="168" font-family="monospace" font-size="10" fill="#22c55e">  ✓ my-api/.env</text>
  <text x="486" y="184" font-family="monospace" font-size="10" fill="#22c55e">  ✓ frontend/.env.local</text>
  <text x="486" y="208" font-family="monospace" font-size="10" fill="#22c55e">  ✓ 14 files restored</text>

  <!-- bottom label -->
  <text x="340" y="268" font-family="monospace" font-size="10" fill="#1e293b" text-anchor="middle" letter-spacing="2">
    YOUR MACHINE → ENCRYPTED UPLOAD → ANY MACHINE
  </text>
</svg>
</div>

<br/>

---

## Commands

| Command | Description |
|---|---|
| `vaultenv init` | Generate a recovery phrase and create your vault |
| `vaultenv login` | Log in to an existing vault on a new machine using your 12-word recovery phrase |
| `vaultenv backup` | Encrypt and back up all `.env` files in current directory tree |
| `vaultenv restore` | Download and restore your latest backup |
| `vaultenv list` | List all backups for this vault |
| `vaultenv view` | View backup contents after decryption |
| `vaultenv init --force` | Reinitialize vault (does not delete cloud backup) |
| `vaultenv restore --force` | Overwrite existing `.env` files on restore |

---

## Project detection

vaultenv automatically detects projects by looking for these markers:

```
package.json  →  Node.js / JavaScript / TypeScript
requirements.txt  →  Python
go.mod  →  Go
Cargo.toml  →  Rust
.git  →  any Git repository
```

On restore, projects are matched to your local folders by fingerprint — prioritising **Git remote URL**, then **package name**, then **folder name**. Files land in the right place automatically.

---

## Security

<!-- SECURITY DIAGRAM -->
<div align="center">
<svg width="680" height="180" viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="180" fill="#070707" rx="10"/>

  <!-- Your machine box -->
  <rect x="20" y="20" width="240" height="140" rx="6" fill="#0d0d0d" stroke="#14532d" stroke-width="1.5"/>
  <text x="36" y="46" font-family="monospace" font-size="10" fill="#166534" letter-spacing="2">YOUR MACHINE</text>
  <text x="36" y="70" font-family="monospace" font-size="11" fill="#334155">recovery phrase</text>
  <text x="36" y="88" font-family="monospace" font-size="11" fill="#334155">encryption keys</text>
  <text x="36" y="106" font-family="monospace" font-size="11" fill="#334155">plaintext .env values</text>
  <text x="36" y="124" font-family="monospace" font-size="11" fill="#334155">decrypted backups</text>
  <text x="36" y="150" font-family="monospace" font-size="10" fill="#14532d">→ never leaves this box</text>

  <!-- Arrow -->
  <line x1="265" y1="90" x2="310" y2="90" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="276" y="82" font-family="monospace" font-size="9" fill="#1e293b">encrypted</text>
  <text x="279" y="106" font-family="monospace" font-size="9" fill="#1e293b">only</text>
  <polyline points="303,83 310,90 303,97" fill="none" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Server box -->
  <rect x="315" y="20" width="220" height="140" rx="6" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="1.5"/>
  <text x="331" y="46" font-family="monospace" font-size="10" fill="#334155" letter-spacing="2">SERVER STORES</text>
  <text x="331" y="70" font-family="monospace" font-size="11" fill="#22c55e">✓ vault ID (hashed)</text>
  <text x="331" y="88" font-family="monospace" font-size="11" fill="#22c55e">✓ encrypted blob</text>
  <text x="331" y="106" font-family="monospace" font-size="11" fill="#22c55e">✓ timestamps + size</text>
  <text x="331" y="124" font-family="monospace" font-size="11" fill="#7f1d1d">✗ your recovery phrase</text>
  <text x="331" y="142" font-family="monospace" font-size="11" fill="#7f1d1d">✗ plaintext secrets</text>
  <text x="331" y="160" font-family="monospace" font-size="11" fill="#7f1d1d">✗ encryption keys</text>

  <!-- Note -->
  <rect x="548" y="20" width="114" height="140" rx="6" fill="#0d0d0d" stroke="#1a1a1a" stroke-width="1.5"/>
  <text x="560" y="46" font-family="monospace" font-size="9" fill="#1e293b" letter-spacing="1">ENCRYPTION</text>
  <text x="560" y="68" font-family="monospace" font-size="10" fill="#22c55e">AES-256</text>
  <text x="560" y="84" font-family="monospace" font-size="10" fill="#334155">GCM mode</text>
  <line x1="560" y1="94" x2="646" y2="94" stroke="#1a1a1a" stroke-width="1"/>
  <text x="560" y="112" font-family="monospace" font-size="10" fill="#22c55e">PBKDF2</text>
  <text x="560" y="128" font-family="monospace" font-size="10" fill="#334155">SHA-256</text>
  <line x1="560" y1="138" x2="646" y2="138" stroke="#1a1a1a" stroke-width="1"/>
  <text x="560" y="156" font-family="monospace" font-size="10" fill="#22c55e">BIP-39</text>
  <text x="560" y="170" font-family="monospace" font-size="10" fill="#334155">12 words</text>
</svg>
</div>

<br/>

**Key principles:**

- 🔒 **End-to-end encrypted** — your `.env` files are encrypted on your machine before upload. The server only ever receives ciphertext.
- 🌱 **Recovery phrase only** — no account, no email, no password reset. Your 12-word phrase is the only credential. Lose it and access cannot be recovered — by design.
- ☁️ **Zero knowledge server** — the server has no key and cannot decrypt anything it stores.
- 🧠 **Smart project matching** — projects matched by Git remote → package name → folder name across machines.

> ⚠️ **Your recovery phrase is the only way to access your backups.** Write it down. Store it somewhere safe. vaultenv cannot recover it for you.

---

## Installation

```bash
# npm
npm install -g vaultenv-cli

# yarn
yarn global add vaultenv-cli

# pnpm
pnpm add -g vaultenv-cli
```

**Requirements:** Node.js 18 or higher.

---

## Configuration

vaultenv stores a local config file at:

```
~/.vaultenv/config.json
```

This file contains your **vault ID** and the **API URL**. It does not store your recovery phrase — that is never saved anywhere on disk.

You can override the API endpoint with an environment variable:

```bash
VAULTENV_API_URL=https://your-instance.example.com vaultenv backup
```

---

## Example session

```
$ vaultenv init

  Generating recovery phrase...

  Your Recovery Phrase:

  cliff net equip resource upgrade tent
  ordinary cage sadness unit liar slab

  ⚠  SAVE THIS PHRASE SECURELY.
     It is the ONLY way to restore your backups.

  Vault ID: 2928e364...
```

```
$ cd ~/projects && vaultenv backup

  Enter your recovery phrase: ••••••••••••••••••••••
  ✔ Found 8 projects
    my-api          — .env, .env.local
    frontend        — .env.local, .env.example
    backend         — .env, .env.production
  ✔ Encrypted (6.2 KB)
  ✔ Backup complete: bkp_8f97b2da86b4
```

```
$ vaultenv restore

  Enter your recovery phrase: ••••••••••••••••••••••
  ✔ Downloaded backup from 08/06/2026
  ✔ Decrypted — 8 projects found
  ✔ my-api/.env
  ✔ frontend/.env.local
  ✔ backend/.env.production
  Restored 14 files across 8 projects
```

---

## What gets backed up

vaultenv scans from your current working directory and backs up all files matching `.env*`:

```
.env
.env.local
.env.development
.env.production
.env.staging
.env.test
.env.example        ← yes, even examples
```

Ignored automatically:

```
node_modules/
.git/
dist/
build/
.next/
.turbo/
```

---

## Contributing

Contributions are welcome. Please open an issue before submitting a pull request for anything non-trivial.

```bash
# Clone
git clone https://github.com/timothy-okoduwa/vaultenv
cd vaultenv

# Install dependencies
pnpm install

# Start web app (dev)
pnpm dev

# Build CLI
pnpm build:cli

# Link CLI locally for testing
cd packages/vaultenv-cli && npm link
vaultenv --help
```

---

## License

MIT © [Timothy Okoduwa](https://github.com/timothy-okoduwa)

---

<div align="center">
<br/>
<svg width="400" height="40" viewBox="0 0 400 40" xmlns="http://www.w3.org/2000/svg">
  <text x="200" y="24" font-family="monospace" font-size="11" fill="#1e293b" text-anchor="middle" letter-spacing="4">
    AES-256-GCM · PBKDF2-SHA256 · BIP-39 · MIT
  </text>
</svg>

*Built by [Timothy Okoduwa](https://github.com/timothy-okoduwa)*

</div>
