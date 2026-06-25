---
theme: default
layout: default
info: |
  ## A Critical Security and Architectural Review of the Model Context Protocol (MCP) Ecosystem
  Academic presentation for Yusuf Talha Arabacı, Karabük University.
class: text-left
highlighter: shiki
drawings:
  persist: false
transition: fade
routerMode: hash
title: "A Critical Security and Architectural Review of the Model Context Protocol (MCP) Ecosystem"
---

<div class="flex flex-col items-center justify-center h-full gap-3">
  <div class="grid grid-cols-12 gap-6 w-full items-center">
    <div class="col-span-7 flex flex-col justify-center">
      <h1 class="text-3xl font-extrabold text-blue-800 leading-tight">
        A Critical Security and Architectural Review
      </h1>
      <h4 class="text-slate-500 font-medium text-sm mt-1">of the Model Context Protocol (MCP) Ecosystem</h4>
      <h3 class="text-slate-600 font-semibold mt-2 text-lg leading-relaxed">
        Research Report — December 2025
      </h3>
    </div>
    <div class="col-span-5 flex justify-center items-center">
      <div class="p-2 bg-white border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <img src="./public/protocol-overview.webp" class="max-h-70 object-contain rounded" />
        <div class="text-center text-xs text-slate-500 mt-2 font-medium">
          Figure 1: Overview of the MCP architecture
        </div>
      </div>
    </div>
  </div>
  <div class="p-5 bg-slate-50 border border-slate-200 rounded-lg shadow-sm w-full max-w-2xl">
    <div class="font-bold text-base text-slate-900 text-center">
      Yusuf Talha ARABACI
    </div>
    <div class="text-slate-700 text-xs mt-1 text-center font-medium">
      M.Sc. Student in Software Engineering, Karabük University, Turkey
    </div>
    <div class="text-slate-500 text-xs mt-0.5 text-center">
      yusuftalhaarabaci@hotmail.com
    </div>
  </div>
</div>

<Glossary :terms="['mcp', 'llm', 'host', 'client', 'server']" />

---
layout: default
class: rq-slide
---

## Agenda
### Presentation Outline

<div class="flex flex-col gap-3 mt-4">
  <div class="glass-panel">
    <div class="flex items-center gap-3">
      <span class="text-lg font-bold text-blue" style="min-width:2rem">1</span>
      <div><strong>Introduction</strong> — The N×M interoperability crisis and why MCP emerged</div>
    </div>
  </div>
  <div class="glass-panel">
    <div class="flex items-center gap-3">
      <span class="text-lg font-bold text-blue" style="min-width:2rem">2</span>
      <div><strong>Architecture</strong> — Host/Client/Server model, primitives, transport layers</div>
    </div>
  </div>
  <div class="glass-panel">
    <div class="flex items-center gap-3">
      <span class="text-lg font-bold text-blue" style="min-width:2rem">3</span>
      <div><strong>Performance</strong> — Context bloat and the Code Execution Paradigm</div>
    </div>
  </div>
  <div class="glass-panel">
    <div class="flex items-center gap-3">
      <span class="text-lg font-bold text-rose" style="min-width:2rem">4</span>
      <div><strong>Security</strong> — The Lethal Trifecta, threat vectors, and defense-in-depth</div>
    </div>
  </div>
  <div class="glass-panel">
    <div class="flex items-center gap-3">
      <span class="text-lg font-bold text-emerald" style="min-width:2rem">5</span>
      <div><strong>Empirical Gaps &amp; Outlook</strong> — Benchmark reality, research priorities, future work</div>
    </div>
  </div>
</div>

<Glossary :terms="['n-x-m', 'lethal-trifecta']" />

---
layout: default
---

## The Interoperability Crisis
### Why AI Agents Needed a Standard

<div class="grid grid-cols-2 gap-4 mt-4">
  <div class="glass-panel">
    <h3 class="text-blue font-semibold">The N × M Problem</h3>
    <ul>
      <li>LLMs became fluent in language, but their ability to <strong>act</strong> on the world remained brittle.</li>
      <li>Connecting model <strong>N</strong> to tool <strong>M</strong> meant bespoke integration code for every pair.</li>
      <li>Result: an unmanageable maintenance burden that scaled quadratically.</li>
    </ul>
  </div>

  <div class="glass-panel highlight-box-warning">
    <h3 class="text-rose font-semibold">The MCP Answer</h3>
    <ul>
      <li>Launched late 2024 — a <strong>"USB-C port" for AI</strong>, backed by Anthropic, OpenAI, and Google.</li>
      <li>Standardizes bidirectional, stateful communication between agents and external tools/data.</li>
      <li>Shifts agents from stateless API callers to persistent, session-based "digital employees."</li>
    </ul>
  </div>
</div>

<div class="highlight-box highlight-box-info text-sm mt-2">
  <strong>But the upgrade is dangerous:</strong> giving agents Data access + Internet connectivity + Action capability creates a new "Lethal Trifecta" of risk.
</div>

<Glossary :terms="['n-x-m', 'mcp', 'lethal-trifecta']" />

---
layout: default
---

## Methodology: Architectural Design
### Decoupling the Brain from the Hands

<div class="grid grid-cols-2 gap-4 mt-2">
  <div>
    <ul>
      <li>MCP separates the <strong>Host</strong> (the LLM application — IDE, chatbot) from the standalone <strong>Server</strong> (the tools).</li>
      <li>A session is a persistent handshake, not a one-off call: the <strong>Client</strong> initializes inside the Host and connects to the Server.</li>
      <li>On connect, both sides negotiate <strong>capabilities</strong> — sampling, prompts, resources — so the agent never invokes a tool it doesn't understand.</li>
    </ul>
  </div>
  <div class="flex flex-col justify-center items-center">
    <img src="./public/protocol-overview.webp" class="slide-img" />
    <span class="text-xs text-slate-500 mt-1">Figure 1: MCP Host–Client–Server architecture</span>
  </div>
</div>

<Glossary :terms="['host', 'client', 'server', 'capability-negotiation', 'json-rpc']" />

---
layout: default
---

## Protocol Primitives
### Everything in MCP is One of Three Things

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="glass-panel">
    <h3 class="font-semibold text-rose" style="font-size:0.95rem">🛠 Tools (Execution)</h3>
    <p class="text-xs">The ability to <em>do</em> things — <code>INSERT INTO users</code>, <code>delete_file</code>. Where the power, and the danger, lives.</p>
  </div>
  <div class="glass-panel">
    <h3 class="font-semibold text-blue" style="font-size:0.95rem">📄 Resources (Context)</h3>
    <p class="text-xs">Passive data streams — reading logs, viewing a file. Gives the model context without changing state.</p>
  </div>
  <div class="glass-panel">
    <h3 class="font-semibold text-emerald" style="font-size:0.95rem">📋 Prompts (Guidance)</h3>
    <p class="text-xs">Pre-baked workflows — the server tells the model the standard way to perform a task instead of it guessing blindly.</p>
  </div>
</div>

<div class="highlight-box highlight-box-info text-sm mt-3">
  <strong>Transport layer:</strong> <span class="stat-badge badge-cpu">Stdio</span> runs the server locally as a subprocess — fast and private. <span class="stat-badge badge-npu">HTTP/SSE</span> is required for remote/cloud servers, but reintroduces network latency and classic web attack surfaces.
</div>

<Glossary :terms="['tools', 'resources', 'prompts', 'stdio', 'sse']" />

---
layout: default
class: compact-slide
---

## Host–Client–Server Handshake
### Connection Lifecycle

<div class="flex flex-col justify-center items-center mt-2">

```mermaid {scale: 0.85}
%%{init: {"theme": "base", "themeVariables": {"titleColor": "#1e293b", "textColor": "#1e293b", "primaryTextColor": "#1e293b", "background": "#ffffff"}}}%%
sequenceDiagram
  participant H as Host (LLM App)
  participant C as MCP Client
  participant S as MCP Server
  H->>C: Initialize client
  C->>S: Connect (stdio / HTTP+SSE)
  S->>C: Advertise capabilities (tools, resources, prompts, sampling)
  C->>H: Register available tools
  H->>C: Invoke tool call
  C->>S: JSON-RPC request
  S->>C: JSON-RPC result
  C->>H: Return result to LLM context
```

</div>

<Glossary :terms="['host', 'client', 'server', 'json-rpc', 'sampling']" />

---
layout: default
---

## Analysis: Performance &amp; Efficiency
### The Hidden Cost of Connecting Everything

<div class="grid grid-cols-2 gap-4 mt-2">
  <div class="glass-panel highlight-box-warning">
    <h3 class="text-rose font-semibold">Context Bloat</h3>
    <ul>
      <li>Every tool's JSON schema must be loaded into the context window before use.</li>
      <li>Hundreds of tool definitions can explode token costs by up to <strong>236×</strong>.</li>
      <li>Causes a "Lost in the Middle" effect — models forget tools buried in documentation.</li>
    </ul>
  </div>
  <div class="glass-panel highlight-box-success">
    <h3 class="text-emerald font-semibold">The Code Execution Shift</h3>
    <ul>
      <li>Industry response: stop calling tools one-by-one, write code instead.</li>
      <li>One script replaces five sequential API calls — cuts token usage by <strong>98%</strong>.</li>
      <li>Trade-off: now the agent is writing and running software, demanding serious sandboxing.</li>
    </ul>
  </div>
</div>

<Glossary :terms="['context-bloat', 'code-execution-paradigm', 'json-schema']" />

---
layout: default
---

## Security Assessment: The Lethal Trifecta
### Giving an Agent Tools Means Giving It Root

<div class="flex flex-col justify-center items-center mt-2">

```mermaid {scale: 0.8}
%%{init: {"theme": "base", "themeVariables": {"titleColor": "#1e293b", "textColor": "#1e293b", "primaryTextColor": "#1e293b", "background": "#ffffff"}}}%%
graph LR
  A["🗄 Data Access"] --- D{{"Lethal\nTrifecta"}}
  B["🌐 Internet Connectivity"] --- D
  C["⚡ Action Capability"] --- D
  style D fill:#ffe4e6,stroke:#be123c,stroke-width:2px,color:#991b1b
  style A fill:#eff6ff,stroke:#1d4ed8,stroke-width:1px
  style B fill:#eff6ff,stroke:#1d4ed8,stroke-width:1px
  style C fill:#eff6ff,stroke:#1d4ed8,stroke-width:1px
```

</div>

<div class="highlight-box highlight-box-warning text-sm mt-2">
  An empirical scan of 1,899 open-source MCP servers found <strong>66%</strong> with serious structural flaws and <strong>5.5%</strong> wide open to tool poisoning.
</div>

<Glossary :terms="['lethal-trifecta', 'tool-poisoning']" />

---
layout: default
---

## Threat Vectors
### Three Ways MCP Gets Exploited

<div class="mt-2 flex flex-col gap-2">
  <div class="highlight-box highlight-box-warning">
    <div class="highlight-box-title">1. Indirect Prompt Injection (IPI)</div>
    <div class="text-sm">An agent reading a webpage can be hijacked by hidden instructions embedded in that page — tricking it into exfiltrating credentials.</div>
  </div>
  <div class="highlight-box highlight-box-warning">
    <div class="highlight-box-title">2. Tool Poisoning</div>
    <div class="text-sm">A supply-chain attack: installing a malicious MCP server is effectively installing a trojan horse. <strong>5.5%</strong> of scanned servers were already compromised.</div>
  </div>
  <div class="highlight-box highlight-box-warning">
    <div class="highlight-box-title">3. Sampling Manipulation</div>
    <div class="text-sm">A malicious server can fake data or rewrite conversation history, gaslighting the model into bad decisions.</div>
  </div>
</div>

<Glossary :terms="['ipi', 'tool-poisoning', 'sampling']" />

---
layout: default
---

## Defense Strategy
### Firewalls Aren't Enough — Defense-in-Depth

<div class="grid grid-cols-2 gap-4 mt-4">
  <div class="glass-panel">
    <h3 class="font-semibold text-blue">Tiered Sandboxing</h3>
    <ul>
      <li>Not all tools carry equal risk.</li>
      <li>A weather lookup can run freely; a code executor must be locked in a microVM (e.g., Firecracker) that can't touch the host kernel.</li>
    </ul>
  </div>
  <div class="glass-panel">
    <h3 class="font-semibold text-blue">Taint Tracking</h3>
    <ul>
      <li>Tag data by provenance: text from the untrusted web is "tainted."</li>
      <li>Tainted data must not reach sensitive sinks (e.g., a delete-file tool) without sanitization.</li>
    </ul>
  </div>
</div>

<Glossary :terms="['tiered-sandboxing', 'microvm', 'taint-tracking']" />

---
layout: default
---

## Empirical Evaluation &amp; Gaps
### The Reality Gap: Overconfident, Under-Competent

<div class="grid grid-cols-2 gap-4 mt-2">
  <div>
    <ul>
      <li><strong>Performance Reality:</strong> even top-tier models (GPT-4o, Claude 3.5 Sonnet) fail complex multi-step tasks <strong>&gt;40%</strong> of the time (LiveMCP-101).</li>
      <li><strong>Initiative Deficit:</strong> agents are often too passive, waiting for explicit commands instead of using available tools.</li>
      <li><strong>Compliance Failures:</strong> models frequently hallucinate parameters that don't exist, ignoring the protocol handshake entirely.</li>
    </ul>
  </div>
  <div class="glass-panel highlight-box-info">
    <h3 class="font-semibold text-blue" style="font-size:0.95rem">MCPGAUGE &amp; LiveMCP-101</h3>
    <p class="text-sm">Benchmarks designed to stress-test MCP-enabled agents on real-world, multi-step queries — consistently exposing a <strong>Protocol-Behavior Mismatch</strong>: the wiring works, the judgment doesn't.</p>
  </div>
</div>

<Glossary :terms="['mcpgauge', 'livemcp-101', 'protocol-behavior-mismatch']" />

---
layout: default
---

## Research Priorities
### Fixing the Foundation, Not Adding Features

<div class="mt-2 flex flex-col gap-2">
  <div class="highlight-box highlight-box-warning">
    <div class="highlight-box-title">Protocol-Behavior Mismatch</div>
    <div class="text-xs">Bridge the gap between "having a tool" and "knowing when to use it."</div>
  </div>
  <div class="highlight-box highlight-box-info">
    <div class="highlight-box-title">Secure Runtimes</div>
    <div class="text-xs">If agents write and run code, the runtime is the new battlefield — standardized, verified sandboxes are mandatory.</div>
  </div>
  <div class="highlight-box highlight-box-success">
    <div class="highlight-box-title">Trust Registry</div>
    <div class="text-xs">A centralized registry/"app store" for MCP servers, analogous to how SSL certificates validate websites.</div>
  </div>
  <div class="highlight-box">
    <div class="highlight-box-title">Domain Extensions</div>
    <div class="text-xs">Healthcare and finance need MCP variants that enforce domain regulation (e.g., HIPAA) at the protocol level.</div>
  </div>
</div>

<Glossary :terms="['trust-registry', 'secure-runtimes', 'hipaa']" />

---
layout: default
---

## Future Outlook
### From a Single Agent to a Team

<div class="glass-panel glass-panel-accent mt-4">
  <h3 class="font-semibold text-blue">The AgentX Pattern</h3>
  <p class="text-sm">MCP acts as the glue for specialized agent squads — one plans, another researches, a third executes. We see a hybrid future: heavy lifting stays on traditional APIs, while the dynamic, creative layer of the internet standardizes on MCP.</p>
</div>

<Glossary :terms="['agentx', 'multi-agent']" />

---
layout: default
---

## Key Findings Summary
### What This Review Reveals

<div class="grid grid-cols-2 gap-4 mt-2">
  <div class="glass-panel" style="border-left:3px solid var(--color-emerald)">
    <h3 class="text-emerald font-bold" style="font-size:0.8rem">✅ Architecturally Sound</h3>
    <ul class="text-xs" style="margin:0">
      <li>Solves the N×M integration crisis cleanly</li>
      <li>Clear Host/Client/Server separation of concerns</li>
    </ul>
  </div>
  <div class="glass-panel" style="border-left:3px solid var(--color-rose)">
    <h3 class="text-rose font-bold" style="font-size:0.8rem">❌ Not Production-Secure</h3>
    <ul class="text-xs" style="margin:0">
      <li>66% of servers show structural flaws, 5.5% tool poisoning</li>
      <li>No protocol-level sandboxing or isolation</li>
    </ul>
  </div>
  <div class="glass-panel" style="border-left:3px solid var(--color-blue)">
    <h3 class="text-blue font-bold" style="font-size:0.8rem">📊 Benchmark Reality</h3>
    <ul class="text-xs" style="margin:0">
      <li>&gt;40% multi-step task failure even on frontier models</li>
      <li>Protocol-Behavior Mismatch is the dominant failure mode</li>
    </ul>
  </div>
  <div class="glass-panel" style="border-left:3px solid var(--color-amber)">
    <h3 class="text-amber font-bold" style="font-size:0.8rem">🔧 Governance Gaps</h3>
    <ul class="text-xs" style="margin:0">
      <li>No trust registry, weak enterprise auth defaults</li>
      <li>Domain-specific (HIPAA-style) extensions still missing</li>
    </ul>
  </div>
</div>

<Glossary :terms="['lethal-trifecta', 'protocol-behavior-mismatch', 'trust-registry']" />

---
layout: default
---

## Key References
### Selected Bibliography

<div class="grid grid-cols-2 gap-4 mt-2">
  <div>
    <ul style="font-size:0.7rem">
      <li><strong>Landscape &amp; Threats</strong> — Hou et al., arXiv:2503.23278</li>
      <li><strong>First Glance Security Study</strong> — Hasan et al., arXiv:2506.13538</li>
      <li><strong>MCP-Guard Defense</strong> — Xing et al., arXiv:2508.10991</li>
      <li><strong>Red Teaming MCP Agents</strong> — He et al., arXiv:2509.21011</li>
    </ul>
  </div>
  <div>
    <ul style="font-size:0.7rem">
      <li><strong>LiveMCP-101 Stress Test</strong> — Yin et al., arXiv:2508.15760</li>
      <li><strong>MCP-Universe Benchmark</strong> — Luo et al., arXiv:2508.14704</li>
      <li><strong>AgentX</strong> — Tokal et al., arXiv:2509.07595</li>
      <li><strong>Survey of Agent Interop. Protocols</strong> — Ehtesham et al., arXiv:2505.02279</li>
    </ul>
  </div>
</div>

<Glossary :terms="['mcp']" />

---
layout: default
---

<div class="flex flex-col items-center justify-center h-full gap-5">
  <h1 class="text-3xl font-extrabold text-blue-800 text-center">Thank You!</h1>
  <h3 class="text-xl text-slate-600 font-semibold">Questions &amp; Discussion</h3>

  <div class="p-6 bg-slate-50 border border-slate-200 rounded-lg shadow-sm max-w-xl w-full mt-1">
    <div class="font-bold text-base text-slate-900 text-center">
      Yusuf Talha ARABACI
    </div>
    <div class="text-slate-700 text-xs mt-1 text-center font-medium">
      Department of Software Engineering, Karabük University
    </div>
    <div class="mt-4 text-center">
      <div class="text-sm font-semibold text-slate-800">Paper &amp; Research Archive</div>
      <img src="./public/qrcode.webp" class="w-28 h-28 object-contain rounded border border-slate-200 shadow-sm mx-auto mt-2" alt="QR Code - GitHub Repository" />
      <div class="text-xs text-slate-500 mt-2">
        <a href="https://github.com/yusufarbc/mcp-agentic-ai-security" target="_blank" class="text-blue-600 underline font-medium">
          github.com/yusufarbc/mcp-agentic-ai-security
        </a>
      </div>
    </div>
    <div class="mt-3 text-xs text-slate-500 text-center">
      <strong>Contact:</strong> yusuftalhaarabaci@hotmail.com
    </div>
  </div>
</div>

<Glossary :terms="['mcp', 'lethal-trifecta']" />
