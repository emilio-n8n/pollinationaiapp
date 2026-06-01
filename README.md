# AI Image Studio

A professional front-end only web app for conversational image generation and modification, powered by Pollinations.AI.

## Features

- **Conversational AI**: Chat with Gemini (via Pollinations) to describe image modifications.
- **Image Generation**: Powered by Pollinations API (GPT Image 2).
- **Image Analysis**: Upload images for the AI to analyze and modify.
- **Version History**: Keep track of all generated versions and undo changes.
- **BYOP (Bring Your Own Pollen)**: Paste your Pollinations API key to enable generation and track your balance.
- **Modern UI**: Dark mode, glassmorphism, and responsive design.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Pollinations.AI (Gemini for Chat/Vision, GPT Image 2 for Generation)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- Pollinations API Key (Get it from [Pollinations](https://enter.pollinations.ai/))

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create a `.env` file in the root directory if you want a default key:
   ```env
   VITE_POLLINATIONS_APP_KEY=pk_your_pollinations_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the app in your browser.
2. Click **"Enter API Key"** in the top right corner.
3. Paste your Pollinations API key (from [enter.pollinations.ai](https://enter.pollinations.ai)).
4. Start chatting or upload an image to begin editing!

## Deployment

This app is ready for static deployment on platforms like Vercel or Netlify.

```bash
npm run build
```
The output will be in the `dist` directory.
