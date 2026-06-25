<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  terms: {
    type: Array,
    required: true
  }
})

const isOpen = ref(false)

const glossary = {
  'mcp': {
    title: 'MCP (Model Context Protocol)',
    desc: 'An open standard, launched late 2024, for bidirectional, stateful communication between LLM-based agents and external tools/data sources — often described as a "USB-C port for AI."'
  },
  'llm': {
    title: 'LLM (Large Language Model)',
    desc: 'A neural network trained on large text corpora to generate and reason over natural language; in MCP, the LLM is the "brain" hosted inside the Host application.'
  },
  'host': {
    title: 'Host',
    desc: 'The application embedding the LLM (e.g., an IDE or chatbot) that initializes an MCP Client and presents discovered tools/resources to the model.'
  },
  'client': {
    title: 'MCP Client',
    desc: 'The component living inside the Host that opens and manages a session with an MCP Server, handling capability negotiation and message routing.'
  },
  'server': {
    title: 'MCP Server',
    desc: 'A standalone process exposing Tools, Resources, and Prompts to a Client over JSON-RPC. Security and isolation quality of the Server is the primary attack surface.'
  },
  'n-x-m': {
    title: 'The N × M Integration Problem',
    desc: 'The pre-MCP reality where connecting N models to M tools required N×M bespoke integrations, creating an unmanageable maintenance burden.'
  },
  'lethal-trifecta': {
    title: 'Lethal Trifecta',
    desc: 'The combination of (1) access to private data, (2) internet connectivity, and (3) autonomous action capability — together creating the core security risk of agentic systems.'
  },
  'json-rpc': {
    title: 'JSON-RPC 2.0',
    desc: 'The lightweight remote-procedure-call protocol that MCP uses for all Client–Server messages (tool calls, results, notifications).'
  },
  'capability-negotiation': {
    title: 'Capability Negotiation',
    desc: 'The handshake step where Client and Server exchange supported features (sampling, prompts, resources) immediately after connecting, so the agent never calls an unsupported tool.'
  },
  'tools': {
    title: 'Tools (Execution Primitive)',
    desc: 'MCP primitive representing actions an agent can perform (e.g., writing a file, querying a database) — the primitive where both capability and risk concentrate.'
  },
  'resources': {
    title: 'Resources (Context Primitive)',
    desc: 'MCP primitive representing passive, read-only data streams (e.g., logs, file contents) exposed to the model without side effects.'
  },
  'prompts': {
    title: 'Prompts (Guidance Primitive)',
    desc: 'MCP primitive for server-defined, pre-baked workflow templates that guide the model toward the intended way of using a tool.'
  },
  'stdio': {
    title: 'Stdio Transport',
    desc: 'A local transport where the MCP Server runs as a subprocess on the same machine as the Host, communicating over standard input/output. Fast and private — data never leaves local RAM.'
  },
  'sse': {
    title: 'HTTP / SSE Transport',
    desc: 'A remote transport using Server-Sent Events over HTTP for cloud-hosted MCP Servers. Necessary for scale, but exposes network latency and conventional web attack surfaces.'
  },
  'sampling': {
    title: 'Sampling',
    desc: 'An MCP capability letting a Server ask the host LLM to generate completions. Abuse of sampling lets a malicious server fake data or inject persistent instructions into the conversation.'
  },
  'context-bloat': {
    title: 'Context Bloat',
    desc: 'The degradation caused by loading hundreds of tool JSON schemas into the context window, which can inflate token usage by up to 236× and bury the user\'s actual request ("Lost in the Middle").'
  },
  'json-schema': {
    title: 'Tool JSON Schema',
    desc: 'The machine-readable manual describing a tool\'s name, parameters, and types, which the agent must read before it can correctly invoke that tool.'
  },
  'code-execution-paradigm': {
    title: 'Code Execution Paradigm',
    desc: 'An emerging pattern where the agent writes and runs a script to orchestrate several tool calls at once, instead of issuing them one-by-one — cutting token usage by up to 98% at the cost of requiring strong sandboxing.'
  },
  'ipi': {
    title: 'Indirect Prompt Injection (IPI)',
    desc: 'An attack where untrusted content (e.g., a webpage the agent reads) contains hidden instructions that hijack the agent\'s subsequent behavior.'
  },
  'tool-poisoning': {
    title: 'Tool Poisoning',
    desc: 'A supply-chain attack where a malicious or compromised MCP Server is installed as if it were legitimate, acting as a trojan horse. Found in 5.5% of scanned servers.'
  },
  'tiered-sandboxing': {
    title: 'Tiered Sandboxing',
    desc: 'A defense strategy that scales isolation strength to risk: low-risk tools run normally, while high-risk tools (e.g., code execution) are confined to a hardened microVM.'
  },
  'microvm': {
    title: 'MicroVM (e.g., Firecracker)',
    desc: 'A lightweight virtual machine providing kernel-level isolation for untrusted workloads, used to sandbox dangerous MCP tool executions such as arbitrary code execution.'
  },
  'taint-tracking': {
    title: 'Taint Tracking',
    desc: 'A defense technique that tags data by its provenance (e.g., "from the untrusted web") and blocks tainted data from reaching sensitive tool calls without sanitization.'
  },
  'mcpgauge': {
    title: 'MCPGAUGE',
    desc: 'A benchmark evaluating whether MCP integration actually improves LLM task effectiveness; found integration can reduce performance by an average of 9.5% across commercial models.'
  },
  'livemcp-101': {
    title: 'LiveMCP-101',
    desc: 'A stress-testing benchmark for MCP-enabled agents on challenging, multi-step real-world queries; even frontier models fail more than 40% of tasks.'
  },
  'protocol-behavior-mismatch': {
    title: 'Protocol-Behavior Mismatch',
    desc: 'The gap between an agent correctly implementing the MCP handshake/schema and actually using tools competently — having a tool is not the same as knowing when to use it.'
  },
  'trust-registry': {
    title: 'Trust Registry',
    desc: 'A proposed centralized directory for vetting and certifying MCP servers, analogous to how certificate authorities validate websites via SSL/TLS.'
  },
  'secure-runtimes': {
    title: 'Secure Runtimes',
    desc: 'Standardized, verifiable execution environments needed once agents start writing and running their own code under the Code Execution Paradigm.'
  },
  'hipaa': {
    title: 'HIPAA',
    desc: 'A US healthcare data-privacy regulation cited as an example of domain-specific compliance that future MCP extensions would need to enforce at the protocol level.'
  },
  'agentx': {
    title: 'AgentX',
    desc: 'A proposed pattern where MCP acts as the connective layer for a team of specialized agents (planner, researcher, executor) rather than a single monolithic agent.'
  },
  'multi-agent': {
    title: 'Multi-Agent Systems',
    desc: 'Architectures composed of several cooperating agents with distinct roles, coordinated via protocols like MCP rather than a single end-to-end model.'
  }
}

const activeTerms = computed(() => {
  return props.terms.map(key => glossary[key]).filter(Boolean)
})
</script>

<template>
  <div class="glossary-wrapper">
    <!-- Trigger Button -->
    <button 
      @click="isOpen = !isOpen"
      class="glossary-btn"
      title="Click to view technical term explanations"
    >
      <span class="icon">💡</span>
      <span class="text">Term Notes</span>
    </button>

    <!-- Dropup Drawer Modal -->
    <div v-if="isOpen" class="glossary-modal">
      <div class="glossary-header">
        <h4 class="title">📖 Technical Explanations</h4>
        <button @click="isOpen = false" class="close-btn">&times;</button>
      </div>
      <div class="glossary-content">
        <div v-for="item in activeTerms" :key="item.title" class="glossary-item">
          <h5 class="item-title">{{ item.title }}</h5>
          <p class="item-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glossary-wrapper {
  position: absolute;
  bottom: 0.65rem;
  right: 5.5rem; /* Position next to the page number (which is at right: 2rem) */
  z-index: 1000;
}

.glossary-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background-color: var(--color-slate-100);
  border: 1px solid var(--color-slate-300);
  color: var(--color-blue);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.glossary-btn:hover {
  background-color: var(--color-slate-200);
  border-color: var(--color-blue);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.glossary-modal {
  position: absolute;
  bottom: 1.8rem;
  right: 0; /* Align right edge of the modal with the button */
  width: 320px;
  max-height: 280px;
  background: #ffffff;
  border: 1px solid var(--color-slate-300);
  border-radius: 6px;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.18s ease-out;
}

.glossary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-slate-50);
  border-bottom: 1px solid var(--color-slate-200);
  padding: 0.4rem 0.6rem;
}

.glossary-header .title {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-slate-900);
  font-family: 'Outfit', sans-serif;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--color-slate-500);
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: var(--color-rose);
}

.glossary-content {
  overflow-y: auto;
  padding: 0.5rem;
  text-align: left;
}

.glossary-item {
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-slate-100);
  padding-bottom: 0.4rem;
}

.glossary-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.item-title {
  margin: 0 0 0.15rem 0;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-blue);
  font-family: 'Outfit', sans-serif;
}

.item-desc {
  margin: 0;
  font-size: 0.65rem;
  color: var(--color-slate-700);
  line-height: 1.3;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
