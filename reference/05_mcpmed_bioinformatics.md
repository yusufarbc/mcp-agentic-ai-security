> Auto-extracted plain text from [`05_mcpmed_bioinformatics.pdf`](./05_mcpmed_bioinformatics.pdf) via `pdftotext`. Tables, figures, and multi-column layout are not preserved here â€” consult the PDF for those.

MCPmed: A Call for MCP-Enabled Bioinformatics Web Services for LLM-Driven Discovery

Matthias Flotho1,2

Ian Ferenc Diks1,2

Philipp Flotho1,2

Leidy-Alejandra G. Molano1,2

Pascal Hirsch1,2

Andreas Keller1,2,3,*

1Chair for Clinical Bioinformatics, Center for Bioinformatics, Saarland University, Germany 2Helmholtz Institute for Pharmaceutical Research Saarland (HIPS), Saarland University Campus,
Germany 3Pharma Science Hub (PSH), Saarland University Campus, Germany
*Corresponding author: andreas.keller@ccb.uni-saarland.de

arXiv:2507.08055v1 [q-bio.OT] 10 Jul 2025

Abstract
Bioinformatics web servers are critical resources in modern biomedical research, facilitating interactive exploration of datasets through custom-built interfaces with rich visualization capabilities. However, this human-centric design limits machine readability for large language models (LLMs) and deep research agents. We address this gap by adapting the Model Context Protocol (MCP) to bioinformatics web server backends--a standardized, machineactionable layer that explicitly associates webservice endpoints with scientific concepts and detailed metadata. Our implementations across widely-used databases (GEO, STRING, UCSC Cell Browser) demonstrate enhanced exploration capabilities through MCP-enabled LLMs. To accelerate adoption, we propose MCPmed, a community effort supplemented by lightweight breadcrumbs for services not yet fully MCP-enabled and templates for setting up new servers. This structured transition significantly enhances automation, reproducibility, and interoperability, preparing bioinformatics web services for next-generation research agents.
Keywords: MCP, database, web server, GEO, API, LLM
1 Introduction
Traditional bioinformatics web servers primarily target human users, a limitation reinforced by legacy Nucleic Acid Research (NAR) guidelines that emphasize uptime and citation-friendly uniform resource locators (URLs). However, the growing use of autonomous research agents built on large language models (LLMs) highlights an additional critical requirement: bioinformatics services should be inherently machine-actionable.
Recent advancements in LLMs and autonomous research agents underscore the urgent need for bioinformatics web servers to evolve from predominantly human-oriented interfaces toward fully machine-actionable platforms. Recent efforts show human-like performance in doing autonomous research and data exploration [6, 24, 12]. The model context protocol (MCP) [2] directly addresses this challenge by providing a standardized semantic contract layered over existing application programming interface (API) specifications. MCP explicitly associates each API endpoint with scientific concepts, along with versioned metadata, facilitating automated discovery, invocation, and verification of webservices. Mainly, several practical benefits arise instantly from adapting to MCP. Those include enhanced automation, enabling autonomous pipelines that span wet-lab scheduling, computational analysis, and manuscript drafting, improved reproducibility, achieved through concept-level versioning and audit-ready parameter tracking, and increased interoperability, as shared MCP concepts become standardized across institutions, analogous
1

Figure 1: Graphical abstract: Using model context protocol (MCP)[9] as an easy to implement API overlay enables next generation research pipelines for fully automated research agents as well as advanced LLM assisted human research.
to Global Alliance for Genomics and Health (GA4GH) tool registry service (TRS) in genomics [26].
In this manuscript, we illustrate MCP's transformative potential through practical implementations:. First, we introduce MCPmed, including diverse MCP layers for highly used databases, such as a lightweight MCP layer for the Gene Expression Omnibus (GEO)[3], enabling LLMs to autonomously search and retrieve data via existing GEO API endpoints. Second, we propose a simple hypertext markup language (HTML) metadata system breadcrumbs to bridge existing services towards MCP readiness. These examples demonstrate how MCP adoption can rapidly transition bioinformatics web servers into integral, fully automated components of nextgeneration biomedical research workflows.
By adopting MCP, biomedical webservices can effectively address the emerging requirements of the next research era, driven by autonomous systems capable of reasoning, experimentation, and publishing at unprecedented scale (Figure 2).
2 Today's bioinformatics is FAIR
Most bioinformatics portals already meet the FAIR mandate: Making data Findable, Accessible, Interoperable, and Re-usable via stable URLs and downloads [25]. Yet FAIR's original focus on human-guided access leaves key automation and content indexing gaps. Even current guidelines, such as the NAR Web Server or Database Issue [19, 16], accept human-centric interfaces as compliant, lacking a requirement for stable, programmable APIs. This leads to brittle, ad-hoc workflows reliant on scraping HTML or inconsistent JSON endpoints. Although sufficient for prototypes, this approach cannot scale effectively. While FAIR and GA4GH constitute already a significant step and influence in the community, we argue that MCPs will complement their functionalities rather than replacing them by adapting and implementing principles accordingly for broad LLM usage. Table 1 contrasts in detail the different aspects covered by the three approaches, highlights their respective advantages. We want to point out especially MCPmed's broad applicability, clarity, and AI-specific integration layer--and shows how its freely configurable parameters give implementers the flexibility to tailor metadata capture, runtime environments, and monitoring hooks to diverse use-case demands without sacrificing interoperability. To realize the full promise of automated bioinformatics research, we must transition to clearly defined APIs coupled with MCP layers.
2

Table 1: Comparative summary: FAIR vs. GA4GH TRS vs. MCP

FAIR principles

GA4GH TRS

MCP

Goal
Scope
Machine actionability . Metadata model

Improve data reuse by making data findable, accessible, interoperable, and reusable
Conceptual framework and principles for data management
Encouraged but not prescriptive about implementations Abstract principles rather than technical specifications

Standard for listing, describing, and discovering genomics tools and workflows across registries
Specific API schema for genomics tool/workflow registration and discovery
Well-defined API schemas structured endpoints
Structured JSON schemas for genomics tools and workflows

Standardize secure

connections between

AI

applications

and external data

sources/tools

Open protocol for connecting LLMs to external resources

High priority: designed for parsing by LLMs and AI agents
JSON-based protocol specifications

Governance

Broad community acceptance, decentralized approach

Domain focus
Relationship to MCP

General data management across disciplines

MCP could oper-

ationalize

FAIR

principles for AI

systems

Managed by GA4GH organization with established processes
Genomics and bioinformatics tools
MCP could enhance TRS outputs for autonomous AI agents

Open standard introduced by Anthropic (Nov 2024), gaining adoption
AI/LLM integration with external systems
Complements existing frameworks by providing AI-specific integration layers

Such an infrastructure would enable autonomous agents to automatically discover suitable routes, execute queries without manual guidance, and verify results through explicit provenance (see Table 1 for a comparison of the three approaches). The following sections illustrate how adopting MCP closes these gaps, transforming bioinformatics web servers into robust building blocks for fully automated workflows.
3 Challenges and opportunities for MCP-native bioinformatics
Today's bioinformatics landscape offers powerful capabilities but remains fragmented. This fragmentation is characterized by diverse API styles (REST+JSON, GraphQL, SOAP, HTML forms), varied authentication protocols, and inconsistent pagination. Highly specialized services, such as harmonized data-collections (UCSC Cell Browser [22], ZEBRA [5], DISCO [11], miRNATissueAtlas [17]), general databases without harmonization as GEO [3], genome alignment engines (M1CR0B1AL1Z3R [20]), data extraction platforms (miRMASTER [4]), and sophisticated visualization tools (miRTargetLink [10]) are challenging for autonomous agents to utilize without customized integration. By enforcing API specifications combined with semantic MCP alignment, we provide autonomous agents a unified grammar for service discovery, invocation, and error handling. Standardized manifests surface details such as rate limits, authentication, and

3

Figure 2: Evolution of hypothesis-driven bioinformatics workflows. Manual scholarship (left) relied on exhaustive reading of primary literature before consulting public data resources to corroborate a hypothesis (stage 1). Contemporary practice couples large-language-model (LLM)assisted literature triage with targeted database queries, accelerating discovery (stage 2). Forthcoming platforms are expected to embed LLM agents that autonomously mine domain-specific servers, execute analyses and return data-backed conclusions in a closed loop (stage 3).
pagination clearly, eliminating ad-hoc code and fragile scraping routines [1]. Operational reliability further enhances this model. Services can implement explicit health checks and service-level commitments within their configurations, enabling autonomous pipelines to manage downtime proactively, queue tasks efficiently, or dynamically shift to alternative providers. MCP requires servers to implement proper capability negotiation and error handling mechanisms to ensure reliable communication between hosts and servers.
3.1 From human-centric portals to MCP-native infrastructures
The rise of large-language models necessitates webservices optimized for autonomous agents. To satisfy both human and machine users, bioinformatics servers should implement three sequential layers:
· User interface (UI) ­ browser-based, intuitive interfaces for exploratory tasks and clear documentation.
· API layer ­ standardized, machine-readable descriptions defining exact usage, parameters, and error handling.
· MCP layer ­ semantic metadata tagging each API endpoint with scientific concepts and providing explicit model/version provenance.
This layered approach (UI  API  MCP) ensures human accessibility while enabling autonomous execution and complete reproducibility, addressing the requirements of next-generation bioinformatics research infrastructures.
Figure 3 illustrates the complementary facets we foresee for the next generation of bioinformatics web services paving the road towards fully automated research pipelines.
4

Figure 3: Evolution of a bioinformatics server as it acquires agent-readiness. The left panel shows a classic UI-only service. In the centre, an API layer makes the same service callable by a script or language model. The rightmost panel adds an endpoint to a plug-and-play module in fully automated wet- plus dry-lab pipelines (colour code in figure: blue = UI, red = API/ MCP).
4 From early integration to late integration research strategy using MCP
Another important aspect in current publications is that clear findings are favored over broad data presentation. Consequently, key features are often cherry picked from complex datasets. Therefore, search engines and researchers often just value the picked feature instead of making use of the complete data corpus available [13, 21]. Already in 2013 Piwowar et al. described [15] that most of the 1.3M human -omics samples deposited on GEO remain acutely underused because discovery often relies on unstructured metadata [15, 8].
This selective emphasis is evident even in well-curated resources. For example, Hahn et al. [7] examined detailed aging trajectories in mice. Although their study prominently highlights individual genes such as C4b and specific key regions to craft a clear and engaging narrative, supplemented by an extensive web interface, valuable insights might remain unexplored.
We propose a paradigm shift for data-usability from sticking with early integration strategies, i.e. focusing on the key features presented in an initial study covering findings missed by the sheer amount of available data. Addressing this selective-attention bias is exactly what an MCP layer aims to facilitate: Making large data bodies directly available and easily accessible by natural language, it will be possible to take benefit of the full data-body to enable open research. With minimal effort, basically any webservice or database with an existing API can be included in the LLM assisted research process using MCPs. To proof this point we implemented an easy to use MCP client layering the GEO database enabling automated search for datasets supporting theses, but also download the data. In combination with MCPs currently developed such as the single cell MCP [18], this might already be the base for a fully automated workflow for backing up findings with autonomous data retrieval and analysis.
5 Results
In this manuscript we introduce MCPmed as an opensource hub to share build and use MCPs in the biomedical research area. For this we provide an easy to use cookie cutter template to
5

setup MCP pypi packages as well as MCP implementations for highly used databases such as GEO, the UCSC Cell Browser [22], STRING DB [23] and PLSDB [14]. In this context we want to highlight two lightweight applications: first, demonstrating the ease of transitioning existing web services with APIs to MCP services, and second, introducing a practical approach for guiding search engines toward more LLM-native web services.
5.1 GEOmcp
To demonstrate MCP's practical utility, we implemented a prototype GEOmcp layering over the existing Gene Expression Omnibus (GEO) API. This MCP-enhanced service simplifies data discovery and retrieval for autonomous, LLM-driven research. Using straightforward JSON queries, LLM agents autonomously refine search terms contextually, greatly improving search efficiency and success rates compared to manual or traditional keyword-based searches. The implementation includes explicit searches for GEO profiles, GEO datasets, and GEO series. The information for the LLM support are rather simple as shown in the following code snippet describing the functionality for the GEO series search routine:
types.Tool( name="search_geo_series", description="Search GEO Series database for gene expression series", inputSchema={ "type": "object", "properties": { "term": { "type": "string", "description": "Search term for GEO Series" }, "retmax": { "type": "integer", "description": f"Maximum number of results to return (default: {current_retmax})", "default": current_retmax } }, "required": ["term"] }
)
Finally, this example illustrates the autonomous discovery process by LLM agents:
[USER] Hey I am l o o k i n g f o r a r e f e r e n c e d a t a s e t for mice with microglia depletion
[CLAUDE] I ' l l h e l p you f i n d r e f e r e n c e d a t a s e t s f o r mice with microglia depletion . Let me s e a r c h t h e GEO d a t a b a s e f o r relevant studies .
[CLAUDE] s e a r c h _ g e o _ q u e r i e s Request{term : microglia depletion
6

mouse , retmax : 5} Response { . . . Empty i d l i s t . . . } [CLAUDE] Let me t r y a b r o a d e r s e a r c h with different terms : [CLAUDE] s e a r c h _ g e o _ q u e r i e s Request { term : m i c r o g l i a PLX3397 mouse ,
retmax : 5} Response { . . . Empty i d l i s t . . . } [CLAUDE] Let me t r y s e a r c h i n g f o r CSF1R i n h i b i t i o n , which i s a common method f o r m i c r o g l i a depletion : [CLAUDE] s e a r c h _ g e o _ q u e r i e s Request { term : CSF1R i n h i b i t o r mouse b r a i n ,
retmax : 5} Response { . . . Empty i d l i s t . . . } [CLAUDE] Let me t r y a b r o a d e r m i c r o g l i a -r e l a t e d search : [CLAUDE] s e a r c h _ g e o _ q u e r i e s Request{term : microglia mouse brain ,
retmax : 10} Response { . . . Empty i d l i s t . . . }

[CLAUDE]

search_geo_queries Request{term : microglia depletion ,
retmax : 10} Response{uids : [200299005 , 200279739 ,

...]}

[CLAUDE] Great ! I found s e v e r a l r e f e r e n c e d a t a s e t s for microglia depletion in mice . Key d a t a s e t s : GSE271535 m i c r o g l i a i n n a t e immune memory a f t e r CSF1R d e p l e t i o n (RNA-s e q ) GSE270935 companion ATAC-s e q d a t a s e t GSE292830 PLX3397-mediated d e p l e t i o n with monocyte replacement GSE288018 / GSE288504 Krabbe disease model with microglia replacement GSE299005 post-TBI m i c r o g l i a d e p l e t i o n (snRNA-s e q )

[CLAUDE] For c o m p r e h e n s i v e c o v e r a g e , s t a r t with GSE271535 (RNA-s e q ) and GSE270935 (ATAC-s e q ) .
This implementation demonstrates MCP's potential in enabling autonomous contextual refinement, significantly streamlining dataset discovery processes. All code is freely available on PiPy and github (see Section 8).

7

5.2 Breadcrumbs
We also introduce breadcrumbs, a lightweight HTML-embedded JSON snippet designed for services lacking native MCP or APIs. Breadcrumbs help autonomous agents identify and transition smoothly to MCP-ready alternatives or fallback mechanisms:
<!-- LLM-INSTRUCTIONS {
"$schema": "https://example.com/llm-webservice.json", "id": "deg-browser", "name": "Differential Expression Browser", "MCP": "MCP.IP" "LLM server: "plain http result server" ... } END LLM-INSTRUCTIONS -->
Breadcrumbs offer a straightforward intermediate solution for rapid MCP adoption, minimizing immediate integration barriers.
6 Conclusion
We demonstrate that adopting MCP significantly enhances bioinformatics webservices, making them inherently suitable for LLM-driven automated research. GEOmcp exemplifies immediate benefits, enabling autonomous refinement and precise data retrieval, drastically improving discoverability and contextual precision. The introduced "breadcrumbs" approach serves as a practical transition tool, ensuring legacy web servers [16] can become MCP-ready with minimal effort. Adopting MCP now positions bioinformatics resources for scalable, reproducible, and efficient autonomous workflows, essential for future biomedical research automation. Implementing this policy will significantly improve machine readability and facilitate seamless integration into automated workflows as described by Gottweis et al. [6]. Additionally, our group plans to upgrade several bioinformatics databases previously introduced by our chair to become fully MCP-compatible, serving as practical examples and accelerating the broader transition toward fully automated, agent-driven research ecosystems. Finally, the immediate creation of a rigorously curated MCP app store is essential, providing secure, pre-vetted MCP packages for existing web-services and forming a unified bulwark against misuse and malware across the bioinformatics ecosystem. We already introduced MCPmed in this paper to address this need. As a next intermediate step, we propose automated functionality for data integration templating, paving the way toward a rigorously curated MCP app store offering secure, pre-vetted packages for existing web services and strengthening protection against misuse and malware across the bioinformatics ecosystem.
7 Limitations
Despite clear advantages, the proposed breadcrumb approach faces several constraints. Reliance on fixed HTML markup makes automated parsing vulnerable to minor structural changes, requiring continuous metadata maintenance.
Additionally, breadcrumbs currently lack structured semantics for clearly defined fallback behaviors, possibly leading to inconsistent agent interpretations. Moreover, embedding identical metadata redundantly within pages is inefficient at scale, suggesting external manifests would improve efficiency. Lastly, technical constraints such as LLM context window limitations, network latency, and evolving proficiency in autonomous tool use still impose practical limitations,
8

although these are expected to decrease significantly over time. Webservices without existing API remain hard to bridge to LLMs as for example the UCSC Cell Browser MCP is limited in function. Most urgently, there is currently no universally ready-to-use MCP solution. Manual configuration remains a significant bottleneck, often requiring considerable effort and technical expertise. Furthermore, manual curation of webservices and generation of breadcrumbs presents completely new risks and vectors for scientific misconduct or LLM exploits: When data insights are generated by LLMs and used unchecked by scientists, website meta data could be used to prime LLMs to favor certain research outcomes or to increase potentially unrelated citations. However, this limitation presents a unique opportunity: proactive early adoption and centralized curation on MCPmed of MCP technologies now can position researchers and developers advantageously as universal and streamlined solutions inevitably emerge.
8 Code availability
All source code, templates and future MCP releases can be found at https://github.com/MCPmed enrollment for contribution will be available at http://www.mcpmed.org/ .
9 Competing interests
No competing interest is declared.
10 Author contributions statement
Conceptualization & design: M.F., I.F.D., P.H. Writing ­ original draft: M.F. Implementation: M.F. Website implementation: I.F.D. Technical expertise & methodology: M.F., I.F.D., L.A.G.M., P.H., P.F., A.K.
11 Acknowledgments
This study was financed through the DFG project 469073465, and the M.J. Fox Foundation (MJFF-021418; A.K. & T.W-C.). L.A.G.M. was supported by the TALENTS Marie SklodowskaCurie COFUND-Action of the European Commission (GA: 101081463). The views and opinions expressed are, however, those of the authors only and do not necessarily reflect those of the European Union, which cannot be held responsible for them. Figures were created with BioRender.com.
References
[1] Aman Ahluwalia and Suhrud Wani. Leveraging large language models for web scraping. arXiv preprint arXiv:2406.08246, 2024.
[2] Anthropic. Model context protocol specification, June 2025. Version 2025-06-18.
[3] Tanya Barrett, Stephen E Wilhite, Pierre Ledoux, Carlos Evangelista, Irene F Kim, Maxim Tomashevsky, Kimberly A Marshall, Katherine H Phillippy, Patti M Sherman, Michelle Holko, et al. Ncbi geo: archive for functional genomics data sets--update. Nucleic acids research, 41(D1):D991­D995, 2012.
[4] Tobias Fehlmann, Fabian Kern, Omar Laham, Christina Backes, Jeffrey Solomon, Pascal Hirsch, Carsten Volz, Rolf Müller, and Andreas Keller. mirmaster 2.0: multi-species noncoding rna sequencing analyses at scale. Nucleic acids research, 49(W1):W397­W408, 2021.
9

[5] Matthias Flotho, Jérémy Amand, Pascal Hirsch, Friederike Grandke, Tony Wyss-Coray, Andreas Keller, and Fabian Kern. Zebra: a hierarchically integrated gene expression atlas of the murine and human brain at single-cell resolution. Nucleic Acids Research, 52(D1):D1089­ D1096, 2024.
[6] Juraj Gottweis, Wei-Hung Weng, Alexander Daryin, Tao Tu, Anil Palepu, Petar Sirkovic, Artiom Myaskovsky, Felix Weissenberger, Keran Rong, Ryutaro Tanno, et al. Towards an ai co-scientist. arXiv preprint arXiv:2502.18864, 2025.
[7] Oliver Hahn, Aulden G. Foltz, Micaiah Atkins, Blen Kedir, Patricia Moran-Losada, Ian H. Guldner, Christy Munson, Fabian Kern, Róbert Pálovics, Nannan Lu, Hui Zhang, Achint Kaur, Jacob Hull, John R. Huguenard, Sebastian Grönke, Benoit Lehallier, Linda Partridge, Andreas Keller, and Tony Wyss-Coray. Atlas of the aging mouse brain reveals white matter as vulnerable foci. Cell, 186(19):4117­4133.e22, 2023.
[8] Nathaniel T Hawkins, Marc Maldaver, Anna Yannakopoulos, Lindsay A Guare, and Arjun Krishnan. Systematic tissue annotations of genomics samples by modeling unstructured metadata. Nature Communications, 13(1):6736, 2022.
[9] Xinyi Hou, Yanjie Zhao, Shenao Wang, and Haoyu Wang. Model context protocol (mcp): Landscape, security threats, and future research directions. arXiv preprint arXiv:2503.23278, 2025.
[10] Fabian Kern, Ernesto Aparicio-Puerta, Yongping Li, Tobias Fehlmann, Tim Kehl, Viktoria Wagner, Kamalika Ray, Nicole Ludwig, Hans-Peter Lenhof, Eckart Meese, et al. mirtargetlink 2.0--interactive mirna target gene and target pathway networks. Nucleic acids research, 49(W1):W409­W416, 2021.
[11] Mengwei Li, Xiaomeng Zhang, Kok Siong Ang, Jingjing Ling, Raman Sethi, Nicole Yee Shin Lee, Florent Ginhoux, and Jinmiao Chen. Disco: a database of deeply integrated human single-cell omics data. Nucleic acids research, 50(D1):D596­D602, 2022.
[12] Haokun Liu, Sicong Huang, Jingyu Hu, Yangqiaoyu Zhou, and Chenhao Tan. Hypobench: Towards systematic and principled benchmarking for hypothesis generation. arXiv preprint arXiv:2504.11524, 2025.
[13] Naim Al Mahi, Mehdi Fazel Najafabadi, Marcin Pilarczyk, Michal Kouril, and Mario Medvedovic. Grein: an interactive web platform for re-analyzing geo rna-seq data. Scientific reports, 9(1):7580, 2019.
[14] Leidy-Alejandra G Molano, Pascal Hirsch, Matthias Hannig, Rolf Müller, and Andreas Keller. The plsdb 2025 update: enhanced annotations and improved functionality for comprehensive plasmid research. Nucleic Acids Research, 53(D1):D189­D196, 2025.
[15] Heather A Piwowar and Todd J Vision. Data reuse and the open data citation advantage. PeerJ, 1:e175, 2013.
[16] Daniel J Rigden and Xosé M Fernández. The 2024 nucleic acids research database issue and the online molecular biology database collection. Nucleic Acids Research, 52(D1):D1­D9, 11 2023.
[17] Shusruto Rishik, Pascal Hirsch, Friederike Grandke, Tobias Fehlmann, and Andreas Keller. mirnatissueatlas 2025: an update to the uniformly processed and annotated human and mouse non-coding rna tissue atlas. Nucleic Acids Research, 53(D1):D129­D137, 2025.
[18] scmcphub Community. scmcphub: Natural Language Interfaces for Single-Cell Omics Data Analysis. http://scmcphub.org/, 2025. GitHub organization.
10

[19] Dominik Seelow. The 22nd annual nucleic acids research web server issue 2024<? mode editorial?>, 2024.
[20] Yair Shimony, Edo Dotan, Elya Wygoda, Naama Wagner, Iris Lyubman, Noa Ecker, Gianna Durante, Gal Mishan, Jeff H Chang, Oren Avram, et al. M1cr0b1al1z3r 2.0: an enhanced web server for comparative analysis of bacterial genomes at scale. Nucleic Acids Research, page gkaf413, 2025.
[21] Katharina Sielemann, Alenka Hafner, and Boas Pucker. The reuse of public datasets in the life sciences: potential risks and rewards. PeerJ, 8:e9954, 2020.
[22] Matthew L Speir, Aparna Bhaduri, Nikolay S Markov, Pablo Moreno, Tomasz J Nowakowski, Irene Papatheodorou, Alex A Pollen, Brian J Raney, Lucas Seninge, W James Kent, et al. Ucsc cell browser: visualize your single-cell data. Bioinformatics, 37(23):4578­ 4580, 2021.
[23] Damian Szklarczyk, Rebecca Kirsch, Mikaela Koutrouli, Katerina Nastou, Farrokh Mehryary, Radja Hachilif, Annika L Gable, Tao Fang, Nadezhda T Doncheva, Sampo Pyysalo, et al. The string database in 2023: protein­protein association networks and functional enrichment analyses for any sequenced genome of interest. Nucleic acids research, 51(D1):D638­D646, 2023.
[24] Khanh-Tung Tran, Dung Dao, Minh-Duong Nguyen, Quoc-Viet Pham, Barry O'Sullivan, and Hoang D Nguyen. Multi-agent collaboration mechanisms: A survey of llms. arXiv preprint arXiv:2501.06322, 2025.
[25] Mark D Wilkinson, Michel Dumontier, IJsbrand Jan Aalbersberg, Gabrielle Appleton, Myles Axton, Arie Baak, Niklas Blomberg, Jan-Willem Boiten, Luiz Bonino da Silva Santos, Philip E Bourne, et al. The fair guiding principles for scientific data management and stewardship. Scientific data, 3(1):1­9, 2016.
[26] Denis Yuen, Gary Luu, Brian O'Connor, Susheel Varma, Chris Llanwarne, Alex Kanitz, Charles Overbeck, David Mohs, Geraldine Van der Auwera, Jeff Gentry, Michael R. Crusoe, Olivier Sallou, Paolo Di Tommaso, Patrick Magee, and Yasset Perez-Riverol. ga4gh/toolregistry-service-schemas: 2.0.1, September 2022.
11

