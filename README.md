# MCP-Agentic-Security-Review

## Live Web Page

**https://yusufarbc.github.io/MCP-Agentic-Security-Review/**

This repository aggregates academic work examining the architectural, security, and defense dimensions of the Model Context Protocol (MCP) ecosystem, along with a visual media set and an 18-paper reference library. The root `index.html` and the live page on GitHub Pages summarize this content on a single screen.

## Featured Visuals

### MCP.png – The New Standard for AI Agents
![The New Standard for AI Agents](media/MCP.png)

This visual illustrates how MCP positions itself as a new "standard context layer" for LLM-based agents, explaining how it reduces integration chaos while providing security and consistency.

### infografik.png – Inter-Agent Communication: MCP and Other Protocols
![Inter-Agent Communication: MCP and Other Protocols](media/infografik.png)

This NotebookLM-based infographic juxtaposes the challenges in inter-agent communication with interoperability solutions such as MCP, ACP, A2A, and ANP.

### client-server-model.png – MCP Client-Server Architecture
![MCP Client-Server Architecture](media/client-server-model.png)

This diagram shows how a user request flows through the chain of LLM → MCP Client → Multiple MCP Servers → Tools, indicating that each server hosts its own toolset and MCP standardizes this interaction.

## Why is MCP Critical?

- **Universal Adapter:** Manages LLM-based agents' communication with tools, APIs, data sources, and devices via a common JSON-RPC based language.
- **Risk Panorama:** 4 actors (malicious developer/user, external attacker, software/configuration error) and 16 threats; scans of 1,899 servers reported 7.2% general vulnerabilities, 5.5% tool poisoning, and 66% code smells.
- **Benchmark Findings:** MCPGAUGE doesn't always provide benefit; MCP-Universe/LiveMCP-101 report < 60% success on real servers; MCPToolBench++ indicates format diversity as a bottleneck, while AutoMalTool can bypass many defenses (MCP-Guard achieves 96% accuracy with multi-layer detection).
- **Defense Strategies:** IFC + taint tracking, sandbox profiles, OAuth/mTLS + scoped tokens, plan-based testing + logging + red teaming, signed packages/SBOM, and OpenAPI→AutoMCP automation are recommended.

## Repo Map

| Path | Content |
| --- | --- |
| `index.html` | Landing page: repository structure, media gallery, reference table, security summary, and YouTube demo. |
| `paper/` | IEEEtran LaTeX sources (`paper.tex`, `paper.pdf`, `protocol.png`, log/aux files). |
| `media/` | Infographics, NotebookLM posters, MCP host diagrams, protocol schema, and `Yapay_Zeka_Ajanlari.mp4`. |
| `reference/` | 18 PDFs; topics include MCP-Guard, AutoMalTool, MCPGAUGE, MCPmed, AgentX, A2AS, economic agents, etc. |
| Root Files | `.editorconfig`, `.gitattributes`, `.gitignore`, README, and infrastructure for GitHub Pages. |

## Comprehensive Documentation

This repo contains an English documentation set that delves deep into MCP standards and security details:

| File | Description |
| --- | --- |
| [01-overview.md](docs/01-overview.md) | **Overview:** What is MCP, the N×M problem, and core building blocks. |
| [02-architecture.md](docs/02-architecture.md) | **Architecture:** Client-Host-Server model and transport layers. |
| [03-security-and-governance.md](docs/03-security-and-governance.md) | **Security:** Threat vectors (IPI, Tool Poisoning) and defense strategies. |
| [04-performance-and-optimization.md](docs/04-performance-and-optimization.md) | **Performance:** "Context Bloat" problem and code execution paradigm. |
| [05-use-cases-and-ecosystem.md](docs/05-use-cases-and-ecosystem.md) | **Use Cases:** Enterprise automation, DevOps, and multi-agent systems. |
| [06-insights-and-future.md](docs/06-insights-and-future.md) | **Insights:** Surprising findings and the protocol's future. |
| [07-literature-review.md](docs/07-literature-review.md) | **Literature:** Academic references and literature review. |

## Selected Media Showcase

| Image | Description |
| --- | --- |
| `media/model.png` | Poster explaining server construction steps with MCP architecture + Python. |
| `media/post.jpeg` | Diagram listing MCP host, protocol layer, and 17 threat vectors. |
| `media/diagram.png` | Flow showing LLM → MCP Client → Multiple Server connection. |
| `media/protocol.png` | Summarizes MCP as a standard bridge between IDEs, chat interfaces, and data/tool layers. |
| `media/Yapay_Zeka_Ajanlari.mp4` | Local demo video (YouTube mirror `https://www.youtube.com/watch?v=MgGM5rkxL0c`). |

`media/README.md` provides short descriptions for reuse of each file; displayed as cards on the landing page.

## Reference Library (`reference/`)

- 18 PDFs; covering areas such as MCP architecture, benchmark sets (MCPGAUGE, MCPToolBench++, LiveMCP-101), AutoMalTool, MCP-Guard, MCPmed, AgentX, A2AS, AI Agents for Economic Research.
- `reference/Readme.md` includes Turkish/English abstracts for all papers. When adding a new source, simply number the file and add a note to Readme.

## Compiling the Paper (`paper/`)

```bash
cd paper
pdflatex paper.tex
bibtex paper
pdflatex paper.tex
pdflatex paper.tex
```

`paper.log` is for error analysis; `protocol.png` represents the figure in the paper.

## Work Suggestions

1. Open `index.html` in a browser to check the current content summary (GitHub Pages link above).
2. Keep both relevant Readme files and landing page sections synchronized when media and references are updated.
3. When MCP security findings (e.g., LiveMCP-101 results, AutoMalTool logs) arrive, add them to `paper/` or a new `reports/` directory.
4. In the future, you can create `docs/` or `scripts/` folders for OAuth/mTLS reference configurations, guard-model scenarios, and SBOM generation scripts.

The README and `index.html` serve as high-level guides for the MCP-Agentic-Security-Review repository; they need to stay updated as work progresses.
