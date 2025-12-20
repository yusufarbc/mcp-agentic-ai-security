# FastMCP Character Counter Example

This is a minimal example of an MCP server using the `fastmcp` library. It exposes a single tool `count_a` that counts the number of occurrences of the letter "a" in a given text.

## Prerequisites

- Python 3.10+
- `pip`

## Installation

1. Navigate to this directory:
   ```bash
   cd mcp-examples/fastmcp-example
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

You can run the MCP server in two ways:

### 1. Using the `fastmcp` CLI (Recommended)

```bash
fastmcp run server.py
```

This will verify the server starts and is ready for connections.

### 2. Running as a Python Script

```bash
python server.py
```

## Testing with MCP Inspector

To interact with the tool, you can use the official MCP Inspector. If you have `npx` (Node.js) installed:

```bash
npx @modelcontextprotocol/inspector fastmcp run server.py
```

This will open a web interface where you can see the `count_a` tool and execute it.
