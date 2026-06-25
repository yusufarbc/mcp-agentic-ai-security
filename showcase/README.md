# Showcase — Academic Presentation Slides

Interactive, web-based presentation slides for the conference presentation of the paper: **"A Critical Security and Architectural Review of the Model Context Protocol (MCP) Ecosystem"**.

Built using [Slidev](https://sli.dev/) with a custom academic light theme.

## Features

- **Academic Light Theme**: Clean, high-contrast typography and layout matching standard scientific presentation styles (`style.css`).
- **Interactive Term Notes**: A global glossary helper (`components/Glossary.vue`) displaying definitions of MCP architecture, security, and benchmarking terms directly on the slides.
- **Persistent Footers**: Slide numbers and paper citation info (`global-bottom.vue`) visible on all content slides.
- **Embedded Architecture Diagrams**: Mermaid sequence/flow diagrams and the paper's protocol overview figure.

## Running Locally

To run the presentation in development mode locally:

1. Navigate to the `showcase/` directory:
   ```bash
   cd showcase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

The presentation will be available at `http://localhost:3030`.

## Building and Deployment

The slides are automatically compiled and deployed to **GitHub Pages** on every push to the `main` branch via the GitHub Action workflow:

- Workflow file: `.github/workflows/deploy.yml`
- Production build command: `npm run build` (builds with `--base /mcp-agentic-ai-security/` to match the Pages project path)
- Target environment: GitHub Pages

This Slidev deck is the only site published to GitHub Pages — the earlier multi-page `website/` directory was retired and its written content/images were folded into [`docs/`](../docs/) and [`public/images/`](./public/images/).

## Supplementary Images

`public/images/` holds infographics relocated from the retired `website/` directory (architecture, threat landscape, literature review, multi-agent visuals). They aren't wired into the current deck yet but are available for future slides.
