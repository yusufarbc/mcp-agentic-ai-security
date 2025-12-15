# PowerShell script to update all documentation pages with Bootstrap structure

$pages = @{
    "overview.html"                     = "Model Context Protocol: Overview"
    "architecture.html"                 = "MCP Architecture & Mechanics"
    "security-and-governance.html"      = "Security & Governance in the MCP Ecosystem"
    "performance-and-optimization.html" = "Performance & Optimization"
    "use-cases-and-ecosystem.html"      = "Use Cases & Ecosystem"
    "insights-and-future.html"          = "Insights & Future Outlook"
    "literature-review.html"            = "Literature Review & Academic Gap Analysis"
}

$navLinks = @"
<li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
<li class="nav-item"><a class="nav-link" href="overview.html">Overview</a></li>
<li class="nav-item"><a class="nav-link" href="architecture.html">Architecture</a></li>
<li class="nav-item"><a class="nav-link" href="security-and-governance.html">Security</a></li>
<li class="nav-item"><a class="nav-link" href="performance-and-optimization.html">Performance</a></li>
<li class="nav-item"><a class="nav-link" href="use-cases-and-ecosystem.html">Use Cases</a></li>
<li class="nav-item"><a class="nav-link" href="insights-and-future.html">Insights</a></li>
<li class="nav-item"><a class="nav-link" href="literature-review.html">Literature</a></li>
"@

foreach ($page in $pages.Keys) {
    $title = $pages[$page]
    $content = Get-Content $page -Raw -Encoding UTF8
    
    # Extract body content (everything between <body> and </body>)
    if ($content -match '(?s)<body>(.*?)</body>') {
        $bodyContent = $matches[1]
        
        # Extract main content (remove old nav and structure)
        $bodyContent = $bodyContent -replace '(?s)<header>.*?</header>', ''
        $bodyContent = $bodyContent -replace '(?s)<nav>.*?</nav>', ''
        $bodyContent = $bodyContent -replace '(?s)<div class="doc-nav">.*?</div>', ''
        $bodyContent = $bodyContent -replace '<main>', ''
        $bodyContent = $bodyContent -replace '</main>', ''
        
        # Create new page structure
        $newContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title - MCP Agentic Security Review</title>
    
    <!-- Bootstrap CSS (Local) -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light sticky-top">
        <div class="container">
            <a class="navbar-brand gradient-text" href="index.html">MCP Agentic Security Review</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    $navLinks
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container my-5">
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">$title</li>
            </ol>
        </nav>

        <article class="card">
            <div class="card-body p-4 p-md-5">
                $bodyContent
            </div>
        </article>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p class="mb-0">
                This repository serves as an academic resource for MCP security research. All content is maintained in English
                and follows IEEE/ACM academic standards.
            </p>
        </div>
    </footer>

    <!-- Bootstrap JS Bundle (Local) -->
    <script src="js/bootstrap.bundle.min.js"></script>
</body>
</html>
"@
        
        Set-Content -Path $page -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "✓ Updated: $page"
    }
}

Write-Host "`n✅ All documentation pages updated successfully!"
