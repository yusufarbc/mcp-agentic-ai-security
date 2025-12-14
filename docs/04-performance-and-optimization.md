# Performance & Optimization

## The Latency and Cost Challenge

While MCP standardizes connection, it introduces a significant engineering challenge: **Context Bloat**.

### The Problem: "Context Pollution"
When an agent connects to an MCP server, it typically loads:
1.  **Tool Definitions:** JSON schemas describing every available tool.
2.  **Intermediate Results:** The full output of every tool call (e.g., the content of a read file, the JSON response of an API).
3.  **Conversation History:** The entire back-and-forth dialogue.

**Impact:**
*   **Token Costs:** Can increase input tokens by massive factors (studies show up to **236x increase**).
*   **Latency:** Processing huge context windows slows down the model significantly.
*   **Accuracy Degradation:** Too much irrelevant context confuses the model ("Lost in the Middle" phenomenon).

## The Solution: "Code Execution" Paradigm

To solve this, the industry is shifting from **Direct Tool Calling** to a **Code Execution** (or "Code Mode") model.

| Feature | Direct Tool Calling | Code Execution Paradigm |
| :--- | :--- | :--- |
| **Mechanism** | The LLM outputs a JSON object to call a specific tool. | The LLM writes a script (e.g., Python/TypeScript) to call tool functions. |
| **Context Usage** | **High.** All tool schemas and full results must be in context. | **Low.** Only necessary libraries are imported. |
| **Data Handling** | Raw data is passed through the LLM. | Data is processed/filtered in the execution environment. |
| **Efficiency** | **150,000 tokens** (Example Benchmark) | **2,000 tokens** (98.7% Reduction) |

### How Code Execution Works

Instead of the agent thinking:
> "I will call `read_file` for 'data.csv', then I will call `filter_data`, then I will call `summarize`."

The agent thinks:
> "I will write a Python script to do this:"

```python
# Agent-generated code
import pandas as pd
from mcp_tools import fs

# Read and process in ONE go, without sending raw data to the LLM
df = pd.read_csv(fs.get_path("data.csv"))
summary = df[df['status'] == 'active'].describe()
print(summary)
```

**Benefits:**
1.  **Progressive Disclosure:** The agent discovers tools as needed via code, rather than loading everything upfront.
2.  **Privacy:** Sensitive PII can be filtered out by the code *before* it's ever sent to the LLM.
3.  **State Persistence:** Intermediate results can be saved to disk.

## Empirical Benchmarks

### MCPGAUGE
*   **Findings:** Adding more MCP tools does not always make an agent smarter. Without optimization, accuracy can drop because the model struggles to choose from too many options.
*   **Key Insight:** Models need to be fine-tuned specifically for tool-use to handle the increased complexity.

### LiveMCP-101
*   **Methodology:** Tests agents against *live*, dynamic services (not just static mockups).
*   **Result:** High-end models (like GPT-4o, Claude 3.5 Sonnet) perform significantly better at navigating complex, multi-step tool chains than smaller models.

## Optimization Best Practices

1.  **Limit Context:** Don't dump 50 tools into the context. Use "router" agents to select the right toolset.
2.  **Use Summarization:** Have an intermediary step that summarizes tool outputs before adding them to the conversation history.
3.  **Prefer Code Mode:** For data-heavy tasks, always prefer agents that can write and execute code over those that just make API calls.
