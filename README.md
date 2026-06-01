# AI Image Studio

A professional front-end only web app for conversational image generation and modification, powered by Pollinations.AI.

## Features

- **Conversational AI**: Chat with Gemini (via Pollinations) to describe image modifications.
- **Image Generation**: Powered by Pollinations API (GPT Image 2).
- **Image Analysis**: Upload images for the AI to analyze and modify.
- **Version History**: Keep track of all generated versions and undo changes.
- **BYOP (Bring Your Own Pollen)**: Connect your Pollinations account for premium features and higher limits.
- **Modern UI**: Dark mode, glassmorphism, and responsive design.

## Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Pollinations.AI (Gemini for Chat/Vision, GPT Image 2 for Generation)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- Pollinations App Key (Get it from [Pollinations](https://enter.pollinations.ai/))

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Pollinations App Key:
   ```env
   VITE_POLLINATIONS_APP_KEY=pk_your_pollinations_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

This app is ready for static deployment on platforms like Vercel or Netlify.

```bash
npm run build
```
The output will be in the `dist` directory.

## Manual Testing Checklist

- [ ] App loads with a clean dark interface.
- [ ] Chat input allows typing and sending messages.
- [ ] Image upload preview appears before sending.
- [ ] AI returns instructions based on prompt/image.
- [ ] Pollinations generates an image based on those instructions.
- [ ] Loading spinner shows during generation.
- [ ] Image history updates with new versions.
- [ ] Undo button reverts to previous image version.
- [ ] Zoom controls work on the image canvas.
- [ ] Download button saves the current image.
- [ ] "Connect Your Pollen Account" redirects to Pollinations auth.
- [ ] Responsive layout works on mobile (tab switching).
