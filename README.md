<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# ✏️ AI Image Editor

**Edit any image using plain English — powered by Google Gemini 2.5 Flash.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-AI%20Studio-blue?style=for-the-badge&logo=google)](https://ai.studio/apps/drive/11AO_bXUwYnTaVPi_jmdy2W8aKne9VqLk)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

---

## 🚀 Overview

**AI Image Editor** is a browser-based image editing tool that lets you transform photos using natural language. Instead of learning complex editing software, simply describe what you want — *"make this look like a watercolor painting"* or *"add dramatic studio lighting"* — and the app sends your image and prompt to **Google's Gemini 2.5 Flash Image model**, returning a transformed result in seconds.

No backend server required. No image uploads to a third-party storage system. Everything happens directly between your browser and the Gemini API.

---

## ✨ Features

- 🖼️ **Drag-and-drop image upload** — Supports PNG, JPG, and WEBP formats
- ✍️ **Natural language editing** — Describe edits in plain text; the AI handles the rest
- ⚡ **High Quality mode** — Automatically enhances prompts with photorealistic qualifiers for premium output
- 👁️ **Side-by-side preview** — Original and edited images displayed simultaneously for easy comparison
- 💾 **One-click download** — Save the edited image as a PNG instantly
- 🌑 **Dark mode UI** — Professional dark theme with a clean gradient design
- 📱 **Responsive layout** — Works seamlessly on desktop and mobile browsers
- 🔒 **Privacy-first** — Images are encoded in-browser and sent directly to the Gemini API; no intermediate storage

---

## 🏗️ Architecture

This is a **client-side single-page application (SPA)** with no backend. All logic runs in the browser and communicates directly with the Google Gemini API.

```
┌─────────────────────────────────────────────────┐
│                 Browser (React SPA)              │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Header  │  │ Image    │  │ PromptControls│  │
│  │          │  │ Display  │  │  + HQ Toggle  │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
│                      │                │          │
│              ┌───────┴────────────────┘          │
│              ▼                                   │
│         App.tsx (State Management)               │
│              │                                   │
│              ▼                                   │
│      geminiService.ts                            │
│      fileUtils.ts (Base64 encoding)              │
└──────────────┬──────────────────────────────────┘
               │  HTTPS (Gemini API)
               ▼
   ┌───────────────────────────┐
   │  Google Gemini 2.5 Flash  │
   │  Image Model              │
   │  (multimodal input/output)│
   └───────────────────────────┘
```

**Data flow:**
1. User selects an image → `fileUtils.ts` converts it to a Base64-encoded `FilePart`
2. User enters a prompt and optionally enables High Quality mode
3. `geminiService.ts` sends the image + prompt to `gemini-2.5-flash-image` via `@google/genai`
4. The API returns a Base64-encoded PNG image
5. The result is rendered in the browser and made available for download

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript 5.8, Tailwind CSS (CDN) |
| **Build Tool** | Vite 6.2 with `@vitejs/plugin-react` |
| **AI / ML** | Google Gemini 2.5 Flash Image via `@google/genai` SDK |
| **Runtime** | Browser (no server-side runtime required) |
| **Deployment** | Google AI Studio |

---

## 📦 Project Structure

```
AI-image-editor/
├── index.html              # HTML entry point
├── index.tsx               # React DOM root
├── App.tsx                 # Root component & global state
├── types.ts                # Shared TypeScript type definitions
├── vite.config.ts          # Vite build config (port, env vars, aliases)
├── tsconfig.json           # TypeScript compiler config
├── package.json            # Dependencies & scripts
│
├── components/
│   ├── Header.tsx          # Top navigation bar with branding
│   ├── ImageDisplay.tsx    # Image viewer (original & edited) + download button
│   ├── ImageUploader.tsx   # Drag-and-drop / file picker upload widget
│   ├── PromptControls.tsx  # Prompt input, High Quality toggle, submit button
│   └── icons.tsx           # Reusable SVG icon components
│
├── services/
│   └── geminiService.ts    # Gemini API client — sends image+prompt, returns base64
│
└── utils/
    └── fileUtils.ts        # Converts a File object to a base64 GenerativePart
```

---

## ⚙️ Installation

### Prerequisites

- **Node.js** v18 or later
- A **Google Gemini API key** — get one free at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Rishi-choudhary/AI-image-editor.git
cd AI-image-editor

# 2. Install dependencies
npm install

# 3. Configure environment variables (see section below)
cp .env.local.example .env.local   # or create .env.local manually
# Add your API key to .env.local

# 4. Start the development server
npm run dev
# App runs at http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root and add the following:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key. Obtain it from [Google AI Studio](https://aistudio.google.com/app/apikey). |

> **Note:** The key is injected at build time by Vite and exposed to the browser as `process.env.API_KEY`. Never commit your `.env.local` file — it is excluded by `.gitignore`.

---

## ▶️ Usage

1. **Open the app** in your browser at `http://localhost:3000`
2. **Upload an image** by dragging it into the upload area or clicking to browse (PNG, JPG, WEBP supported)
3. **Type a prompt** describing the edit you want, for example:
   - *"Convert to a pencil sketch"*
   - *"Add golden hour lighting"*
   - *"Make it look like a vintage photograph"*
4. **Toggle High Quality mode** (enabled by default) to automatically enhance the prompt with photorealistic qualifiers
5. **Click "Edit Image"** and wait a few seconds for the AI to process your request
6. **Compare** the original and edited images side by side
7. **Download** the result with the download button on the edited image panel

---

## 🚀 Deployment

### Google AI Studio (Recommended)

The app is designed for seamless deployment on [Google AI Studio](https://aistudio.google.com/):

👉 **Live app:** https://ai.studio/apps/drive/11AO_bXUwYnTaVPi_jmdy2W8aKne9VqLk

### Self-hosted / Static Hosting

Since this is a pure client-side app, it can be deployed to any static hosting provider:

```bash
# Build for production
npm run build
# Output is in the dist/ directory

# Preview the production build locally
npm run preview
```

Deploy the contents of `dist/` to:
- **Vercel** — `vercel --prod`
- **Netlify** — drag-and-drop the `dist/` folder
- **GitHub Pages** — push `dist/` to the `gh-pages` branch

> **Important:** Set the `GEMINI_API_KEY` environment variable in your hosting provider's dashboard before deploying.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your fork: `git push origin feature/your-feature-name`
5. **Open a Pull Request** against the `main` branch

Please keep PRs focused and include a clear description of what was changed and why.

---

## 💡 Future Improvements

- [ ] **Image history** — Store and revisit previous edits within the session
- [ ] **Prompt suggestions** — Provide pre-built prompt templates for common edits
- [ ] **Multiple output variations** — Generate several alternatives per prompt for comparison
- [ ] **Undo / redo** — Step back through iterative edits
- [ ] **Adjustable parameters** — Expose model temperature and other Gemini API settings
- [ ] **Batch processing** — Apply the same prompt to multiple images at once
- [ ] **Authentication** — Allow users to bring their own API keys via a UI input

---

## 📄 License

This project does not currently include a license file. All rights are reserved by the author unless otherwise specified. Feel free to contact the repository owner for usage permissions.
