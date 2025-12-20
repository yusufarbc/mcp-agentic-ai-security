from fastmcp import FastMCP

# Initialize the FastMCP server
mcp = FastMCP("char-counter")

@mcp.tool()
def count_a(text: str) -> int:
    """
    Counts the number of times the character 'a' (case-insensitive) appears in the given text.
    
    Args:
        text: The text to analyze.
        
    Returns:
        The count of 'a' characters.
    """
    return text.lower().count('a')

if __name__ == "__main__":
    # This allows running the server directly
    mcp.run()
