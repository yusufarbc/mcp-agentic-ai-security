> Auto-extracted plain text from [`06_rest_apis_to_mcp.pdf`](./06_rest_apis_to_mcp.pdf) via `pdftotext`. Tables, figures, and multi-column layout are not preserved here â€” consult the PDF for those.

Making REST APIs Agent-Ready: From OpenAPI to MCP Servers for Tool-Augmented LLMs

arXiv:2507.16044v3 [cs.SE] 10 Sep 2025

Meriem Mastouri
University of Michigan - Flint USA
meriemm@umich.edu

Emna Ksontini
University of North Carolina Wilmington USA
ksontinie@uncw.edu

Wael Kessentini
DePaul University USA
wkessent@depaul.edu

Abstract
Large Language Models (LLMs) are increasingly evolving from passive text generators into active agents that can perform realworld tasks by invoking external tools. To support this shift, scalable protocols for tool integration are essential. The Model Context Protocol (MCP), introduced by Anthropic in late 2024, offers a schema-driven standard for dynamic tool discovery and invocation. Yet, building MCP servers remains manual and repetitive, requiring developers to write glue code, handle authentication, and configure schemas by hand, replicating much of the integration effort MCP aims to eliminate.
This paper investigates whether MCP server construction can be meaningfully automated. We begin by analyzing adoption trends: from over 22,000 MCP-tagged GitHub repositories created within six months of release, fewer than 5% include servers, typically small, single-maintainer projects dominated by repetitive scaffolding. To address this gap, we present AutoMCP, a compiler that generates MCP servers from OpenAPI 2.0/3.0 specifications. AutoMCP parses REST API definitions and produces complete server implementations, including schema registration and authentication handling. We evaluate it on 50 real-world APIs spanning 5,066 endpoints and more than 10 domains. From a stratified sample of 1,023 tool calls, 76.5% succeeded out-of-the-box. Manual failure analysis revealed five recurring issues, all attributable to inconsistencies or omissions in the OpenAPI contracts. After minor fixes, averaging just 19 lines of spec changes per API, AutoMCP achieved 99.9% success.
Our findings (i) analyze MCP adoption and quantify the cost of manual server development, (ii) demonstrate that OpenAPI specifications, despite quality issues, enable near-complete MCP server automation, and (iii) contribute a corpus of 5,066 callable tools along with insights on repairing common specification flaws. These results shift the adoption bottleneck from code generation to specification quality, offering a path toward LLM-native tool ecosystems.
Keywords
Model Context Protocol, LLM, Automation, REST API, OpenAPI
Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. Copyrights for components of this work owned by others than the author(s) must be honored. Abstracting with credit is permitted. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee. Request permissions from permissions@acm.org. Conference'17, Washington, DC, USA © 2025 Copyright held by the owner/author(s). Publication rights licensed to ACM. ACM ISBN 978-x-xxxx-xxxx-x/YYYY/MM https://doi.org/10.1145/nnnnnnn.nnnnnnn

ACM Reference Format: Meriem Mastouri, Emna Ksontini, and Wael Kessentini. 2025. Making REST APIs Agent-Ready: From OpenAPI to MCP Servers for Tool-Augmented LLMs. In . ACM, New York, NY, USA, 11 pages. https://doi.org/10.1145/ nnnnnnn.nnnnnnn
1 Introduction
Large Language Models (LLMs) have rapidly evolved from passive text generators into capable agents that can reason, plan, and interact with external systems [1, 2]. Recent advances in LLM applications have enabled models to autonomously use tools, call functions, and perform complex tasks such as executing workflows, configuring infrastructure, and retrieving real-time data through natural language interfaces [3, 4]. This emerging paradigm, often referred to as tool-augmented or agentic LLMs, has made models much more useful in domains such as operations, analytics, and software automation.
However, integrating external tools into LLM workflows remains a major engineering bottleneck. Most existing systems rely on manually integrated APIs, where functionality is either hardcoded into agent logic or exposed through static prompt annotations [3­5]. This limits scalability and reuse. The barriers to integration include extracting API schemas, writing handler functions, configuring authentication, and curating model-facing descriptions for each tool [6, 7]. These steps are labor-intensive and must be repeated for every new service or deployment, leading to brittle and ad hoc systems.
To address these limitations, Anthropic recently introduced the Model Context Protocol (MCP) [8], a standardized interface designed to decouple model logic from tool implementations. Inspired by the Language Server Protocol (LSP), MCP adopts a schema-driven, JSON-RPC-based architecture in which tools are encapsulated as MCP servers. These servers declare their capabilities through structured schemas, enabling LLMs (as clients) to dynamically discover, invoke, and orchestrate tool behavior without manual glue code or hardcoded prompts. MCP promises to streamline the integration of real-world APIs into LLM workflows by providing a modular, dynamic, and declarative interface for tool use.
Despite its promise, MCP adoption in practice remains constrained by a critical bottleneck: while the protocol itself is standardized, the process of constructing MCP servers from real-world APIs remains manual. Developers must still translate REST endpoints into handler logic, define schemas, manage authentication flows, and expose the resulting server via MCP's conventions. This work is not only repetitive but also undermines MCP's original goal of scalable integration. While a small number of MCP servers,

Conference'17, July 2017, Washington, DC, USA
such as those listed in trusted catalogs like Docker's official MCP catalog do exist [9], they are limited in number (around 100 as of mid-2025), support only a narrow subset of endpoints, and offer no support for customization or user-defined configuration. Public aggregators like mcp.so [10] index a much larger set of servers, but the vast majority are community-contributed and lack sufficient transparency, version control, or provenance, raising concerns around trust, correctness, and security. These limitations affect both sides of the ecosystem: developers seeking to integrate existing APIs into agent workflows, and API providers wishing to expose their services through MCP in a reliable and up-to-date manner. In both cases, the lack of scalable tooling often results in ad hoc, manually constructed servers. Meanwhile, there is little empirical understanding of how MCP is being adopted or whether this server construction process can be meaningfully automated [11]. To the best of our knowledge, no peer-reviewed work has yet analysed MCP adoption or proposes a systematic approach to MCP server generation.
In this paper, we address both of these gaps. First, we conduct a large-scale empirical study of MCP server adoption and implementation effort. By mining GitHub, we identify 22,722 MCP-tagged repositories created in the six months following MCP's release. Of these, only 1,164 contain functional server implementations, typically small single-maintainer codebases with low churn and considerable boilerplate, highlighting the engineering cost of manual MCP development. Second, we explore whether this process can be automated from existing API specifications.
To that end, we introduce AutoMCP, a compiler that automates the generation of MCP-compatible servers from structured REST API definitions. AutoMCP takes as input an OpenAPI specification, a widely adopted machine-readable format for describing REST APIs, including their endpoints, authentication schemes, and request / response schemas, and outputs a fully functional MCP server implementation. The generated server includes, runtime schemas, environment-based authentication handling, and all required server-side scaffolding.
To assess the feasibility of this automation pipeline, we evaluate AutoMCP on 50 diverse public APIs across a variety of domains and authentication regimes. These APIs, described via OpenAPI 2.0 or 3.0 specifications, collectively expose over 5,000 endpoints. We analyze AutoMCP's coverage, identify the causes of failure when generation is incomplete, and measure the effort required to repair flawed input specifications.
This work makes the following contributions:
· We provide the first empirical study of MCP adoption, analyzing 22,722 GitHub repositories and quantifying the development characteristics of 1,164 functional MCP servers.
· We present AutoMCP, a compiler that automates MCP server generation from OpenAPI-specified REST APIs, supporting multiple authentication schemes and schema formats.
· We evaluated AutoMCP on 50 real-world APIs and identified 5 recurring failure modes that prevent full automation, all attributable to incomplete or inconsistent OpenAPI specifications.
Replication Package. All materials are available at [12].

Meriem Mastouri, Emna Ksontini, and Wael Kessentini
2 Background and Related Work
Tool augmentation has expanded the capabilities of LLMs beyond static generation. Early extensions to LLM functionality were largely prompt-based. ReAct [1], for example, instructed models to interleave reasoning and actions by emitting structured natural language. While effective in constrained settings, such approaches are brittle: they lack schema enforcement and often suffer from formatting errors during tool invocation.
To address these shortcomings, researchers introduced structured function calling mechanisms. OpenAI's function-calling API [13] allows models to produce well-formed JSON arguments validated against declared schemas. Building on this, frameworks such as LangChain [14] and AutoGPT [15] support agentic architectures with planning, memory, and multi-step workflows. Despite these advances, most systems still rely on static tool definitions that are manually inserted into the prompts or hardcoded at initialization, limiting flexibility and scalability [3, 4].
Recent efforts have explored retrieval-augmented tool use, in which models retrieve tool descriptions or documentation at runtime to guide invocation [4, 16]. While promising, such approaches typically assume clean, complete documentation and require nontrivial engineering to bridge retrieved metadata with executable function calls.
To move beyond static and retrieval-based integration, Anthropic introduced the Model Context Protocol (MCP) [8]. MCP defines a schema-driven, transport-agnostic protocol for dynamic tool discovery and invocation by LLMs. It decouples agent logic (MCP clients such as Claude) from tool implementations (MCP servers) through a lightweight, bidirectional JSON-RPC interface. Tools can be dynamically registered, advertised, and invoked at runtime without needing to embed their schemas directly into prompts. MCP enables modular composition of tools in multi-agent settings, complementing broader orchestration standards such as Google's Agent-to-Agent (A2A) protocol [17].
Despite its architectural strengths, the process of building MCP servers remains manual and error-prone. Industry interest in automating MCP server generation is growing, with tools like Postman's MCP generator emerging as early solutions [18]. However, the tool is limited in scope: it only accepts Postman Collections as input, and assumes well-maintained, collection-specific metadata. It lacks support for schema dereferencing, parameter resolution, and robust authentication handling, often requiring manual refinement to produce usable MCP servers.
A natural foundation for automating this process is the OpenAPI specification format [19], which has become the de facto standard for documenting REST APIs. OpenAPI provides machine-readable descriptions of endpoints, input parameters, response structures, and authentication flows. Originally designed to support client SDK generation and documentation rendering, OpenAPI has recently attracted attention for its potential in enabling automated API interaction.
However, empirical studies have identified widespread quality issues in OpenAPI specifications. Serbout and Pautasso [20] note that versioning metadata is often inconsistently encoded, complicating client generation. Di Lauro et al. [21] observe that many APIs neglect deprecation annotations, reducing long-term maintainability.

Making REST APIs Agent-Ready: From OpenAPI to MCP Servers for Tool-Augmented LLMs

Conference'17, July 2017, Washington, DC, USA

Lercher et al. [22] identify frequent omissions of authentication metadata and underspecified data schemas, which hinder automated tooling. Muñoz Hurtado et al. [23] extend this line of work by analyzing over 900,000 OpenAPI documents and finding that 62% lack any form of security documentation. They also show that even when security schemes are declared, they are often applied globally, missing the operation-level granularity required for robust invocation logic. Nguyen et al. [24] further report that 43% of public APIs show mismatches between documented and actual behavior, while Pradel et al. [25] show that subtle semantic API changes often break downstream consumers.
A number of recent tools aim to bridge LLMs with REST APIs through specification-based integration [3][5][26][27]. ToolLLM[27], for example, fine-tunes LLMs to generate valid REST API calls using OpenAPI documentation, but its focus remains on crafting wellformed request payloads rather than producing executable infrastructure or addressing server-side concerns such as authentication and runtime schema registration. APIBank[5], while valuable as a benchmark dataset, assumes idealized specifications and targets question-answering scenarios rather than end-to-end invocation or deployment. Similarly, REST-GPT [3], as shown in Table 1, enables LLMs to plan over documented REST APIs, evaluating its approach on 2 real-world APIs, but it relies on static tool descriptions and does not generate dynamic server components. Collectively, these systems underscore the growing interest in automating LLM­API interaction, yet they stop short of addressing the engineering challenges required to deploy standards-compliant, dynamically invocable tool interfaces.
Table 1: Comparison of REST-GPT and AutoMCP.

System

MCP-Compatible # APIs (Supported) # APIs (Evaluated) Extensibility

OpenAPI-Based

REST-GPT [3]

No

100

2 (TMDB, Spotify) Manual integration Partial (manually preprocessed)

AutoMCP

Yes

Any API (with OpenAPI)

50

Fully automatic

Full (fully automated)

In contrast, our work addresses the challenge of automating server-side infrastructure for tool-augmented LLMs, rather than focusing on client-side invocation or agent planning. By bridging LLM-native tool invocation protocols with real-world API contracts, our approach advances the state of automation in both directions: reducing integration effort for developers and expanding the reach of LLMs in practical tool use.
3 STUDY DESIGN
This section outlines the design of our study that investigates the practicality and efficiency of automating MCP server generation from REST APIs. We describe our research questions, dataset construction, tool pipeline, and our sampling approach.
3.1 Research Questions
Our study is structured around the following research questions, summarized in Figure 2.
RQ1: How prevalent is MCP in open-source projects soon after its release, and what development effort is required to implement a typical MCP server? The motivation behind RQ1 is twofold. First, although conference talks, blog posts, and social-media threads assert that MCP is "taking off" [28], such

claims remain anecdotal; without a quantitative baseline, it is impossible to reason about the protocol's actual impact or to prioritise tooling and research investments. Second, we must establish whether building MCP servers still demands enough repetitive, labour-intensive effort to justify automation.
Our analysis begins with every public GitHub repository created between 1 January and 30 April 2025 whose metadata or source tree references MCP. From this population we identify a subset of repositories that implement at least one MCP server endpoint. Plotting repository-creation timestamps as a monthly time series allows us to observe adoption velocity during the protocol's formative phase.
To characterise development efforts we analyse each confirmed server along three dimensions that capture complementary facets of software development. Code size, measured as non blank, non comment source lines across all languages using the standard sloc tool, approximates the volume of handcrafted artefacts a maintainer must create and sustain. Team structure is described by two statistics: the count of unique contributors and the Gini coefficient of commit frequencies [29]. The former gauges the breadth of participation, while the latter indicates how evenly or unevenly work is distributed; a Gini value approaching one signals a single-maintainer burden, whereas a value near zero reflects collaborative balance. Development intensity is quantified as code churn, which is the aggregate of added and modified lines, normalized by the number of months between a project's first and last commit. This normalization controls for project age, enabling fair comparison between newly created and longer-lived repositories. Because these three dimensions distributions are strongly skewed, we report medians and median absolute deviations rather than means, and attach ninety-five-percent bootstrap confidence intervals based on ten thousand resamples to convey statistical uncertainty. We further compute Spearman's [30] rank-order correlation to probe relationships among developement effort variables.
RQ2: To what extent can real-world OpenAPI specifications be compiled into fully functional MCP servers? MCP servers translate each REST operation into a callable JSON-RPC tool whose identifier, input schema, and output schema mirror the corresponding HTTP verb, parameters, and success response. OpenAPI specifications already describe these artefacts in a fully declarative form, including authentication flows and reference resolution. Yet, as RQ1 has shown, today's practitioners still implement each tool by hand, repeating boiler-plate code for parameter parsing, header injection, request forwarding, and response formatting. This redundancy motivates our RQ2.
To address RQ2, we built AutoMCP, a Python compiler that transforms OpenAPI 2.0 and 3.0 specifications into deployable MCP servers. AutoMCP resolves $ref links, generates JSON-Schema definitions for inputs and outputs, registers every operation as an MCP tool, configures the appropriate authentication middleware, and emits the runtime logic needed to translate JSON-RPC calls into outbound HTTPS requests and back, all while adhering to Anthropic's reference runtime conventions.
We first generated an MCP server for each of the 50 APIs, turning every one of the 5 066 endpoints into an MCP tool; because exercising every tool would be infeasible, we then applied the stratified sampling strategy detailed in subsection 3.4. The methodology for executing and validating these sampled tools (i.e, endpoints) is

Conference'17, July 2017, Washington, DC, USA

Meriem Mastouri, Emna Ksontini, and Wael Kessentini

described in detail in subsection 3.5. This evaluation allows us to quantify AutoMCP's general effectiveness and to assess whether OpenAPI specifications, as found in the wild, contain sufficient structure and semantic detail to enable reliable end-to-end automation.
Complementing the large-scale tool-execution study, a focused baseline assessment was conducted on a 17 APIs whose vendors already maintain a production MCP server. For each of these specifications the official mcp implementation and the corresponding AutoMCP artefact were examined side by side. An automated script harvested two complementary measures: functional coverage, recorded as the count of distinct (method, path) pairs exposed as callable tools and implementation size, measured in source lines of code via SLOC.
To enrich these quantitative findings, we undertook a qualitative analysis of the highest-starred reference implementation, the vendor-maintained GitHub MCP server.
RQ3: Which recurring gaps in real-world OpenAPI specifications most often break AutoMCP's generation pipeline? While RQ2 showed that AutoMCP produced runnable servers for most of our evaluation corpus, 240 endpoints of the 1023 executed (approximately 23%) failed during the evaluation. Pinpointing the exact specification defects responsible for these failures is critical both for improving AutoMCP and for understanding the real-world quality of publicly available OpenAPI contracts.
To answer RQ3, we subjected every one of the 228 failing endpoints to a qualitative analysis. Three authors independently inspected server logs, Claude traces, and HTTP transcripts, assigning a provisional root-cause label to each failure (e.g.,missing parameter, mis-typed security scheme). A reconciliation session merged overlapping labels into a shared taxonomy; Cohen's  = 0.84 indicates substantial agreement. Each failure was then re-labelled once under this taxonomy. Finally, to gauge fixability, an author applied the minimal viable patch to each offending OpenAPI document, recorded the lines changed (LoCfix), regenerated the server, and re-executed the failing call.
3.2 Data Collection
For RQ1, We began by mining every public GitHub repository created between 1O october 2024 and 31 April 2025 whose metadata contained the string model-context-protocol. The initial query, executed via the GitHub REST API, returned 22 722 repositories.
To isolate high-confidence MCP servers we applied four language sensitive checks based on (i) Dependency. A project must declare an MCP runtime: fast-mcp for Node.js; an mcp requirement for Python; a mcp-server stanza in Cargo.toml for Rust; or, for Go, a go.mod reference to https://github.com/llmcontext/gomcp. (ii) Serve loop. We check for explicit long-running handler used to start servers such as uvicorn.run, app.listen, axum::Server, or http.ListenAndServe. Only projects meeting both two criterias enter the corpus.
Applying all four filters leaves 1 164 repositories that contain at least one functional MCP server implementation.
For RQ2-RQ3 To evaluate AutoMCP we started from two public collections of OpenAPI3 contracts, APIs.guru[31] and the Konfig[32]

Algorithm 1: AutoMCP: OpenAPI  MCP server

Require : OpenAPI spec spec, output dir Dout

1 A. Parse Inputs 2 let (,  )  ParseCLI() 3 let   LoadSpec( ) ;

// parse CLI options // load YAML/JSON

4 B. Preprocess Spec

5 let   NormaliseVersion( ) ;

// unify version

6 let    InlineRefs() ;

// resolve $refs

7 ValidateSpec(   ) ;

// abort if malformed

8 C. Handle Authentication 9 let   ExtractSecurity(   ) ; 10 let   BuildEnvMap( ) ; 11 if RequiresOAuth2( ) then 12 GenerateOAuth2(,  ) ;

// extract auth types // map secrets
// OAuth handler

13 end

14 D. Generate Server Stub 15 let   InitContext(, , ) ; 16 if HasExtraHeaders() then 17 HandleExtraHeaders(, )

// init buffers // inject header

18 end

19 foreach (, )   do

20 let   ExtractParams(, ) ;

// extract params

21 let   SanitiseNames( ) ; // ensure python-safe

names

22 let   CreateHandler(, , , ,  ) // create route

23 let   GenerateSchema(, ) ;

// create schema

24 RegisterEndpoint(, ,  ) ;

// register route

25 end

26 E. Write Output Artifacts 27 WriteEnvFile(,  ) ; 28 SaveGenerated(,  ) ;

// generate .env // write code to disk

datasets. After deduplicating and discarding syntactically invalid files, 3 784 unique, machine-readable contracts remained.
Because manual assessment does not scale to thousands of APIs, we drew a stratified sample using only attributes that can be computed automatically: (1) Authentication scheme. Four buckets: none, API key, bearer/basic, OAuth 2.0. (2) Size. We partitioned the empirical endpoint-count distribution into three natural ranges: 20 (small), 21-100 (medium), and > 100 (large). The two cut-points correspond to the 30th and 85th percentiles of the population distribution and can be reproduced from our replication scripts.
Random sampling without replacement continued until every {auth,size} cell contributed at least one contract and the overall budget of 50 specifications was reached. The final mix comprised 17 small, 20 medium, and 13 large APIs covering the full spectrum of auth schemes.
3.3 AutoMCP: Compiling OpenAPI into an MCP Server
As shown in algorithm 1, AutoMCP is a static code generator that compiles an OpenAPI 2.0 or 3.0 specification into a complete, executable MCP server stub. Each endpoint in the input specification is transformed into a callable MCP tool, enabling LLM clients to invoke external REST APIs via the Model Context Protocol (MCP). AutoMCP is designed for reproducibility and minimal developer intervention: it accepts a specification, performs one-pass

Making REST APIs Agent-Ready: From OpenAPI to MCP Servers for Tool-Augmented LLMs

Conference'17, July 2017, Washington, DC, USA

offline compilation, and outputs a ready-to-run Python project with
environment-based configuration.
The toolchain proceeds through six key phases: Step 1: Input parsing and dialect resolution. AutoMCP begins by parsing command-line arguments to locate the input spec
and output path. It automatically detects the spec format (YAML or
JSON) and dialect (OpenAPI 2.0 or 3.0) by inspecting top-level fields. For OpenAPI 2.0, the base URL is composed from schemes, host, and basePath; for OpenAPI 3.0, the first entry in servers is used. This base URL is later injected into all generated tool handlers.
Step 2: Spec normalization and flattening. All $ref references are recursively resolved to produce a fully inlined version
of the spec. AutoMCP also performs structural normalization to
reconcile differences between OpenAPI versions, sanitize identi-
fiers, and fix common inconsistencies (e.g., duplicate operation IDs,
undefined path parameters). Step 3: Authentication analysis and .env generation. De-
clared security schemes (e.g., API key, HTTP Basic, Bearer token,
OAuth2) are parsed and mapped to environment variables. AutoMCP generates a template .env file in the output directory, providing placeholders for all required tokens, secrets, and creden-
tials. If an OAuth2 flow is detected, AutoMCP additionally emits a Flask-based oauth_login_server.py, which handles the login and callback steps, retrieves access tokens, and writes them into the .env file.
Step 4: Stub generation and handler synthesis. Every endpoint is compiled into a Python handler function decorated with @mcp.tool(...), conforming to Anthropic's MCP runtime conventions. Handlers validate input, inject authentication headers or
query parameters, construct and dispatch HTTP requests using requests, and return the parsed response or raw fallback. When the EXTRA_HEADERS environment variable is set, AutoMCP automatically injects logic to parse a JSON string from the environment
and merge it into all HTTP requests, enabling API-specific header
customizations. Step 5: Output layout and transport configuration. All gen-
erated files are written to the specified output directory, including server_stub.py, .env, and optionally oauth_login_server.py. The stub is executable as a standalone MCP server and uses the method fastmcp.run(transport="stdio") as its default communication mechanism. No manual editing is required to begin serving
tools. End-to-End Illustration (Trello API) To demonstrate a complete user-to-API round-trip we compile
Trello's public OpenAPI contract with AutoMCP. The compiler translates every Trello endpoint (e.g. create_card, list_boards) into an MCP tool and emits a runnable stub.Because Trello authenticates with an API key + token, the stub's .env template contains the variables TRELLO_API_KEY and TRELLO_API_TOKEN; no OAuth callback server is needed.
Client configuration. Claude (desktop edition v2025.6) is instructed
to launch the stub as a local MCP server; Listing 1 shows the mini-
mal JSON entry. Runtime flow. At startup Claude issues get_capabilities, re-
ceives the manifest, and validates each tool schema. When the user says "Create a bug card in Trello," Claude selects the create_card

{ "mcpServers": { "trello": { "command": "python", "args": ["path/to/server_stub.py"] } }
}
Listing 1: Claude configuration for the Trello MCP server.
tool, fills the input JSON (board ID, list ID, card name), and sends a tool_call.The stub injects credentials from .env, dispatches a signed POST 1cards to Trello, and returns the card URL. Claude converts that structured result into natural-language feedback for
the user (Figure2).

Trello MCP Server
get_capabilities () Tools & Schema

Load Tools

Start Interactive Dialogue

"Read boards
and create ..."

{"tool":"create_card" ,"arguments":
{"name":"Bug 123,..}}

"I've Succesfully ..."

{"url":"https://trello .com/c/A14", ...}

POST/1/cards? key=$KEY & token=$TOKEN
{"url":"https://trell o.com/c/A14", ...}

Figure 1: End-to-end message flow for Trello card creation mediated by Trello MCP server ( created using AutoMCP.)

3.4 Sampling Methodology
Our benchmark comprises fifty publicly documented REST APIs. To balance completeness, structural diversity, and the practical limits of human-in-the-loop testing, we employ a two-stage sampling strategy inspired by resource-centric frameworks such as Restler[33] and the structural-coverage principles in Restats[34].
Stage1: Exhaustive coverage for small and medium APIs. Seventeen specifications (17/50) expose at most 20 operations; for each of these we exercise every endpoint. After discarding endpoints that require premium subscriptions or geo-restricted credentials, this stage contributes 148 executable requests.
Stage2: Stratified sampling for large APIs. The remaining (33/50) APIs belong to specifications that exceed 20 operations. Full enumeration here is infeasible, so we sample by resource group. Each specification is first partitioned by the first semantic path segment (e.g. /users, /repos), mirroring Restler's resource decomposition. Within every group we assign a diversity score

Conference'17, July 2017, Washington, DC, USA

Meriem Mastouri, Emna Ksontini, and Wael Kessentini

Github

23K MCP-tagged Projects

-Monthly Growth

1k MCP Server

-Code Size -Team Structure -Development intensity

1) Authentication scheme 2) Size

AutoMCP
- stub files - .env files

50 OpenAPI Spec 5 070 endpoints

If Count(Server Tools ) 20

50 Servers 5 070 Tools

17 Servers 148 Tools
33 Servers 4 922 Tools

Else

1 - Partition into Resource groups 2 - Compute scores 3 - Greedy Sélection

Official MCP servers
17 Servers Pairs

-Code Size

50 Servers 1033 Tools

33 Servers 875 Tools

783 Success 240 Failed

Figure 2: Approach overview and addressed RQs (RQ1: Green arrows, RQ2: Blue arrows, and RQ3: Red arrows)

 () = 1verb + 1auth + 1params
To each endpoint : an endpoint earns one point for introducing a previously unseen HTTP verb, one for a new authentication scheme, and one for a novel parameter modality (path/query/header/body). A greedy pass selects the highest-scoring endpoints until every axis in the group is covered at least once. We then discard any endpoint whose invocation requires premium subscriptions or geo-restricted credentials, leaving 875 executable operations.
Combining the 148 exhaustively tested endpoints from Stage1 with the 875 stratified samples from Stage2 produces an evaluation set of 1023 distinct, executable REST operations (i.e. , tools).
3.5 Evaluation of AutoMCP
As described in Section 3.4, we apply stratified sampling to select a representative subset of 1,030 endpoints for our 50 benchmark APIs. Each sampled endpoint corresponds to one generated MCP tool, and these tools form the evaluation set. We use Claude [35] as our MCP client, as it does not impose a limit on the number of tools that can be loaded. In contrast, other clients such as Cursor enforce a cap of 40 tools, which restricts our ability to evaluate the full range of APIs in our dataset.
We first test whether each AutoMCP server loads successfully in Claude's MCP client (configuration example in 1); servers that fail this step are excluded from further evaluation. Once the manifest is loaded successfully, evaluation proceeds to tool-level execution. Because many tools depend on state established by other tools (e.g., creating a resource before accessing or updating it), tool order is non-trivial.To construct a valid call sequence, we use GPT-4 to order the sampled tools (i.e, endpoints) based on their logical dependencies, following recent practice in REST API testing [36, 37]. The input to the model is a list of endpoints names and descriptions derived from the MCP manifest. GPT-4 produces a plan that respects logical dependencies and groups operations in a semantically valid order. The assigned author manually inspects and, where necessary, revises the order to correct any dependency omissions.
After loading the manifest and finalizing the tool order, authors proceed to test each tool individually. Each of the 50 APIs is assigned to one of three authors (16, 17, and 17 APIs respectively). Using Claude's native interface, the author selects each tool from

the loaded manifest and invokes it using a short natural-language prompt. The prompts follow a consistent pattern: they name the tool to be called, provide valid input values, and describe the expected behavior or observable result. For example: "Use create_board to create a new board named `Design Tasks' and then verify it using list_boards." Prompts are kept minimal to focus the evaluation on MCP server behavior rather than LLM reasoning.
A tool is considered successful if it satisfies three criteria. First, it must appear in the manifest and load without error in Claude's MCP client. Second, the tool must execute successfully, returning a success HTTP status codes from the upstream API. Third, the tool must perform the expected operation, this is verified by inspecting the result (for read operations) or checking a follow-up state query (for write operations). For instance, if a create_task tool is called, the evaluator follows up with a list_tasks or get_task call to verify the presence of the new resource.
Authors were instructed to report and retain all observed failures, with one defined exception. If a tool failed due to unmet prerequisites, such as attempting to invoke add_card before a board had been created or if a required tool call was missing from the execution sample, the evaluator corrected the order or invoked the missing tool and re-executed the sequence. In many cases, Claude detected and resolved such dependencies automatically by calling prerequisite tools. When it did not, the correction was made manually and logged. All other types of issues, were preserved in the results and counted as failures.
To ensure evaluation consistency, 10% of sampled tools were reevaluated independently by a second author. Each author executed their assigned tools in isolation and followed the same input, prompt structure, and success criteria. Inter-rater agreement, measured using Cohen's , was 0.81, indicating substantial consistency in labeling outcomes.
For every tool, we recorded the input values, HTTP response codes, observable results, and success/failure labels. All logs, prompts, and request/response data are included in our replication package.

Making REST APIs Agent-Ready: From OpenAPI to MCP Servers for Tool-Augmented LLMs

Conference'17, July 2017, Washington, DC, USA

4 Results 4.1 RQ1: MCP Adoption and Development Costs
Interest in MCP surged after the reference SDK, yet only a small lower-bound subset exposes server code. GitHub registered 22.722 repositories that reference MCP between 1 October 2024 and 30 April 2025. The monthly trend in Figure 3 exhibits three phases: a muted launch period, a sharp inflection after Anthropic released its reference SDK in mid-December 2024, and a second surge tied to a popular tutorial series in February 2025. Summary statistics in Table 2 place the median growth rate at 2.360 new projects per month (IQR =;1940­3400; 95% bootstrap CI=;2220­2510). To minimise false positives we applied a deliberately high-precision filter that retains 1.164 repositories, roughly 5% of the original corpus, that expose at least one MCP-server endpoint. Because the filter favours precision over recall, this percentage constitutes a conservative lower bound on deployable servers rather than an exhaustive count.
Table 2: Monthly growth of MCP-tagged repositories (Oct 2024 ­ Apr 2025, =22,722).

Statistic
Minimum 25th percentile Median 75th percentile Inter-quartile range Maximum Total (7 months)

Repos / month
8
1 940 2 360 3 400 1 940 ­ 3 400 10 580 22 722

Cumulative MCP Projects

20K 15K 10K 5K 0.0
Oct 2024

Cumulative Growth of MCP-Related Projects

Nov 2024

Dec 2024

Jan 2025 Month

Feb 2025

Mar 2025

Apr 2025

Figure 3: Incremental growth of MCP-related GitHub repositories (Oct 2024 ­ Apr 2025).

MCP servers code bases are modest but exhibit a heavy tail driven by a few very large projects.The effort metrics in Table 3 show that the median validated server contains 920 non-blank, non-comment lines of code (MAD= 480; 95% CI= 810­1050). Although the typical project is small, eight percent of repositories exceed 10 000LoC and together account for 42% of all server-side code, confirming a strongly heavy-tailed size distribution.
Teams are extremely lean and workload is highly concentrated in a single maintainer. Also in Table 3, half of the servers list exactly 1 contributor and three-quarters list no more than 2. Commit activity is markedly unequal: the median Gini coefficient

Table 3: Code size, team structure, and development intensity for the validated MCP servers (=1 164).

Metric

Value

Code size

Median SLOC 90th percentile Share of total SLOC in top 8 %

920 10 580 42 %

Team structure

Median contributors 75th percentile Gini coefficient (commits) Lead-author share of commits Spearman  (contributors, SLOC)

1
2 0.73 ± 0.05
82 % 0.64

Development intensity

Median churn 95 % CI (median churn) Upper-quartile churn Spearman  (churn, SLOC) Partial  (churn, contributors | SLOC)

31 LoC/month 28­34
120LoC/month 0.42 0.09

Notes
MAD = 480 --
Heavy tail
-- -- Median ± MAD Median  < .001
MAD = 18 Bootstrap
--  < .001
n.s.

of commit counts is 0.73 ± 0.05, and the lead author is responsible for 82% of commits. Contributor count correlates strongly with code size (Spearman = 0.64,  < .001), indicating that only the larger projects attract additional help.
Development intensity is low and remains largely independent of team size once project scale is controlled for. According to Table 3, the median added-plus-modified throughput is 31LoC per active month (MAD= 18; 95% CI = 28­34). Churn correlates moderately with code size ( = 0.42,  < .001), yet its partial correlation with contributor count is negligible after adjusting for LoC (partial  = 0.09, ..), suggesting that additional contributors do not, by themselves, accelerate code churn once project scale is held constant.
Finding-1. Among the MCP­tagged repositories created in our window, only 5% contains servers; these servers are small, built by one developer in most cases, and evolve slowly, evidence that current effort is dominated by boiler-plate scaffolding rather than substantive, collaborative engineering.
4.2 RQ2: MCP Auto-Generation from OpenAPI Specifications
AutoMCP generated working tools for 78% of the sampled endpoints, with all remaining failures confined to only 8 of the 50 APIs. As illustrated in Table 4, across the 50 specifications and 1011 sampled endpoints, AutoMCP generated MCP stubs that ompiled, loaded, and executed successfully for 783 endpoints, yielding a raw success rate of 77%. These tools were discoverable by Claude, invoked via JSON-RPC, and produced correct responses. Six APIs (12%) failed at the manifest-load stage, leading to 0 success for those specifications.Because Claude rejects an entire stub when a single top-level error is detected, these faults eliminate all downstream tool execution. Together they account for 88% (212/240) of the observed failures. Three additional APIs loaded successfully but produced call-time errors, totalling 28 failed invocations.

Conference'17, July 2017, Washington, DC, USA

Meriem Mastouri, Emna Ksontini, and Wael Kessentini

Table 4: Automation outcomes for all 50 APIs.
Notes. "LoC" = lines changed in the OpenAPI file. Failure codes= A: Incorrect or missing security schemes; B: Malformed or relative base URLs; C: Undocumented runtime headers and token prefixes; D: Parameter type mismatches; E: Missing Endpoint Authentication; .

API

Auth

Endpoints Success LoC Failure After Fix

Brave Duckduckgo Weather Advice Airtable Firecrawl Jobsoid Adp Exa Exchange_rate Api Guru Dropbox Huggingface Apaleo Notion Petstore Graphhopper

apikey none none none http bearer http bearer none none apikey none none OAuth2 apikey OAuth2 http bearer none+apikey apikey

1

1/1

0

­

­

1

1/1

0

­

­

1

1/1

0

­

­

3

3/3

0

­

­

5

5/5

0

­

­

5

5/5

0

­

­

6

6/6

0

­

­

7

0/7

1

B

7/7

7

7/7

0

­

­

7

7/7

0

­

­

7

7/7

0

­

­

9

9/9

0

­

­

12

12/12

0

­

­

19

0/19

12 A+B

19/19

19

1/19

19

E+C

19/19

19

12/12

0

­

­

20

20/20

0

­

­

2c2p Ably Keboola Langfuse Signwell Open_route Pappers Buttondown Resend Coingecko Innoship Twiliomessaging Chatkitty Gitlab Modrinth Multiversx Circleci Spotify Lob Pokeapi Elasticsearch Redis Openai Render Sentry Discord Trello Mailchimp Square Bitbucket Binance Clarifai Github
Total

none http basic+none
apikey+none http+none apikey
apikey (query) apikey
http earer http bearer
apikey apikey http basic OAuth2 apikey none+apikey none apikey+http OAuth2 http basic apikey+http apikey apikey http bearer http bearer http bearer OAuth2+apikey apikey+none http basic OAuth2+none OAuth2+apikey+http apikey+none apikey OAuth2/http
­

22 22 23 22 22 24 24 28 31 36 51 57 68 73 76 76 78 88 94 97 102 132 162 166 183 222 255 272 316 318 340 400 1038
5 066

2/2 0/11 10/10 4/4 5/5 2/8 14/14 0/21 17/17 15/15 23/23 6/6 28/28 19/23 44/44 17/17 31/31 25/25 12/12 48/48 8/8 15/15 43/43 69/69 18/18 44/44 55/55 59/59 11/11 31/31 11/11 0/73 0/81

0

­

1

A

0

­

0

­

0

­

102

E

0

­

1

C

0

­

0

­

0

­

0

­

0

­

4

D

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

0

­

11 A+B+C

23

A

­ 11/11
­ ­ ­ 7/8 ­ 21/21 ­ ­ ­ ­ ­ 23/23 ­ ­ ­ ­ ­ ­ ­ ­ ­ ­ ­ ­ ­ ­ ­ ­ ­ 73/73 81/81

783/1,023 174

­

1,022/1,023

Table5 juxtaposes the 17 APIs for which a hand-written, vendor maintained MCP server is publicly available with the corresponding AutoMCP artefacts. Two patterns stand out.
Across the 17 vendor-maintained servers, AutoMCP matched or surpassed tool coverage in 14 cases. For every API the generated stub registers at least as many callable tools as the official implementation, and in 14 of 17 cases it exposes substantially more. The median gap is +28 endpoints, rising to +1025 for GitHub, where the vendor server covers a curated subset while AutoMCP compiles the entire OpenAPI contract. This suggests that hand-written servers routinely omit lower-value or bleeding-edge routes that are nonetheless documented, whereas AutoMCP inherits the full specification "for free." Only three APIs, namely Brave, Firecrawl, and Exa, show the reverse pattern, with the official server surfacing one to three endpoints that are absent from the generated stub. Manual review shows that the endpoints present only in the vendor servers fall into three practical categories. First, several vendor servers expose 'preview' or 'internal' endpoints that have not yet been

Table 5: Comparison of Official and AutoMCP-Generated MCP Servers

API

EP (Off.) EP (Auto) SLOC (Off.) SLOC (Auto)

Brave

2

Firecrawl

8

Exa

8

Huggingface

7

Notion

19

Ably

5

Keboola

31

Resend

2

Coingecko

7

Gitlab

60

Multiversex

14

Circleci

11

Elasticsearch 5

Redis

13

Render

18

Sentry

11

Github

73

1 5 7 12 19 22 23 31 36 73 76 78 102 132 166 183 1 038

­ 8 656 12 061 18 063 10 592 76 769 14 490 704 128
­ 13 068 3 196 11 605 1 569 13 832 36 098 43 880 10 488

79 161 571 377 609 702 740 959 1 212 2 420 2 081 3 491 2 793 4 869 5 515 6 419 46 135

committed to the public contract; these routes are intentionally withheld from the OpenAPI file because their parameters, semantics, or stability guarantees may still change. Second, some vendors include bespoke convenience actions, single RPC calls that internally orchestrate multiple REST operations, to simplify common workflows.
Hand-written official vendor-provided mcp servers require orders of magnitude more code than the fully generated stubs produced by AutoMCP. The engineering budget required to achieve that coverage diverges by orders of magnitude. The hand-written servers range from 1.5k to 704k source lines of code (SLOC); the AutoMCP artifacts are produced in a single compilation pass and consist solely of machine-generated glue (median 0.7k SLOC, zero human maintainers). Even modest-scale APIs such as Resend or CircleCI shed two orders of magnitude of manual code, while enterprise-scale services such as Sentry, Render, and GitHub see four orders.
Finding-2. AutoMCP executed 783/1023 endpoints (77%) across all APIs with a 100% success rate in 41/50 APIs; compared to 17 official, vendor-provided servers it matched or exceeded tool coverage in 82% of cases while eliminating all hand-written code.
GitHub Case Study: Manual vs. Generated MCP Tools We complement the large-scale, quantitative results with a focused qualitative inspection of GitHub's vendor, maintained offical MCP server, the most-starred public implementation. After a 23-line patch that adds the missing security-scheme block to their OpenAPI specs GitHub itself lists as a "known limitation" 1, AutoMCP achieves 100 % coverage over all 1 038 GitHub operations; the mechanics and broader implications of that fix are analysed in the RQ4 results. AutoMCP attains 100% coverage on GitHub's 81 endpoints; the details of that repair and its broader implications are discussed in the RQ4 results. Here we contrast a representative hand-written tool of the offical server with the declarative information already present in the specification.
1 https://github.com/github/rest-api-description

Making REST APIs Agent-Ready: From OpenAPI to MCP Servers for Tool-Augmented LLMs

Conference'17, July 2017, Washington, DC, USA

func ListBranches([..]) ([..]) { return mcp.NewTool("list_branches", mcp . WithDescription (t(" TOOL_LIST_BRANCHES [..] ", " List  branches  in a GitHub  repository ")) , mcp.WithString("owner", [..], mcp.Description("Repositoryowner")), mcp.WithString("repo", [..], mcp.Description("Repositoryname")), WithPagination () , ), func(ctx context.Context , [..]) (*[..]) { //Auth , API call , error handling manually written })}

Listing 2: Hand-written implementation of list_branches in the GitHub MCP server.

"/repos/{owner}/{repo}/branches": { "get": { "summary": "List branches", "operationId": "repos/list -branches", "parameters": [ { "$ref": "#/components/parameters/owner" }, { "$ref": "#/components/parameters/repo" } ], "responses": { "200": { "$ref": "#/components/schemas/branchList" }}}}

Listing

3:

OpenAPI

fragment

for

/repos/{owner}/{repo}/branches endpoint in Github

API.

Listing 2 shows that the hand-written variant must address five concerns explicitly: (i) select a stable tool identifier, (ii) craft a natural-language description, (iii) declare two string parameters, (iv) enable pagination, and (v) embed a bespoke handler that authenticates, issues the HTTPS request, parses the JSON payload, and surfaces errors. Similar boiler-plate recurs in every other function inside the repository, inflating the code base to tens of thousands of lines.
By contrast, Listing 3 encodes the same semantics in a single declarative block: the path template, HTTP verb, parameter list, and success schema are machine-readable and self-consistent.AutoMCP consumes this definition once, synthesises the JSON-Schema input, wires authentication automatically and emits a generator-produced handler. Developer effort is therefore reduced from bespoke Go logic per endpoint to a single command-line invocation, while future changes to parameters or responses require only an update to the specification followed by recompilation.
4.3 RQ3: What breaks the automation
Table 4 shows that 240 of 1023 sampled calls) failed in nine APIs. Open-coding each failure yielded five recurring defect classes (Table 6): (A) missing or incorrect security schemes (62% of failures), (C) undocumented headers or token prefixes (47%), (B) malformed base URLs (41%), (E) missing endpoint-level auth (10%), and (D) parameter-type mismatches (2%).Every fault lay in the OpenAPI contract; none originated in AutoMCP or the MCP runtime.

A single, once-per-file patch, 174 lines across the nine flawed specifications, resolved 239 of 240 blocked endpoints, lifting the corpus pass-rate from 76.5% (783/1023) to 99.9% (1022/1023). The sole hold-out is an OpenRouteService health-check that returns HTTP 400 whenever the provider's local engine is absent, an environmental rather than contractual issue.
Table 6: Root causes of automation failures across 1,030 evaluated endpoints.

Failure Category

Affected APIs Affected Endpoints LoC Changed

Incorrect or missing security schemes

4

Malformed or relative base URLs

3

Missing endpoint-level auth

2

Undocumented runtime headers and token prefixes

3

Parameter type mismatches

1

14.4% (148/1023) 9.7% (99/1023) 2.3% (24/1023) 10.9% (112/1023) 0.4% (4/1023)

25.3% (44/174) 1.7% (3/174) 68.9% (120/174) 1.7% (3/174) 2.3% (4/174)

Total resolved via spec edits Unresolved (external issues)

9

25.3% (259/1023)

­

1

0.1% (1/1023)

­

Below we give one representative fragment per failure class, each followed by the minimal correction applied.
(A) Incorrect or missing security schemes. The most common failure mode involved misconfigured or missing security declarations in the components.securitySchemes block (OpenAPI 3.0) or the securityDefinitions block (Swagger/OpenAPI 2.0). For example, the official GitHub OpenAPI specification entirely omit-
ted the security scheme and lacked all authentication metadata--a limitation flagged in public issue reports.2 We followed the patch
fix proposed in this issue to restore the missing security scheme
declarations and enable proper authentication handling.
Other specifications defined security metadata incorrectly. Apaleo's contract declared an obsolete OAuth2 implicit flow and omitted the mandatory tokenUrl; the 7-line patch in 4 enabled credential exchange and unblocked all 19 endpoints.

securitySchemes:

oauth2:

type: oauth2

flows:

authorizationCode:

authorizationUrl: https://identity .[..]/

authorize

+

tokenUrl: https://identity[..]/connect/token

Listing 4: Apaleo security scheme and patch (lines 7).

(B) Malformed or relative base URLs. The ADP specification used an unresolved template in servers; replacing it with a fully qualified domain (Listing 5) fixed all seven endpoints.
Servers: - url: '{{service -root}}' + url: 'https://api.adp.com '
Listing 5: ADP base URL placeholder replaced with an absolute URL. (lines 2).

2 https://github.com/github/rest- api- description/issues/237

Conference'17, July 2017, Washington, DC, USA

Meriem Mastouri, Emna Ksontini, and Wael Kessentini

(E) Missing endpoint-level authentication. In certain APIs, global authentication schemes were correctly defined, yet the corresponding endpoint-level security annotations were applied inconsistently. For instance, the OpenRoute API specified an API key parameter on only 5 out of its 24 endpoints, despite its documentation stating that all endpoints require this key. This inconsistency led AutoMCP to skip credential injection for the majority of endpoints, resulting in runtime 401 Unauthorized errors. Listing 6 illustrates the pattern used to propagate the security scheme to the remaining endpoints.
"parameters": [ +{ + "name": "api_key", + "in": "query", + "required": true , + [...] +} ]
Listing 6: OpenRoute: adding API-key requirement to unannotated endpoints.

(C) Undocumented runtime headers and token prefixes. Some APIs require additional runtime headers or non-standard token formats that are not declared in their specifications. For instance, Notion's API mandates the inclusion of a Notion-Version (e.g. 202206-28) header in all requests, a requirement missing from its OpenAPI spec. To handle such cases, users should define the required version as a single line in the MCP server's .env file, as AutoMCP automatically scans environment variables for extra headers.
(D) Parameter-type mismatches. In some cases, parameter types declared in the OpenAPI specification did not align with the expectations of the live API. For example, GitLab defines path parameters like project_id as integers (type: integer, format: int32). Correcting the type (7) resolved all failures.

parameters:

name: id

[...]

schema:

-

type: integer

+

type: string

Listing 7: GitLab: changing project id from integer to string.

Finding 3. Five specification flaws, dominated by incomplete security metadata and malformed base URLs, , on average, only 19 lines per affected OpenAPI spec lifted AutoMCP's success rate from 76% to 99.9%.
5 Threats to validity
This study acknowledges several threats to validity. Construct validity. A key threat is whether our definitions e.g., "working

server," "successful tool call," and "developer effort", accurately reflect the underlying constructs. We mitigate this by grounding success in observable outcomes (manifest loadability, HTTP codes, and verifiable postconditions) and measuring effort using established proxies like SLOC, contributor counts, and churn. Crucially, we isolate MCP server evaluation from LLM behavior: AutoMCP does not influence tool selection, prompt construction, or result interpretation, which are LLM (mcp-client) responsibilities. Internal validity. Two sources of bias warrant discussion. Sampling bias may arise when filtering GitHub repositories for MCP servers; our high-precision heuristics inevitably exclude some valid projects. We explicitly frame our 1164-project corpus as a lower bound and refrain from generalising absolute counts. Assessment bias could emerge because authors executed and judged endpoint outcomes. We mitigated this by (i) giving each author disjoint APIs, (ii) prescribing a fixed prompt template, and (iii) cross-checking 10% of cases, achieving substantial agreement. External validity. Our evaluation is grounded in a representative sample of 50 real-world OpenAPI specifications spanning different sizes, authentication schemes, and domains. While larger corpora exist, manual evaluation at this scale is resource-intensive. To ensure generalizability, we adopt stratified sampling and report detailed selection criteria, making our dataset and scripts available for replication. Nonetheless, certain edge cases, e.g., APIs with undocumented runtime behaviors or proprietary flows, may remain underrepresented.
6 Conclusion
This study delivers the first large-scale, empirical look at the MCP ecosystem and introduces AutoMCP, a compiler that transforms OpenAPI contracts into deployable MCP servers with no manual coding. Our analysis of 22 722 MCP-tagged GitHub repositories shows that, despite rapid hype, only 5% host a server and most are lean, single-maintainer projects whose effort is dominated by boiler-plate scaffolding rather than substantive engineering. By automatically generating that scaffolding, AutoMCP eliminates the principal barrier to adoption: repetitive server implementation. In an evaluation spanning 50 diverse REST APIs, the toolboots produced runnable servers for 77% of calls out-of-the-box, and 99.9% after applying a median patch of just 19 lines per openAPI specification. Against 17 hand-crafted, vendor-maintained MCP servers, AutoMCP matched or exceeded tool coverage in 14 cases while shrinking code size by up to four orders of magnitude.
These findings have three key consequences for the research and practitioner communities. For the research community, the publicly released dataset and metrics provide the first quantitative baseline against which future MCP studies can be rigorously compared, enabling empirical investigations of adoption dynamics, compiler optimisation, and specification quality. Nearly 77% of the OpenAPI contracts we examined generated working MCP servers on the first try; the rest failed only because of small, well-scoped schema errors, pointing to a clear opportunity for automated tools that can detect and fix such defects with little or no human effort. For practitioners, the study offers an immediately actionable takeaway: the fastest path to "agent-ready" functionality lies not in writing more code but in writing better contracts. By ensuring that OpenAPI files declare complete security schemes, reference absolute base URLs,

Making REST APIs Agent-Ready: From OpenAPI to MCP Servers for Tool-Augmented LLMs

Conference'17, July 2017, Washington, DC, USA

and use accurate parameter types, teams can feed their existing
specifications through AutoMCP and obtain, a fully deployable
MCP server.
References
[1] S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. R. Narasimhan, and Y. Cao, "React: Synergizing reasoning and acting in language models," in The Eleventh International Conference on Learning Representations, 2023. [Online]. Available: https://openreview.net/forum?id=WE_vluYUL- X
[2] T. Schick, J. Dwivedi-Yu, R. Dessí, R. Raileanu, M. Lomeli, E. Hambro, L. Zettlemoyer, N. Cancedda, and T. Scialom, "Toolformer: language models can teach themselves to use tools," in Proceedings of the 37th International Conference on Neural Information Processing Systems, ser. NIPS '23. Red Hook, NY, USA: Curran Associates Inc., 2023.
[3] Y. Song, W. Xiong, D. Zhu, C. Li, K. Wang, Y. Tian, and S. Li, "Restgpt: Connecting large language models with real-world applications via restful apis," 06 2023.
[4] S. Patil, T. Zhang, Y. Wu et al., "Gorilla: Large language model connected with massive apis," arXiv preprint arXiv:2305.15334, 2023.
[5] C. Li, Y. Cao, X. Chen, W. Huang, D. Zhang, and C. Zhou, "Api-bank: A benchmark for tool-augmented llms with api usage," in Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing (EMNLP), 2023, pp. 3280­3293.
[6] Z. Li, C. Li, X. Zhang, Y. Ma, Z. Xu, C. Tu, and Z. Liu, "Toolfactory: Automating tool generation by leveraging llm to understand rest api documentations," arXiv preprint arXiv:2501.16945, 2024. [Online]. Available: https://arxiv.org/abs/2501.16945
[7] X. Chen, C. Gao, C. Chen, G. Zhang, and Y. Liu, "An empirical study on challenges for llm application developers," ACM Trans. Softw. Eng. Methodol., Jan. 2025, just Accepted. [Online]. Available: https://doi.org/10.1145/3715007
[8] Anthropic, "Model context protocol (mcp)," 2025, [Online]. [Online]. Available: https://docs.anthropic.com/claude/docs/model- context- protocol
[9] Docker Inc., "Docker mcp catalog and toolkit," https://docs.docker.com/ai/mcpcatalog-and-toolkit/catalog/, 2025, accessed July 2025.
[10] MCP.so Community, "Mcp.so: Community mcp server directory," https://mcp.so/, 2025, accessed July 2025.
[11] X. Hou, Y. Zhao, S. Wang, and H. Wang, "Model context protocol (mcp): Landscape, security threats, and future research directions," arXiv preprint arXiv:2503.23278, 2025. [Online]. Available: https://arxiv.org/abs/2503.23278
[12] A. Authors, "Automcp-executable," [Online]. [Online]. Available: https: //anonymous.4open.science/r/AutoMCP- executable- 274E/README.md
[13] OpenAI, "Function calling and other api updates," 2023, [Online]. [Online]. Available: https://openai.com/blog/function-calling-and-other-api-updates
[14] H. Chase, "Langchain: Building applications with llms through composability," 2023, [Online]. [Online]. Available: https://docs.langchain.com/
[15] S. Gravitas, "Auto-gpt: An autonomous gpt-4 experiment," 2023, [Online]. [Online]. Available: https://github.com/Torantulino/Auto-GPT
[16] C.-Y. Hsieh, S.-A. Chen, C.-L. Li, Y. Fujii, A. Ratner, C.-Y. Lee, R. Krishna, and T. Pfister, "Tool documentation enables zero-shot tool-usage with large language models," 2023. [Online]. Available: https://arxiv.org/abs/2308.00675
[17] G. Developers, "A2a: A new era of agent interoperability," https://developers. googleblog.com/en/a2a-a-new-era-of-agent-interoperability/, 2024, accessed: 2025-04-27.
[18] Postman Inc., "Mcp generator," https://www.postman.com/explore/mcpgenerator, 2025, accessed July 2025.
[19] T. O. Initiative, "Openapi specification v3.1.0," 2023, [Online]. [Online]. Available: https://spec.openapis.org/oas/v3.1.0
[20] S. Serbout and C. Pautasso, "A study of api versioning in the openapi ecosystem," in Proceedings of the 2023 IEEE International Conference on Software Architecture (ICSA), 2023, pp. 137­148.
[21] A. D. Lauro, T. G. Dietrich, and M. L. Bernardi, "Should i deprecate this api operation? an empirical analysis of api evolution," in Proceedings of the 2022 IEEE International Conference on Web Services (ICWS), 2022, pp. 188­195.
[22] D. Lercher, D. Leoni, and M. Gusev, "Autooas: A framework for automatically enhancing openapi specifications," in Proceedings of the 2024 International Conference on Software Engineering (ICSE), 2024.
[23] D. C. M. noz Hurtado, S. Serbout, and C. Pautasso, "Mining security documentation practices in openapi descriptions," in Proceedings of the 22nd IEEE International Conference on Software Architecture (ICSA), 2025.
[24] H. Nguyen, R. Dyer, N. Tien, and H. Rajan, "Mining preconditions of apis in large-scale code corpus," 11 2014, pp. 166­177.
[25] D. Jayasuriya, V. Terragni, J. Dietrich, and K. Blincoe, "Understanding the impact of apis behavioral breaking changes on client applications," Proceedings of the ACM on Software Engineering, vol. 1, pp. 1238­1261, 07 2024.
[26] M. Kim, T. Stennett, D. Shah, S. Sinha, and A. Orso, "Leveraging large language models to improve rest api testing," in 2024 IEEE/ACM 46th International Conference on Software Engineering: New Ideas and Emerging Results (ICSE-NIER), 2024, pp. 37­41.

[27] Y. Qin, S. Liang, Y. Ye, K. Zhu, L. Yan, Y. Lu, Y. Lin, X. Cong, X. Tang, B. Qian, S. Zhao, L. Hong, R. Tian, R. Xie, J. Zhou, M. Gerstein, dahai li, Z. Liu, and M. Sun, "ToolLLM: Facilitating large language models to master 16000+ real-world APIs," in The Twelfth International Conference on Learning Representations, 2024. [Online]. Available: https://openreview.net/forum?id=dHng2O0Jjr
[28] E. Anuff. (2025, May) Is model context protocol the new api? The New Stack. Accessed 18 June 2025. [Online]. Available: https://thenewstack.io/is-modelcontext- protocol- the- new- api/
[29] A. Masuda, T. Matsuodani, and K. Tsuda, "Team activities measurement method for open source software development using the gini coefficient," in 2019 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW), 2019, pp. 140­147.
[30] C. Wissler, "The spearman correlation formula," Science, vol. 22, no. 558, pp. 309­311, 1905.
[31] APIs.guru, "Apis.guru: The wikipedia for web apis," https://apis.guru/, 2024, accessed: 2025-04-27.
[32] Konfig, "Konfig SDKs OpenAPI Examples Repository," https://github.com/konfigsdks/openapi-examples, 2025, gitHub repository · accessed 18 april 2025.
[33] V. Atlidakis, P. Godefroid, and M. Polishchuk, "Restler: Stateful rest api fuzzing," in Proceedings of the 41st International Conference on Software Engineering (ICSE), 2019.
[34] D. Corradini, A. Zampieri, M. Pasqua, and M. Ceccato, "Restats: A test coverage tool for restful apis," in 2021 IEEE International Conference on Software Maintenance and Evolution (ICSME), 2021, pp. 300­310.
[35] Anthropic, "Claude ai," https://claude.ai/, 2025, accessed: 2025-04-28. [36] T. Le, T. Tran, D. Cao, V. Le, T. N. Nguyen, and V. Nguyen, "Kat: Dependency-
aware automated api testing with large language models," in 2024 IEEE Conference on Software Testing, Verification and Validation (ICST). IEEE, 2024, pp. 82­92. [37] M. Kim, T. Stennett, S. Sinha, and A. Orso, "A multi-agent approach for rest api testing with semantic graphs and llm-driven inputs," arXiv preprint arXiv:2411.07098, 2024.

