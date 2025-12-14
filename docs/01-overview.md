# Model Context Protocol (MCP): Overview

## Introduction: The "USB-C for AI"

The Model Context Protocol (MCP) is an open standard that enables AI models to securely and efficiently interact with external tools and data resources. It serves as a "universal translator" or connector, similar to a USB-C port, allowing any AI application (the "host") to connect with any external tool or data source (the "server") without needing custom integrations for each pair.

This standardization transforms AI agents from passive text generators into active, autonomous participants in workflows, capable of reading files, querying databases, and executing complex tasks in the real world.

## The Challenge: The "N×M" Integration Problem

Before MCP, the AI landscape was fragmented. Integrating AI agents with external tools presented a combinatorial challenge:

*   **N** Agents (e.g., Claude, ChatGPT, IDE assistants)
*   **M** Data Sources/Tools (e.g., Google Drive, Slack, PostgreSQL, GitHub)

Without a standard, developers had to build **N × M** unique connectors. This resulted in:
*   **High Maintenance:** Every API change broke integrations.
*   **Silos:** Tools built for one platform didn't work on another.
*   **Inefficiency:** Redundant work stifled innovation.

**MCP solves this by creating a shared language.** Developers build an MCP server for their tool *once*, and it instantly works with any MCP-compliant client (agent).

## Core Primitives

MCP defines three primary mechanisms ("primitives") for interaction:

| Primitive | Controlled By | Description | Example |
| :--- | :--- | :--- | :--- |
| **Tools** | **Model** | Executable functions that allow the AI to *act*. The model decides when to call a tool to perform a specific task. | `send_email`, `query_database`, `create_github_issue` |
| **Resources** | **Application** | Read-only data sources that provide *context*. The application exposes these for the model to read. | Database schemas, file contents, API response logs |
| **Prompts** | **User** | Pre-defined templates and workflows that standardize common interactions for users. | "Analyze this codebase", "Summarize recent logs" |

## MCP vs. Traditional APIs

While traditional REST APIs are essential for web services, they are not optimized for autonomous agents. MCP introduces key differences:

1.  **Stateful Sessions:** Unlike stateless REST APIs, MCP maintains a connection session. This allows the server to manage context, reducing the need for the agent to re-send mostly static information with every request.
2.  **Dynamic Discovery:** Agents can query an MCP server to "discover" what tools and resources are available at runtime. This enables "progressive disclosure," where an agent learns about a system's capabilities as needed.
3.  **Bidirectional Communication:** MCP allows servers to send notifications to clients (e.g., "Resource Updated"), enabling real-time, event-driven workflows that are difficult to achieve with standard request-response models.

## Strategic Value

Adopting MCP moves the industry from a fragmented ecosystem of bespoke connectors to a scalable, interoperable infrastructure. It allows:
*   **Tool Builders** to write one integration that works everywhere.
*   **Agent Developers** to access a vast library of pre-built tools.
*   **Enterprises** to securely govern AI access to internal data.
