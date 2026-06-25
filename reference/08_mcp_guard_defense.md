> Auto-extracted plain text from [`08_mcp_guard_defense.pdf`](./08_mcp_guard_defense.pdf) via `pdftotext`. Tables, figures, and multi-column layout are not preserved here â€” consult the PDF for those.

MCP-Guard: A Defense Framework for Model Context Protocol Integrity in Large Language Model Applications

Wenpeng Xing1*, Zhonghao Qi2*, Yupeng Qin3, Yilin Li3, Caini Chang3, Jiahui Yu3, Changting Lin3,5, Zhenzhen Xie4, Meng Han1,5
1 Zhejiang University 2 The Chinese University of Hong Kong 3 Binjiang Institute of Zhejiang University University 5 GenTel.io

4 Shandong

arXiv:2508.10991v2 [cs.CR] 22 Aug 2025

Abstract
The integration of Large Language Models (LLMs) with external tools via protocols such as the Model Context Protocol (MCP) introduces critical security vulnerabilities, including prompt injection, data exfiltration, and other threats. To counter these challenges, we propose MCP-Guard, a robust, layered defense architecture designed for LLM­tool interactions. MCP-Guard employs a three-stage detection pipeline that balances efficiency with accuracy: it progresses from lightweight static scanning for overt threats and a deep neural detector for semantic attacks, to our fine-tuned E5-based model achieves 96.01% accuracy in identifying adversarial prompts. Finally, a lightweight LLM arbitrator synthesizes these signals to deliver the final decision while minimizing false positives. To facilitate rigorous training and evaluation, we also introduce MCP-AttackBench, a comprehensive benchmark of over 70,000 samples. Sourced from public datasets and augmented by GPT-4, MCP-AttackBench simulates diverse, real-world attack vectors in the MCP format, providing a foundation for future research into securing LLM-tool ecosystems.
Introduction
The integration of Large Language Models (LLMs) with external tools and services has unlocked unprecedented capabilities, enabling complex, automated workflows in realworld applications such as automated customer support, data analysis pipelines, and enterprise security monitoring. Protocols like the Model Context Protocol (MCP) are central to this evolution, providing a standardized framework for seamless communication between LLMs and various tools (Anthropic 2025). However, this expanded attack surface also introduces critical security vulnerabilities (Hou et al. 2025). Malicious actors can exploit these interactions through attacks like prompt injection, data exfiltration, and adversarial manipulation, compromising system integrity, leaking sensitive data, or triggering unauthorized actions (Kumar and Girdhar 2025; Song et al. 2025). Existing security measures often fall short, as they are typically designed for traditional software and struggle to address the nuanced, semantic-based threats inherent in LLM-driven ecosystems
*Equal contribution. Corresponding author.

(Li and Fung 2025). To bridge this security gap, we introduce MCP-Guard, a robust, modular, and practical defense architecture specifically designed to detect and mitigate threats within MCP interactions in real-time, making it suitable for deployment in high-stakes environments like enterprise systems and cloud services. Unlike generic security solutions (Hou et al. 2025; Song et al. 2025), MCP-Guard employs a multi-stage detection pipeline that balances computational efficiency with deep, contextual analysis, achieving low-latency processing (under 2 ms for most cases in Stage 1) while maintaining high detection rates. The architecture systematically escalates from lightweight, pattern-based checks to advanced neural network-based detection and LLM-powered arbitration, ensuring that resource-intensive analyses are reserved for only the most evasive threats. This layered approach not only enables rapid identification of obvious attacks but also uncovers complex, semanticlevel manipulations, all while supporting hot updates for detectors, registry-free operation, and seamless scalability without introducing significant overhead or maintenance burdens. A significant challenge in developing such a defense system is the lack of standardized, comprehensive benchmarks for training and evaluation. To address this, we also present MCP-AttackBench, a large-scale, multidimensional dataset containing over 70,000 samples. This benchmark, constructed by augmenting public datasets with LLM-generated examples, simulates a wide array of realworld attack vectors specifically tailored to the MCP format. MCP-AttackBench provides a critical resource for rigorously training and evaluating security models, thereby fostering reproducible research and advancing the security of LLM-tool ecosystems in practical settings. Our contributions are twofold:
1. We propose MCP-Guard, a novel, layered defense architecture for securing LLM-tool interactions, which balances detection accuracy and efficiency, achieving approximately 89.63% accuracy and 89.07% F1-score in the full pipeline while ensuring low latency and scalability for real-world deployments.
2. We develop and will release MCP-AttackBench, a comprehensive and realistic benchmark dataset for evaluating security threats in the MCP ecosystem.

Figure 1: Overview of the MCP-Guard pipeline architecture, illustrating the three-stage defense mechanism for securing MCP interactions. The pipeline integrates a Light-Weight Static Scanning Detector, MCP-Guard Learnable Detector with E5 text embedding and fine-tuned for deep neural detection, and LLM Arbitration.

Related Work
Recent research on securing the MCP has emphasized architectural defenses grounded in zero-trust principles, notably those in NIST SP 800-207 (Stafford 2020). This section reviews related work on defense strategies and deployment models relevant to our proxy-based service, which filters and monitors external MCP access to protect LLMs.
Vulnerability Analysis
Research on MCP security has identified a wide range of vulnerabilities, from empirical measurements of real-world usage to specific attack vectors and limitations in existing defenses. These threats primarily stem from the open and extensible nature of the protocol, which exposes LLMs to external tools and services without sufficient safeguards. Li et al. (2025) conduct a large-scale empirical measurement of MCP plugin usage, revealing that extensive exposure of system and network resources, coupled with inadequate privilege separation, can enable privilege escalation and data tampering. They propose detailed taxonomies for resource access but do not extend to concrete runtime enforcement mechanisms, highlighting a gap in practical implementation. Hasan et al. (2025) investigate the maintainability and security of nearly 2,000 open-source MCP servers, uncovering unique vulnerability patterns and code quality issues that evade detection by standard software engineering tools. Their findings underscore the necessity for MCP-specific static analysis to address these protocol-tailored risks.
Specific Attack Vectors
Song et al. (2025) offer a systematic analysis of practical attack vectors, including tool poisoning and puppet attacks. Through user studies and proof-of-concept demonstrations, they illustrate the inadequacies of current audit mechanisms in preventing such exploits. Wang et al. (2025) demonstrate how attackers can manipulate tool preferences by crafting

malicious metadata, achieving high success rates via direct or genetic-based strategies while maintaining stealth. This highlights the vulnerability of MCP's tool selection processes to subtle adversarial interference. Additional systemlevel threats are explored by Fang et al. (2025), who advocate for enhanced red-teaming practices and introduce SafeMCP, an evaluation framework that shows how malicious third-party services can circumvent existing defenses.
Zero-Trust Architectures for MCP
Narajala, Huang, and Habler (2025) proposed a registrybased zero-trust architecture with administrator-controlled registration and dynamic trust scoring to mitigate tool squatting and poisoning. This centralized approach ensures reliable tool verification but introduces latency and maintenance burdens in dynamic settings. In comparison, MCP-Guard's proxy design enables registry-free, real-time filtering via Stage 1's lightweight static scanning by pattern-based detectors (e.g., for SQL injection and sensitive files), enhancing scalability without static dependencies.
Bhatt, Narajala, and Habler (2025) advanced this with OAuth-enhanced policy-based access control, using cryptographic checks to prevent tool poisoning and rug pull attacks. Their fine-grained enforcement offers strong identity verification, akin to MCP-Guard's threat mitigation goals, yet repeated validations increase overhead. MCP-Guard addresses this by reserving intensive checks for Stages 2 and 3, optimizing efficiency through a fail-fast pipeline.
These works emphasize pre-deployment verification but fall short on runtime flexibility for evolving threats, including defenses against external third-party tool attacks or malicious content pulls. MCP-Guard tackles these limitations via its layered proxy structure, enabling registry-free, realtime filtering, providing ongoing semantic-aware protection that enhances scalability and adaptability without static dependencies.

Deployment Frameworks with Gateways
Kumar and Girdhar (2025) developed MCP Guardian, a middleware gateway integrating authentication, rate limiting, WAF scanning (regex-based), and logging for defensein-depth. Brett (2025) proposed a modular MCP Gateway for enterprise self-hosted environments, centralizing OAuth 2.1 authentication, rate limiting, and intrusion detection (via CrowdSec) while isolating backend servers through WireGuard tunnels. This architecture aligns closely with MCP-Guard's proxy-based approach, offering robust security through Traefik's middleware and zero-trust tunneling to mitigate data exfiltration and injection attacks. Their proofof-concept demonstrates effective request blocking (e.g., unauthenticated or excessive requests), but like Kumar et al., it lacks learnable detection modules and quantitative reliability metrics (e.g., precision, recall).
MCP-Guard simplifies deployment with a unified threestage pipeline, incorporating hot-updatable detectors and a custom benchmark for comprehensive evaluation across diverse attack type, achieving measurable improvements in detection accuracy (e.g., from 74.55% to 96.11%) and reliability.

Detector (H-o-t-|\b{OR}\b|\b{AND}\b).*(=|LIKE), update Ena<b\lse*dscript\b, on\w+\s*=

Model Finetunable
Model Outputs "Unsure"

SQL Injection Detector

Inject

SQL

Script

Figure 2: SQL Injection Attack

2. Sensitive File Detector: The Sensitive File Detector prevents information leakage by identifying sensitive file paths (e.g., .ssh/, .env) with patterns like:
\.ssh/, \.env\b, /etc/passwd
Sensitive File Detector

File Path

File System

Figure 3: Sensitive File Detector

MCP-Guard
MCP-Guard is a defense architecture for detecting threats in MCP interactions and processes. Its modular structure supports efficiency and scalability. To thoroughly assess detection efficacy and robustness, we also created MCPAttackBench, a benchmark dataset of diverse attack vectors and real-world scenarios.
To optimize both efficiency and security, MCP-Guard organizes its detectors into a layered detection pipeline comprising three stages: Lightweight Static Scanning by Patternbased Detectors (Stage 1, implementing a fail-fast strategy with lightweight detectors for quick filtering of obvious threats, minimizing computations and supporting cost control), Deep Neural Detection (Stage 2, applying resourceintensive methods for complex cases), and Intelligent Arbitration (Stage 3, intelligent decision-making powered by LLMs to enhance accuracy and reduced false positives). This framework balances security and performance through key principles: efficiency via fail-fast mechanisms in Stage 1, cost control by reserving advanced resources for Stages 2­3, layered defense progressing from simple pattern matching in Stage 1 to comprehensive analyses in Stages 2­3 for a reliable final result.
Stage 1: Lightweight Static Scanning by Pattern-based Detectors
This stage uses fast, pattern-based detectors to filter obvious threats, minimizing computational overhead. If a high-risk issue is detected, the pipeline halts, optimizing resource usage.
1. SQL Injection Detector: The SQL Injection Detector targets SQL injection attacks using predefined regular expression patterns, such as:

3. Shadow Hijack Detector: The Shadow Hijack Detector identifies masquerading calls and instruction tampering using regex patterns, such as:
\bspoofed\s+call\b, \bfake\s+server\b, \bhidden\s+invoke\b

Checking

Rules

Tools Info Sever&Tools

Figure 4: Shadow Hijack Detector

4. Prompt Injection Detector: Combines three key features: 1) a case-insensitive keyword filter for spotting risky tokens tied to control, exfiltration, and fraud; 2) regex patterns from JSON configs to catch covert or obfuscated instructions; 3) a hot-update mechanism for real-time tuning and adaptation to emerging threats.

\b(keyword1|keyword2|keyword3)\b \bignore\s+previous\b \bexecute\s+hidden\b <script[^>]*>.*?</script>

5. Important Tag Detector:
The detector first captures the <IMPORTANT> tag to expose covert injection carriers embedded in tool descriptions. It can be extended to scan additional highrisk HTML tags (e.g., <script>, <iframe>, and <form>) to mitigate code-injection and cross-site request forgery (CSRF) threats. All patterns are matched with case-insensitive regular expressions, for example:

Prompt Injection Detector
Extended Functionalities
Figure 5: Prompt Injection Detector
<\s*important\b
Important Tag Detector
"IMPORTANT", "IFRAME", "SCRIPT""OBJECT", "EMBED","APPLET", "FORM", "FILE_INPUT".........
Figure 6: Important Tag Detector
6. Shell Injection Detector: Identifies shell command injection in user inputs using pattern matching, heuristic rules, and lexical analysis to detect suspicious sequences and special characters common in such exploits.
\b(sh\b|bash\b|curl\b|rm\b|...)\b
Shell Injection Detector
"BACKTICK_EXEC", "DOLLAR_PAREN",
"RM_RISK"...
Figure 7: Shell Injection Detector
7. Cross-Origin Detector: The Cross-Origin Detector identifies unauthorized external server references by comparing against a dynamically loaded whitelist, using patterns like: \bexternal-server\b \bthird-party-api\b \bforeign-host\b
All detectors in Stage 1 support hot updates, enabling them to quickly adapt to new attack samples without interrupting service, thereby enhancing the system's real-time defense capability.
Stage 2: Deep Neural Detection After Stage 1 filtering, Stage 2 employs the MCPGuard Learnable Detector, which, though more resourceintensive, tackles hidden adversarial prompts within the MCP ecosystem.
The detector starts with the multilingual E5 text embedding model (Li et al. 2024), pretrained through contrastive learning on billions of semantically aligned multilingual text

Host

A

Use A

and B

A

Sever A Info Sever A

B
Sever B

Figure 8: Cross-Origin Detector

Uncertain Probability
Unsafe

LLM Arbitration

Safe

Unsafe

Input DNN Output

Safe

MCP-Guard

Learnable Detector

MCP-Host

Prob. > Threshold:Unsafe
MaliciousProb. < Threshold:Safe Probability
Figure 9: Processing pipeline of the MCP-Guard Learnable Detector and Intelligent Arbitration.

pairs from varied sources aimed at injection attack detection, and is then fine-tuned using MCP-AttackBench's training dataset.
Due to notable disparities between our dataset and the pre-trained model's original training data, we fine-tune the entire set of weights--instead of limiting to the classification layer--to more accurately grasp the target semantics. Optimization relies on the cross-entropy loss function:

1N

L=- N

[yi log(y^i) + (1 - yi) log(1 - y^i)] (1)

i=1

where N is the number of samples, yi the true label for the i-th sample, and y^i the predicted probability. Our finetuning process substantially enhanced detection accuracy
from 65.37% to 96.01%.

Stage 3: Intelligent Arbitration
Following Stage 2's neural detection, Stage 3 employs Intelligent Arbitration to independently assess input safety using an LLM, enhancing decision accuracy without relying on prior detector outputs.
We implement a streamlined mechanism where the LLM evaluates each input based on a fixed prompt template, constrained to three states: safe (S = 0), unsafe (U = 1), and uncertain (Uc = 0.5). The LLM processes inputs when triggered by Stage 2, assigning a state SLLM with probability P (SLLM|x) via a softmax function, guided solely by the following prompt:

Table 1: Pattern-based Detector Performance

Detector Name
Important Tag Detector Sensitive File Detector SQL Injection Detector Shell Injection Detector Shadow Hijack Detector Cross-Origin Detector Average
MCP-Guard (Stage 1)

Acc. (%)
100.00 100.00 96.31 94.32 86.83 93.00 95.08
74.55

Prec. (%)
100.00 100.00 95.93 92.26 79.47 88.39 92.68
97.67

Rec. (%)
100.00 100.00 96.72 96.75 99.33 99.00 98.63
38.89

F1 (%)
100.00 100.00 96.33 94.45 88.30 93.40 95.41
55.63

Time (ms)
0.00 0.05 0.11 0.05 0.20 4.80 0.87
1.79

Table 2: Dataset Categories in MCP-AttackBench

Category
Puppet Attack Shadow Hijack Attack Cross Origin Attack SQL Injection Attack Tool-name Spoofing <IMPORTANT> Tag Command Injection Attack Data-exfiltration attack Prompt Injection Attack Jailbreak Instruction Attack
Total

Number of Samples
100 300 628 128 88 40 519 147 326 68,172
70,448

SYSTEM PROMPT
"You are a security auditor. Analyze the following tool description and respond with exactly one word: 'safe' if clearly safe, 'unsafe' if clearly malicious, 'unsure' if uncertain about safety."
If SLLM  {S, U }, the decision is forwarded to the MCPHost. For SLLM = Uc, the system defaults to the Learnable Detector's malicious probability P (y|x) from Stage 2, comparing it against a threshold Tu (e.g., 0.45): if P (y|x) > Tu, the input is unsafe; otherwise, it is safe. This hybrid approach, depicted in Figure 9, combines LLM's independent judgment with neural backup for robust outcomes across diverse attacks.
Extra: Remote Signature Detector
Sends tool specs via JSON to external analyzers, parses results for threat verification, and returns structured, actionable responses--enabling flexible, real-time integration. The scope of our evaluation excludes any remote signature detectors that rely on external, third-party services. This decision was made to eliminate uncertainties arising from external variables--such as network latency, service availability, and

data privacy concerns--ensuring a fair and accurate assessment of the core MCP-Guard framework's performance.
MCP-AttackBench
MCP-AttackBench comprises 70,448 samples for benchmarking multi-channel prompt attacks; its sources and structure are shown in Table 2.
· Jailbreak instruction attacks (68,172 samples). Building on GenTelBench (Li et al. 2024), we extract 38 MCP-suitable templates and use GPT-4 to generate 1,837 instruction-style attacks across 28 subclasses (e.g., ethics violation, privilege escalation). After filtering via semantic and conflict checks, we obtain 68,172 validated template­instruction pairs.
· Code-based attacks (647 samples).
­ 519 command injection payloads adapted from GitHub's Command Injection Payload List (Tasdelen 2019), targeting Windows (80.2%) and Unix/Linux (19.8%).
­ 128 SQL injection strings rewritten from Kaggle's SQL Injection Dataset (Sajid576 2021), with 15.6% from the SELECT family.
· Prompt-injection attacks (326 samples). Using GPT-4 with few-shot prompts, we synthesize 326 instructionstyle attacks across six categories, including system control, data leakage, financial fraud, and three policy-violating types targeting MCP prompt vulnerabilities.
· Data-exfiltration attacks (147 samples). Few-shot GPT-4 prompts generate 147 exfiltration attacks focused on sensitive file access (e.g., /etc/passwd, Windows registry hives).
· Tool-name spoofing & "IMPORTANT" tag (128 samples). We construct 88 tool-name spoofing and 40 "IMPORTANT" tag attacks, 28.4% of which use obfuscation.
· Tool-aware variants (1,028 samples). Based on realworld MCP-Tools (Fei, Zheng, and Feng 2025) metadata, we craft 100 Puppet, 300 Shadow-Hijack, and 628 crossorigin attacks tailored to tool usage context.
Quality control. We filter out 15% low-quality items using semantic deduplication (E5, cosine > 0.95), manual review ( > 0.8), LLM pre-filtering, and outlier detection. Validated samples are embedded into MCP tool JSON fields

Table 3: Performance Comparison of Standalone LLMs and MCP-Guard Framework Detectors

Method
GPT-4o-mini Deepseek-chat Mistral:7B Qwen2.5:0.5B Llama3:8B Tinyllama:1.1B Llama2:13B Gemma:7B Average
Pattern-based Learnable Combined
Qwen2.5:0.5B Tinyllama:1.1B Gemma:7B Mistral:7B Llama3:8B Llama2:13B GPT-4o-mini Deepseek-chat Average
MCP-Scan SafeMCP MCP-Shield

Stage

Acc. (%) Prec. (%) Rec. (%) F1 (%)

Standalone LLM Detectors

S3

95.35

92.09

96.99 94.48

S3

92.31

88.91

92.82 90.83

S3

82.81

87.92

67.36 76.28

S3

79.01

70.10

85.19 76.91

S3

75.40

97.79

40.97 57.75

S3

60.78

59.60

13.66 22.22

S3

43.59

39.85

73.61 51.71

S3

39.89

39.80

90.74 55.33

S3

71.14

72.01

70.17 65.69

MCP-Guard Framework

Early Stages (S1, S2)

S1 S2 S1+S2

74.55 96.01 95.92

97.67 96.65 95.98

38.89 93.52 93.98

55.63 95.06 94.97

Full Pipeline (S1+S2+S3)

S1+S2+S3 S1+S2+S3 S1+S2+S3 S1+S2+S3 S1+S2+S3 S1+S2+S3 S1+S2+S3 S1+S2+S3 S1+S2+S3

93.64 84.14 87.65 90.79 96.11 74.74 96.01 93.92 89.63

87.17 73.04 77.76 83.30 92.22 62.13 91.49 87.25 81.80

99.07 97.22 97.92 96.99 98.84 98.38 99.54 99.77 98.47

92.74 83.42 86.68 89.63 95.42 76.16 95.43 93.09 89.07

Competing Baselines (Powered by GPT-4o-mini)

NA

94.02

99.73

85.65 92.15

NA

79.28

66.94

98.05 79.57

NA

53.50

46.70

93.50 62.20

Time (ms)
788.38 3358.00 435.40 157.91 167.63 628.82 1490.20 413.74 930.01
1.79 55.06 49.12
143.70 333.18 194.65 157.25 91.47 232.51 505.90 1988.17 455.86
613.19 2292.84 6212.33

and labeled with attack metadata to simulate diverse threats. We also include benign samples from MCP-Tools (Fei, Zheng, and Feng 2025), detailed in the next section.
Experiment
We conduct comprehensive experiments to evaluate the effectiveness, efficiency, and adaptability of MCP-Guard.
Experimental Setup
Dataset We evaluate on a curated MCP-AttackBench subset of 2,153 adversarial examples spanning 11 categories across six threat families (Tool Poisoning, Shadow Attack, Command Injection, Prompt Injection, Rug Pull, Puppet Attack) plus 3,105 benign tool descriptions from the MCPTools corpus (Fei, Zheng, and Feng 2025), stratified 80 %/20 % at the sub-type level, preserving class balance, into training/validation splits that respectively fine-tune and benchmark a second-stage detector, with binary labels (1 = malicious, 0 = benign).

Metrics We report Accuracy, P recision, Recall, F1 score, and runtime on the MCP-AttackBench test set. Accuracy reflects overall correctness, P recision and Recall capture detection quality, F1 balances both, and runtime denotes average per-request latency.
Implementation Details Model training was conducted on an NVIDIA A100 GPU with 40 GB memory. Inference and evaluation experiments were performed locally on a Linux server running Ubuntu 20.04 with kernel version 5.15. The system is equipped with dual AMD EPYC 7763 CPUs, providing 128 physical cores (256 threads), 503GB of RAM, and 1 NVIDIA RTX 4090 GPU (24GB VRAM). The GPU driver version is 575.51.03 with CUDA 12.9. To balance stability and diversity, the Stage 3 LLM used a temperature of 0.7 and a top-k of 50.
Competing Baselines Below we briefly situate the three open-source baselines whose public code lets us run headto-head evaluations: SafeMCP (Fang et al. 2025) employs a two-layer defense--local whitelist/regex gating followed

by LLaMA-Guard and OpenAI Moderation--to block tool poisoning, server-name collisions, command injections, and rug-pull attacks. MCP-Shield (Kryzhanouski 2024) performs rule-based static analysis of MCP JSON plus an optional Claude-powered semantic pass to surface tool poisoning, cross-origin shadow hijacks, data-exfiltration paths, and sensitive-file leaks. MCP-Scan (Invariant-Labs 2024) pairs offline static audits with a live proxy monitor to catch prompt injections, tool poisoning, shadowing, rug-pull replacements, and toxic data flows.
All baselines are evaluated on the same GPT-4o-mini backend, with suspicious and malicious tags merged into a single unsafe class to yield a uniform binary metric across systems.
Experimental Results
Performance of Individual Pattern-based Detectors (Stage 1) Table 1 details the performance of each patternbased detector in Stage 1, evaluated independently on relevant subsets of MCP-AttackBench tailored to their target threats (e.g., SQL injection samples for the SQL Injection Detector). These detectors achieve exceptionally high precision and recall for obvious threats, with averages exceeding 95% across metrics for most components, operating in sub-millisecond times (0.08 ms on average except the CrossOrigin Detector), underscoring Stage 1's fail-fast efficiency.
The overall Stage 1 performance of MCP-Guard yields 74.55% accuracy, 97.67% precision, 38.89% recall, and 55.63% F1-score, prioritizing high-confidence detections to minimize false positives. This result, distinct from individual detector averages, reflects a re-evaluation on the full validation set after keyword optimization. Initial keyword settings produced low false negatives but high false positives, misclassifying benign samples. Given MCP-Guard's multistage architecture, where false negatives can be addressed in Stages 2 and 3 but false positives lead to immediate rejection, precision is paramount. By refining keywords and increasing the matching threshold, Stage 1 achieves the highest precision (97.67%) across all stages, ensuring minimal erroneous rejections while supporting subsequent threat detection.
Performance of Learnable Detector (Stage 2) As shown in Table 3, MCP-Guard Learnable Detector achieves 96.01% accuracy and an 95.06% F1-score on the full test set, marking a substantial improvement over the pre-trained baseline (from 65.37% to 96.01% accuracy post-fine-tuning). This gain stems from full-weight fine-tuning on MCPAttackBench, enabling the model to capture domain-specific nuances like tool-poisoning semantics that generic embeddings overlook.
The detector's precision (97.67%) and recall (93.52%) highlight its effectiveness in reducing false negatives for subtle attacks, such as prompt injection or shadow hijacks, while maintaining a low inference time of 55.06 ms. When combined with Stage 1 (S1+S2), performance surges to 95.92% accuracy and 94.97% F1-score, with only a latency of 49.12 ms. This synergistic effect demonstrates the pipeline's layered advantage: Stage 1 filters 38.89% of

threats upfront, allowing Stage 2 to focus computational resources on ambiguous cases, resulting in a 1.2× efficiency boost over standalone neural detection.
Full Pipeline Performance (Stage 1+2+3)
Comparison with Standlone LLM Detectors Integrating Stage 3's LLM-powered arbitration yields the complete MCP-Guard framework's results, as summarized in Table 3. Across eight diverse LLMs--from lightweight models like Qwen2.5: 0.5B to advanced ones like GPT-4o-mini--the full pipeline (S1+S2+S3) achieves an average accuracy of 89.63%, precision of 81.80%, recall of 98.47%, and F1score of 89.07%, with a mean detection time of 455.86 ms. This represents a remarkable improvement gain over standalone LLM detectors (average 71.14% accuracy, 65.69% F1-score), while reducing average latency by 51.19% (from 934.01 ms).
Focused comparison with three baselines The bottom block of Table 3 contrasts our multi-stage detector (GPT4o-mini, S1 + S2 + S3) with three representative baselines: MCP-Scan (Invariant-Labs 2024), SafeMCP (Fang et al. 2025), and MCP-Shield (Kryzhanouski 2024). Across all cases, our approach achieves a consistent recall of 99.54%, significantly reducing the risk of false negatives--especially notable compared to MCP-Scan's 85.65% and MCPShield's 93.50%. While precision sees a modest decline relative to MCP-Scan, it improves substantially over the other two baselines. Furthermore, our method dramatically shortens detection latency--from 2, 292.84ms (SafeMCP) and 6, 212.33ms (MCP-Shield) to just 505.90ms--yielding up to a 12× speed-up, which is crucial for real-time defence under tight SLA constraints. These results confirm the method's practical superiority in both detection quality and deployment efficiency.
Conclusion
In this paper, we introduced MCP-Guard, a modular and efficient defense architecture designed to secure interactions between Large Language Models (LLMs) and external tools via the Model Context Protocol (MCP). By implementing a multi-stage pipeline that combines lightweight pattern-based scanning, advanced neural detection, and intelligent LLM arbitration, MCP-Guard effectively detects and mitigates a wide range of threats, including prompt injection, data exfiltration, and adversarial manipulations. Our extensive experiments on the newly developed MCPAttackBench dataset--comprising over 70,000 diverse samples--demonstrate that MCP-Guard achieves approximately 89.63% accuracy and 89.07% F1-score in its full pipeline, with exceptional recall and low latency (under 2 ms for Stage 1 processing). This layered approach not only ensures high detection efficacy but also emphasizes practicality through features like hot-updatable detectors, registryfree operation, and scalability, making it well-suited for realtime deployment in enterprise environments. The release of MCP-AttackBench further contributes to the field by providing a standardized, comprehensive benchmark for training and evaluating MCP security systems, promoting repro-

ducible research and addressing the gap in realistic datasets for LLM-tool ecosystems. Overall, MCP-Guard represents a practical advancement in securing LLM-driven workflows, reducing vulnerabilities while minimizing computational overhead.
Future work could explore integrating MCP-Guard with emerging LLM architectures, expanding MCP-AttackBench to include more dynamic attack scenarios, and conducting field trials in production systems to validate its long-term robustness and adaptability against evolving threats. By fostering secure and efficient LLM-tool integrations, our work paves the way for safer adoption of AI in critical applications.

Limitations
The system assumes MCP as the primary protocol, but LLMs interact via various interfaces (e.g., APIs, plugins). Generalization to non-MCP ecosystems isn't tested. Network delays could amplify the reported time.

References

Anthropic. 2025. Introducing the Model Context Protocol. https://www.anthropic.com/news/model-contextprotocol. Accessed: 2025-08-1.

Bhatt, M.; Narajala, V. S.; and Habler, I. 2025. ETDI: Mitigating Tool Squatting and Rug Pull Attacks in Model Context Protocol (MCP) by using OAuth-Enhanced Tool Definitions and Policy-Based Access Control. arXiv preprint arXiv:2506.01333.

Brett, I. 2025. Simplified and Secure MCP Gateways for Enterprise AI Integration. Preprint. Available at https:// independent.academia.edu/ivobrett.

Fang, J.; Yao, Z.; Wang, R.; Ma, H.; Wang, X.; and Chua, T.-S. 2025. We Should Identify and Mitigate Third-Party Safety Risks in MCP-Powered Agent Systems. arXiv preprint arXiv:2506.13666v1.

Fei, X.; Zheng, X.; and Feng, H. 2025. MCP-Zero: Active Tool Discovery for Autonomous LLM Agents. arXiv preprint arXiv:2506.01056v4.

Hasan, M. M.; Li, H.; Fallahzadeh, E.; Rajbahadur, G. K.; Adams, B.; and Hassan, A. E. 2025. Model Context Protocol (MCP) at First Glance: Studying the Security and Maintainability of MCP Servers. arXiv preprint arXiv:2506.13538v4. To appear in ACM Transactions on Software Engineering and Methodology.

Hou, X.; Zhao, Y.; Wang, S.; and Wang, H. 2025. Model Context Protocol (MCP): Landscape, Security Threats, and Future Research Directions. arXiv preprint arXiv:2503.23278. Huazhong University of Science and Technology, China.

Invariant-Labs. 2024. MCP-Scan: A Lightweight Security Detection Framework. https://github.com/invariantlabs-ai/ mcp-scan. Accessed: 2025-07-31.

Kryzhanouski, N. 2024.

MCP-Shield: Safety-

Constrained Multi-Agent Path Planning.

https:

//github.com/riseandignite/mcp-shield. Accessed: 2025-07-

31.

Kumar, S.; and Girdhar. 2025. MCP Guardian: A SecurityFirst Layer for Safeguarding MCP-Based AI System. Computer Science & Information Technology (CS & IT), 108­ 120. Preprint available at arXiv:2504.12757v2.
Li, M. Q.; and Fung, B. C. M. 2025. Security Concerns for Large Language Models: A Survey. arXiv preprint arXiv:2505.18889.
Li, R.; Chen, M.; Hu, C.; Chen, H.; Xing, W.; and Han, M. 2024. Gentel-safe: A unified benchmark and shielding framework for defending against prompt injection attacks. arXiv preprint arXiv:2409.19521.
Li, Z.; Li, K.; Ma, B.; Xu, M.; Zhang, Y.; and Cheng, X. 2025. We Urgently Need Privilege Management in MCP: A Measurement of API Usage in MCP Ecosystems. arXiv preprint arXiv:2507.06250.
Narajala, V. S.; Huang, K.; and Habler, I. 2025. Securing GenAI Multi-Agent Systems Against Tool Squatting: A Zero Trust Registry-Based Approach. arXiv preprint arXiv:2504.19951.
Sajid576. 2021. SQL Injection Dataset. https: //www.kaggle.com/datasets/sajid576/sql-injectiondataset?resource=download. Accessed: 2025-07-31.
Song, H.; Shen, Y.; Luo, W.; Guo, L.; Chen, T.; Wang, J.; Li, B.; Zhang, X.; and Chen, J. 2025. Beyond the Protocol: Unveiling Attack Vectors in the Model Context Protocol Ecosystem. arXiv preprint arXiv:2506.02040.
Stafford, V. 2020. Zero trust architecture. NIST special publication, 800(207): 800­207.
Tasdelen, I. 2019. Command Injection Payload List. https://github.com/payloadbox/command-injectionpayload-list/tree/master. Accessed: 2025-07-31.
Wang, Z.; Li, H.; Zhang, R.; Liu, Y.; Jiang, W.; Fan, W.; Zhao, Q.; and Xu, G. 2025. MPMA: Preference Manipulation Attack Against Model Context Protocol. arXiv preprint arXiv:2506.02040.

