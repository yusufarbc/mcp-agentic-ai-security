# MCP Agentic AI Security Review

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-comprehensive-blue)](docs/)
[![Status](https://img.shields.io/badge/status-active-success)](https://github.com/yusufarbc/mcp-agentic-ai-security)

## 📖 Overview

**MCP Agentic AI Security Review** is a comprehensive academic repository dedicated to analyzing the **Model Context Protocol (MCP)** ecosystem. As AI agents evolve from passive chatbots to autonomous systems capable of executing code and manipulating data, the need for a standardized, secure communication layer has never been clearer.

This repository aggregates architectural analysis, security research, threat modeling, and defense strategies for MCP-enabled systems. It serves as a central hub for researchers, developers, and security engineers to understand the "N×M" integration problem and the security implications of agentic interoperability.

🔗 **Live Documentation:** [https://yusufarbc.github.io/mcp-agentic-ai-security/](https://yusufarbc.github.io/mcp-agentic-ai-security/)

## ✨ Key Features

*   **Architectural Deep Dive:** Detailed breakdown of the Client-Host-Server model, transport layers (stdio/SSE), and auto-generation tools like AutoMCP.
*   **Security Research:** Comprehensive threat taxonomy including Indirect Prompt Injection (IPI), Tool Poisoning, and Supply Chain attacks.
*   **Literature Review:** Curated collection of academic papers (IEEE/ACM) and empirical benchmarks (MCPGAUGE, LiveMCP-101).
*   **Visual Assets:** High-quality diagrams and infographics explaining the MCP ecosystem (available in `website/images`).
*   **Academic Paper:** Full LaTeX source for the accompanying research paper in `paper/`.

## 📂 Repository Structure

```
├── docs/                   # Comprehensive markdown documentation
│   ├── 01-overview.md      # Protocol fundamentals
│   ├── 02-architecture.md  # Technical architecture
│   ├── 03-security.md      # Threat landscape & defenses
│   └── ...                 # Performance, Use Cases, Literature
├── paper/                  # LaTeX source for the academic paper (IEEE format)
├── reference/              # Collected academic papers and PDFs
├── website/                # Source code for the documentation website
│   ├── index.html          # Main landing page
│   ├── pages/              # Individual documentation pages
│   └── images/             # Diagrams and Infographics
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # Contribution guidelines
└── README.md               # Project entry point
```

## 🚀 Getting Started

### Prerequisites

*   **Reading:** Start with the [Overview](docs/01-overview.md) to understand the core concepts.
*   **Website:** Visit the [Live Site](https://yusufarbc.github.io/mcp-agentic-ai-security/) for an interactive experience.
*   **LaTeX (Optional):** To compile the academic paper, you need a standard TeX distribution (TeX Live, MiKTeX).

### Compilation (Academic Paper)

To generate the PDF from the LaTeX source:

```bash
cd paper
pdflatex paper.tex
bibtex paper
pdflatex paper.tex
pdflatex paper.tex
```

## 📊 Visuals & Architecture

### The MCP Standard
![MCP Standard](website/images/mcp_infographic.png)
*MCP positions itself as the "USB-C for AI," standardizing how agents connect to tools and data.*

### Client-Server Architecture
![Architecture](website/images/mcp_architecture.png)
*A clear separation of concerns: The Host manages the User/Agent, while the Server manages Tool/Resource logic.*

### Threat Landscape
![Threats](website/images/mcp_threats.png)
*The "Lethal Trifecta" of Data, Action, and Internet access creates new attack surfaces like Tool Poisoning.*

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 References

The `reference/` directory contains a curated list of papers cited in this project. See [reference/Readme.md](reference/Readme.md) for abstracts and details.

---
*Maintained by Yusuf Talha ARABACI*
