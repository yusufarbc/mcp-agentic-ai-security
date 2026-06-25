> Auto-extracted plain text from [`12_mcp_transport_systems.pdf`](./12_mcp_transport_systems.pdf) via `pdftotext`. Tables, figures, and multi-column layout are not preserved here â€” consult the PDF for those.

arXiv:2508.19239v1 [cs.AI] 26 Aug 2025

Model Context Protocols in Adaptive Transport Systems: A Survey
GAURAB CHHETRI, Texas State University, USA SHRIYANK SOMVANSHI, Texas State University, USA MD MONZURUL ISLAM, Texas State University, USA SHAMYO BROTEE, Texas State University, USA MAHMUDA SULTANA MIMI, Texas State University, USA DIPTI KOIRALA, Texas State University, USA BIPLOV PANDEY, Texas State University, USA SUBASISH DAS, PH.D., Texas State University, USA
The rapid expansion of interconnected devices, autonomous systems, and AI applications has created severe fragmentation in adaptive transport systems, where diverse protocols and context sources remain isolated. This survey provides the first systematic investigation of the Model Context Protocol (MCP) as a unifying paradigm, highlighting its ability to bridge protocol-level adaptation with context-aware decision making. Analyzing established literature, we show that existing efforts have implicitly converged toward MCP-like architectures, signaling a natural evolution from fragmented solutions to standardized integration frameworks. We propose a five-category taxonomy covering adaptive mechanisms, context-aware frameworks, unification models, integration strategies, and MCP-enabled architectures. Our findings reveal three key insights: traditional transport protocols have reached the limits of isolated adaptation, MCP's client-server and JSON-RPC structure enables semantic interoperability, and AI-driven transport demands integration paradigms uniquely suited to MCP. Finally, we present a research roadmap positioning MCP as a foundation for next-generation adaptive, context-aware, and intelligent transport infrastructures.
CCS Concepts: · Networks  Network protocol design; · Software and its engineering  Middleware; · Information systems  Data integration; · Computing methodologies  Distributed artificial intelligence; · Computer systems organization  Embedded and cyber-physical systems.
Additional Key Words and Phrases: Model Context Protocol, semantic interoperability, context-aware systems, adaptive transport protocols, JSON-RPC, client­server, AI-driven systems, autonomous systems, Internet of Things
ACM Reference Format: Gaurab Chhetri, Shriyank Somvanshi, Md Monzurul Islam, Shamyo Brotee, Mahmuda Sultana Mimi, Dipti Koirala, Biplov Pandey, and Subasish Das, Ph.D.. 2025. Model Context Protocols in Adaptive Transport Systems: A Survey. ACM Comput. Surv. 1, 1 (August 2025), 29 pages. https://doi.org/XXXXXXX.XXXXXXX
Authors' Contact Information: Gaurab Chhetri, gaurab@txstate.edu, Texas State University, San Marcos, Texas, USA; Shriyank Somvanshi, shriyank@txstate.edu, Texas State University, San Marcos, Texas, USA; Md Monzurul Islam, monzurul@ txstate.edu, Texas State University, San Marcos, Texas, USA; Shamyo Brotee, nmx23@txstate.edu, Texas State University, San Marcos, Texas, USA; Mahmuda Sultana Mimi, qnb9@txstate.edu, Texas State University, San Marcos, Texas, USA; Dipti Koirala, yfn21@txstate.edu, Texas State University, San Marcos, Texas, USA; Biplov Pandey, iub14@txstate.edu, Texas State University, San Marcos, Texas, USA; Subasish Das, Ph.D., subasish@txstate.edu, Texas State University, San Marcos, Texas, USA.
Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. Copyrights for components of this work owned by others than the author(s) must be honored. Abstracting with credit is permitted. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee. Request permissions from permissions@acm.org. © 2025 Copyright held by the owner/author(s). Publication rights licensed to ACM. ACM 1557-7341/2025/8-ART https://doi.org/XXXXXXX.XXXXXXX
ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

2

Chhetri et al.

1 Introduction
1.1 The Transport System Fragmentation Crisis
Modern distributed computing and transportation infrastructures are experiencing an escalating fragmentation crisis that threatens the effectiveness of intelligent, adaptive systems. As applications expand into increasingly diverse environments ranging from autonomous vehicles navigating urban traffic to Internet of Things (IoT) sensors coordinating across heterogeneous networks, the long-standing assumption of protocol isolation has become a critical limitation [1, 2]. Traditional transport protocols such as Transport Control Protocol (TCP) and User Datagram Protocol (UDP), originally designed for relatively stable conditions, now operate in ecosystems where context evolves rapidly and unpredictably. Network topologies shift as vehicles move across cellular coverage zones, application requirements change dynamically based on safety demands, and environmental factors continually alter communication strategies [3, 4].
This fragmentation manifests in three distinct dimensions. First, protocol fragmentation occurs when diverse mechanisms, such as QUIC for web applications, specialized vehicular protocols for Vehicle-to-Everything (V2X), and lightweight IoT protocols, function in isolation, each making adaptation decisions based on limited scope [2, 5]. Second, context fragmentation arises as sensing systems, application monitors, and network telemetry generate rich contextual data that remain trapped in domain-specific silos, inhibiting holistic optimization [6, 7]. Finally, decision fragmentation results from adaptation strategies being implemented independently across layers and subsystems, producing conflicting policies, inefficient resource allocation, and missed coordination opportunities [8, 9].
The consequences extend beyond inefficiency. In autonomous transportation, lack of shared context between vehicle control, traffic management, and communication layers can cause safetycritical failures. In edge computing, fragmented adaptation can degrade service quality, waste energy, and reduce user experience. Across domains, the absence of standardized context exchange mechanisms hinders the realization of intelligent infrastructures capable of leveraging comprehensive situational awareness for coordinated adaptation [10, 11].
1.2 Why MCP matters: emergent paradigm for unification
Model Context Protocols (MCP) have recently emerged as a promising paradigm to address this systemic fragmentation by standardizing how context is represented and exchanged across heterogeneous systems [12]. Originally designed to enable integration between artificial intelligence (AI) models and external data sources, MCP introduces architectural principles that directly align with the needs of adaptive transport infrastructures. Unlike domain-specific middleware or point-topoint adapters, MCP provides a protocol-level mechanism that facilitates semantic interoperability across distributed environments.
MCP's foundational design offers several advantages. Its persistent client­server architecture supports long-lived sessions that maintain contextual state across dynamic conditions, an essential property for safety-critical applications such as vehicle coordination [13]. Its JavaScript Object Notation­Remote Procedure Call (JSON-RPC) messaging framework enables structured and semantically rich communication, embedding not only raw data but also metadata on validity, uncertainty, and provenance [14]. In addition, its capability negotiation mechanisms allow systems to dynamically discover resources and orchestrate tools, enabling heterogeneous agents to cooperate without prior configuration [15].
Consider an urban intersection scenario: an autonomous vehicle must coordinate with traffic signals, nearby vehicles, pedestrian detection infrastructure, and emergency service networks. In fragmented systems, each entity adapts independently, protocol stacks select routes based on

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

3

local metrics, traffic lights adjust timing from isolated sensors, and emergency vehicles request priority through incompatible channels. By contrast, an MCP-enabled environment would allow all entities to exchange standardized context: traffic density from roadside sensors, urgency from emergency vehicles, pedestrian intention forecasts from vision systems, and capacity predictions from cellular operators. Such coordinated context exchange would enable adaptation strategies that jointly optimize safety, efficiency, and service quality [16].
1.3 Research Gap and Opportunity
Despite MCP's potential, its application to adaptive transport systems remains underexplored. Transport protocol research has predominantly emphasized protocol-specific optimizations, such as congestion control, error recovery, and quality-of-service (QoS) improvements, without addressing the broader issue of cross-system integration [17, 18]. In parallel, context-aware computing has produced advanced frameworks for acquisition, representation, and reasoning, yet these have not been systematically tailored to transport requirements [7, 19]. Existing surveys typically treat adaptive protocols, context-aware frameworks, and integration models as separate strands, overlooking their natural convergence.
This gap presents a timely opportunity to investigate MCP as a unifying paradigm. Systematically analyzing MCP in the context of transport challenges can provide both theoretical foundations and architectural patterns for future unified infrastructures. The timing is particularly significant: MCP is still in the process of standardization, creating space to shape its evolution while the transport systems community actively seeks solutions to the limitations imposed by fragmentation.
1.4 Contributions and Methodology
This survey offers the first comprehensive investigation of the MCP as a unifying framework for adaptive transport systems. The study integrates systematic literature analysis with architectural synthesis to position MCP within ongoing developments in adaptive protocols and context-aware computing. The primary contributions are as follows:
(1) A taxonomy is introduced that organizes the field into five categories: Adaptive Protocol Mechanisms, Context-Aware Frameworks, Unification Models, Transport System Integration, and MCP-Enabled Architectures. This taxonomy highlights connections across domains and demonstrates how prior developments have implicitly converged toward MCP-like solutions.
(2) An analysis of MCP's architectural implications for transport systems is presented, focusing on the client­server structure, JSON-RPC messaging patterns, resource discovery mechanisms, and contextual decision-making frameworks, positioning MCP as a shift toward semantic interoperability.
(3) A systematic evaluation of integration patterns in transport systems is conducted, showing how MCP's standardized context exchange can address protocol, context, and decision fragmentation.
(4) A research roadmap is developed, identifying open challenges and future directions, including AI-driven adaptation strategies, edge integration, quantum communication, and autonomous system coordination.
(5) A practical foundation for MCP adoption is established through the curated repository awesome-mcp1, which compiles tools, libraries, research papers, and tutorials to support both researchers and practitioners.
1https://github.com/gauravfs-14/awesome-mcp

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

4

Chhetri et al.

Fig. 1. Paper organization and flow
1.5 Organization of the Survey The remainder of this article is structured as follows. Section 2 reviews related work in adaptive transport protocols and context-aware systems. Section 3 introduces our taxonomy of unifying models. Sections 5 through 4 analyze each category in detail. Section 8 discusses open challenges and limitations, while the final section outlines future research directions and conclusions. Through this structure, we aim to provide both a comprehensive synthesis of the current state of the field and a roadmap for advancing unified adaptive transport systems. Figure 1 highlights the paper structure and flow.
2 Background and Related Work 2.1 Evolution of Adaptive Transport Systems and the Role of Context Adaptive transport systems have advanced rapidly with the convergence of artificial intelligence, real-time data analytics, and ubiquitous connectivity. These systems integrate heterogeneous sensing modalities, communication interfaces, and decision-making algorithms to dynamically respond to operational changes [20­23]. Contemporary deployments increasingly require realtime context awareness to adapt to fluctuating traffic conditions, evolving user demands, and environmental constraints.
Adaptive Traffic Control Systems (ATCS) illustrate this shift by employing real-time detection and machine learning techniques to optimize signal timings based on current conditions rather than fixed schedules [20, 24]. Such approaches have been shown to reduce travel time, congestionrelated delays, and emissions [20, 25]. Similarly, adaptive multimodal integration strategies combine fixed-route and demand-responsive services within unified frameworks [21], improving first- and last-mile access and reducing user costs. Layered, user-centric architectures for multimodal systems [23] address scalability and interoperability challenges by decoupling data acquisition, analytics,
ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

5

and decision layers. This layered perspective resonates with MCP's separation of message definition, transport, and orchestration.
Machine learning has further enhanced adaptability in transport contexts, with reinforcement learning (RL) proving particularly effective [24, 26, 27]. RL-driven controllers are capable of handling non-linear dynamics, learning continuously from operational data, and adapting to scenarios not explicitly programmed [28, 29]. Emerging frameworks also integrate human behavioral feedback into adaptation loops, using cognitive state sensing and operator stress detection to inform strategies in real time [30]. Such human-aligned adaptation parallels MCP's potential to incorporate real-time human and environmental context into multi-agent workflows.
2.2 Communication and Interoperability Foundations for MCP
Adaptive transport systems depend on a variety of communication protocols, yet the central requirement for MCP is not protocol performance in isolation but the reliable exchange of semantically rich and structured context across heterogeneous systems. Traditional protocols such as TCP and UDP ensure reliable delivery, while advances in user-space transport design and application-layer integration, exemplified by QUIC, demonstrate architectural features such as integrated security, multiplexing, and reduced handshake latency that can inform MCP's communication layer [31, 32]. These characteristics are particularly relevant in variable-latency networks where MCP messages must remain synchronized across distributed agents.
Mechanisms such as multipath communication and adaptive congestion control, originally designed for throughput optimization [33, 34], also provide useful strategies for maintaining robustness under heterogeneous link conditions. These conditions are common in sensor-rich, distributed transport infrastructures. By leveraging such concepts, MCP can ensure that contextual data delivery remains timely and reliable, even in constrained or variable environments.
2.3 Context-Aware Computing and Multi-Agent Integration
Context-aware computing underpins MCP's design, enabling systems to sense, interpret, and respond to environmental, user, and system states [6, 7]. In transport domains, context may include traffic density, vehicle location, infrastructure status, or operator workload. Architectures for context-aware systems generally follow distributed, centralized, or layered designs [7, 19]. Distributed frameworks (e.g., Future Internet Ware (FIWARE), Context-aware Middleware for Ambient Assisted Living (CoCaMAAL), Big Data Context-aware Middleware (BDCaM)) improve scalability and resilience, centralized ones (e.g., Service-Oriented Context-Aware Middleware (SOCAM), Context-Aware System for Smart spaces (CASS)) provide global perspectives, and layered approaches (e.g., Context-Aware Middleware for Pervasive Ubiquitous Systems (CAMPUS), ContextAware Service Framework (CASF)) separate acquisition, reasoning, and service delivery. MCP can operate across these paradigms by offering a standardized, protocol-agnostic method for sharing context between layers and nodes.
Ontology-based context modeling using OWL/RDF [35­37] further supports semantic richness, reasoning, and interoperability, aligning directly with MCP's goal of enabling heterogeneous agents to interpret shared information consistently. Generic ontologies permit domain-independent representation with extensions for specific applications [38], which complements MCP's extensibility. Advanced reasoning approaches combine rules, machine learning, and probabilistic models to manage uncertainty and predict context evolution [39]. When integrated into Multi-Agent Systems (MAS), these techniques produce Context-Aware Multi-Agent Systems (CA-MAS) capable of sensing, reasoning, predicting, and acting in dynamic distributed environments [6].
Middleware for ubiquitous computing increasingly incorporates Quality of Context (QoC) management [40], which prioritizes data sources based on trustworthiness, timeliness, and relevance.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

6

Chhetri et al.

Fig. 2. Interactions among entities in a Context-Aware Multi-Agent System (CA-MAS).

These principles are directly applicable to MCP's context selection and routing logic. As shown in Table 1, distributed, centralized, and layered architectures each provide distinct strengths-- scalability, unified reasoning, and modularity--while facing trade-offs in coordination, resilience, and adaptability. By integrating these established context-aware computing foundations with MCP's standardized model-to-tool interface, adaptive transport systems can achieve interoperable and context-driven operation across heterogeneous infrastructures.
Table 1. Comparison of context-aware system architectures and their relevance to MCP.

Architecture Type Examples

Strengths

Limitations

Distributed

FIWARE, CoCaMAAL, BDCaM [6]

Scalability and fault tolerance through decentralized processing; resilience against local failures.

Higher coordination overhead and consistency challenges across heterogeneous nodes [6].

Centralized

SOCAM, CASS [7, 19]

Provides a global and unified Single point of failure and lim-

view of context; simplifies rea- ited scalability in large-scale

soning and coordination.

deployments [7, 19].

Layered

CAMPUS, CASF [7, 19]

Clear separation of acquisition, reasoning, and service delivery; improves modularity and maintainability.

Potential latency due to inter-layer communication and rigidity in adapting to dynamic environments [19].

3 Taxonomy of Unifying Models for Adaptive Transport Systems This section explores a comprehensive taxonomy of unifying models for adaptive transport systems, organized into five primary categories (see Figure 3 for timeline): Adaptive Protocol Mechanisms, Context-Aware Frameworks, Unification Models, Transport System Integration, and Model Context
ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

7

Protocols. This taxonomy is derived from a systematic review of research literature and realworld implementations, building on insights from prior surveys and classification studies. In line with recent calls for integrated frameworks that can bridge the diverse components of modern mobility systems [8, 9], it offers a structured perspective for understanding how adaptation, context management, and interoperability can be combined into cohesive designs. The aim is not only to capture the breadth of mechanisms currently in use, but also to highlight how these categories relate to the emerging role of the MCP in creating more unified, intelligent, and resilient transport systems.

Fig. 3. Comprehensive taxonomy and timeline of unifying models for adaptive transport systems, showing the five primary categories and their subcategories.
3.1 Adaptive Protocol Mechanisms Adaptive Protocol Mechanisms encompass the methods and techniques that allow transport protocols to dynamically modify their behavior in response to changing network, application, and environmental conditions [17, 18]. Operating across different layers of the protocol stack, these mechanisms ensure that communication remains efficient, reliable, and responsive, even under highly variable conditions. The most established and widely studied area within this category is congestion control adaptation, where protocols adjust sending rates to maintain stability and throughput as network conditions fluctuate [17, 41, 42]. Early enhancements such as Fast Active Queue Management Transmission Control Protocol (FAST TCP), Binary Increase Congestion control (BIC), and Cubic Congestion Control for TCP (CUBIC) achieved significant improvements over traditional TCP Reno by employing more sophisticated congestion signals and nonlinear window growth functions, enabling better scalability in high-bandwidth, high-latency environments [17, 43]. FAST TCP, for example, leverages queuing delay as an explicit congestion signal, while BIC and CUBIC use historical performance trends to tune their responsiveness. More recently, reinforcement learning (RL) approaches have been explored to continuously fine-tune congestion control parameters based on real-time feedback, achieving gains in both throughput and latency
ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

8

Chhetri et al.

[41, 42]. While promising, these learning-based approaches still face challenges in ensuring fairness, stability, and predictability across heterogeneous networks.
Beyond congestion control, adaptive protocol mechanisms also address flow control optimization, which aligns the rate of data transmission with both network capacity and the receiving node's processing capabilities [4, 44]. Traditional fixed-window flow control schemes are inadequate for dynamic conditions, leading to the development of predictive and context-aware models that adjust flow windows or pacing rates in real time [44, 45]. Error recovery strategies have similarly evolved, moving from simple retransmission mechanisms to adaptive and context-aware methods that consider error causes, application tolerances, and prevailing network characteristics when selecting the recovery approach [3, 4, 18]. Bandwidth adaptation mechanisms extend these capabilities by adjusting transmission rates not only in reaction to congestion but also proactively, using forecasts of available capacity derived from contextual indicators [4, 44]. QoS management complements these efforts by ensuring that critical or latency-sensitive applications receive priority treatment, aligning network resource allocation with application requirements [3, 18]. Together, these adaptive protocol mechanisms form the operational foundation upon which higher-level context-aware and unifying frameworks can build.
3.2 Context-Aware Frameworks
Context-aware frameworks provide the infrastructure required for acquiring, interpreting, and utilizing contextual information to inform adaptation strategies within transport systems [4, 46]. They are indispensable in multi-agent and distributed transport environments, where timely and accurate context is essential for intelligent decision-making, particularly in scenarios involving autonomous vehicles, dynamic traffic signal control, or large-scale mobility-as-a-service platforms [6, 7]. Such frameworks typically incorporate mechanisms for environmental context processing, which entails monitoring network conditions, device capabilities, and operational constraints to inform adaptive responses [47, 48]. They also handle application context recognition, which focuses on understanding performance goals, operational priorities, and user-defined adaptation preferences [4, 49], as well as user behavior adaptation, where historical patterns of interaction are analyzed to optimize future system behavior [45, 49]. Effective context-aware frameworks often combine distributed network state awareness with resource availability monitoring to ensure adaptation decisions are based on the most complete and current information possible [8, 46, 47, 50]. This may involve collecting real-time telemetry from multiple points in the network, tracking computational and storage capacity, and anticipating load changes. However, because constant monitoring can be resource-intensive, many systems employ sampling strategies, predictive modeling, or selective reporting to reduce overhead while maintaining accuracy [3, 51]. By linking low-level sensing to high-level decision-making, context-aware frameworks act as a bridge between raw data and actionable intelligence, enabling adaptive protocols to function in a more targeted and effective manner.
3.3 Unification Models
While adaptive protocols and context-aware frameworks provide essential components for intelligent transport systems, Unification Models offer the architectural strategies for integrating these elements into a cohesive whole [11, 52]. These models establish the design principles that allow heterogeneous systems and mechanisms to interoperate, ensuring that adaptation is not siloed at individual protocol layers or system components. Protocol layer abstraction is one such strategy, enabling a consistent interface to be maintained even as underlying transport mechanisms change in response to network conditions [18, 53]. Service integration models extend this approach by combining multiple adaptive services, such as congestion control, error recovery, and context

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

9

processing, into unified frameworks that can address complex application requirements [8, 52]. Cross-layer optimization frameworks further break down traditional barriers between protocol layers, allowing coordinated decisions that optimize performance across the entire stack [4, 51]. While such coordination can yield substantial gains in efficiency and responsiveness, it must be balanced against the need for modularity and maintainability. Standardization frameworks and interoperability solutions address the challenges of aligning different adaptation mechanisms and context representations [5, 54, 55], often employing protocol translation, context mapping, and negotiation mechanisms to ensure compatibility between systems designed by different vendors or for different domains.
3.4 Transport System Integration Architectures
Transport System Integration addresses the embedding of adaptive transport mechanisms within larger computing and communication ecosystems [10]. In multi-modal transportation environments, this requires seamless coordination between transport protocols operating over different network types and physical media [8, 11]. The rise of the IoT has expanded these requirements, as transport protocols must now accommodate resource-constrained devices, intermittent connectivity, and heterogeneous capabilities [5, 10]. Integration with edge computing infrastructures allows for localized processing of transport adaptation logic, reducing latency and conserving bandwidth by minimizing the need for centralized computation [10, 56]. Similarly, cloud-native transport protocols are designed to exploit the elasticity, scalability, and dynamic resource allocation of cloud environments, handling scenarios such as auto-scaling, service migration, and fluctuating workloads [10, 57]. Together, these integration strategies ensure that adaptive transport mechanisms can function effectively within the diverse and evolving environments they are expected to serve.
4 Model Context Protocol (MCP): Architecture, Framework, and Mechanisms
The MCP is an open standardized framework designed to facilitate secure and structured integration between AI-powered systems and external data sources. MCP operates by allowing developers to either expose their data via MCP servers or build AI applications (referred to as MCP clients) that connect to these servers to consume contextual data [12]. As explained in figure 4, this architecture promotes secure, two-way communication between data sources and AI tools, enabling dynamic and responsive interactions. Beyond its basic client-server architecture, MCP defines a full-stack framework that includes data ingestion specifications, contextual metadata tagging, and AI interoperability standards across platforms. It plays a vital role in multi-tool agent workflows, allowing AI systems to coordinate complex operations, such as combining document search with messaging APIs to support advanced reasoning across distributed systems.
4.1 Context Representation Models
Context representation is fundamental to the MCP functionality. It defines how contextual information such as user identity, device attributes, environmental states, and application requirements is structured, interpreted, and exchanged between AI systems. MCP achieves this by offering standardized data schemas and semantics that formalize the concept of context, allowing systems to reason about dynamic environments with consistency and accuracy [58, 59]. These representations are not domain-locked; instead, MCP supports extensibility through lightweight models like ContextML [59], enabling developers to encode context as categorized areas (e.g., user, time, location) and integrate into broader agentic workflows via REST-based communication. As data increasingly shifts from static documents to dynamically assembled, context-sensitive content [60], MCP becomes essential for synchronizing AI behavior with real-time, situational changes. Its structured

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

10

Chhetri et al.

Fig. 4. MCP Architecture and Workflow
approach ensures that contextual metadata tagging, transformation, and ingestion are interoperable across platforms, whether implemented in a desktop agent, API client, or distributed service environment [12, 61]. Despite its strengths, MCP faces critical challenges in handling the complexity of real-world contexts. Modeling uncertainty, temporal dependencies, and multi-dimensional relationships requires not only semantic expressiveness but also computational scalability. While MCP's ontology-aware metadata structure provides a path toward better interoperability and reuse [62], inconsistencies still arise when formal context models fail to align with the nature of collected metadata, particularly in domains dominated by implicit or location-based context [62]. In addition, most conventional modeling languages fall short in expressing variant-heavy or fluid contextual data, which limits MCP's applicability in content-rich environments like adaptive UIs or personalized recommendation systems [60]. The protocol must also contend with the overhead introduced by maintaining persistent, bi-directional connections across clients and servers [12]. As context-aware AI continues to evolve, future MCP implementations will need to integrate more adaptive modeling layers, support fine-grained ontological reasoning, and scale effectively across both edge devices and cloud-based infrastructures.
4.2 Context Exchange Mechanisms
The Model Context Protocol (MCP) has been described in the literature as introducing flexible and extensible architectures for standardized context exchange, with the aim of supporting interaction between large language models, external tools, and user environments [61, 63]. MCP builds on a client­server paradigm, where clients run tasks within sessions and servers expose structured tools, resources, and data endpoints. A trusted host process coordinates multiple client lifecycles, maintaining control over privacy, capability advertisement, and access boundaries. To facilitate predictable and structured communication, MCP employs JSON-RPC 2.0 as its protocol foundation, which defines four message types--requests, results, errors, and notifications [63].
This message-based approach has been reported to support both real-time and asynchronous tasks, enabling queries, tool usage, and event-driven responses as required by applications [14]. Box 1 illustrates a representative JSON-RPC message structure, showing the request, response, and notification formats exchanged between MCP clients and servers. Such structuring is intended to promote consistency and interoperability across tools, clients, and servers, independent of the underlying transport layer. MCP's compatibility with multiple transport layers--stdio and
ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

11

Streamable HTTP--has been identified as enhancing its applicability across both lightweight local deployments and distributed, cloud-based multi-agent environments [14, 63].
Context sharing in MCP is designed to support a broad range of metadata, including environmental signals, system configurations, and user-specific attributes. Literature highlights that developers can exchange this information in structured formats that preserve semantic meaning while enabling interoperability [63]. MCP also provides mechanisms for clients to advertise supported features (e.g., file access or messaging) and negotiate agreements to coordinate system-wide behavior [63]. The dual-transport design allows implementers to select a communication method suited to application constraints: stdio for efficiency in embedded settings, or Streamable HTTP for more robust, event-driven communication in distributed systems [14, 63]. By supporting both modes, MCP may facilitate flexible context exchange and tool coordination, while also raising questions regarding synchronization, overhead, and alignment with evolving privacy standards [12, 59].
4.3 Contextual Decision Making
Contextual decision-making in the Model Context Protocol (MCP) has been described as relying on context modeling techniques to enable AI systems to adjust dynamically to evolving environments [58]. Through standardized mechanisms for ingesting, transforming, and tagging contextual metadata, MCP provides decision-making frameworks with access to richer information drawn from diverse domains [61]. Its client­server architecture is intended to support secure, bidirectional communication between AI-powered tools and external data sources, with the aim of informing adaptation strategies through up-to-date and authorized information. MCP has also been noted for its ability to support multi-tool workflows, where contextual reasoning integrates multiple specialized resources to deliver coordinated, near real-time responses [59].
Machine learning models are increasingly integrated into such pipelines, where they learn adaptation strategies from historical context patterns and refine decisions as operational data evolves [16, 58]. This transition from static, rule-based systems to adaptive, learning-based decisionmaking is presented in the literature as an important development in context-aware computing. Work on MCP further suggests that contextual decision-making may benefit from multi-objective optimization techniques that balance multiple goals simultaneously, such as performance, resource efficiency, and security guarantees [15, 58]. In multi-agent environments, standardized context exchange mechanisms facilitate coordination, allowing distributed agents to collaborate and make decisions that account for both local and global priorities [15]. Online learning methods embedded into MCP pipelines have been reported to improve adaptability by enabling strategies to be adjusted in real time without interrupting operations [16, 58].
Experiences from open-source machine learning collaborations also indicate potential benefits for MCP-based decision-making, particularly through the incorporation of shared improvements such as optimized parameters, refined model structures, and enhanced validation tools, which may strengthen reliability and cross-domain applicability [64]. Collectively, these features suggest that MCP could serve as an enabler of contextually adaptive and collaborative AI systems across diverse application domains.
Traditional integration approaches in adaptive transport systems have included point-to-point adapters, domain-specific middleware, service-oriented architectures, and message brokers. While each of these approaches has contributed to interoperability, their limitations in scalability, semantic expressiveness, and dynamic coordination have been widely noted. Table 2 summarizes these methods and contrasts them with MCP, illustrating their historical roles alongside the distinctive characteristics associated with MCP.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

12

Box 1: JSON-RPC Structure

// 1. Request - Client asks server to do something

1{

2 "jsonrpc": "2.0",

3 "id": "unique -request -id",

4 "method": "resources/read",

5 "params": {

6

"uri": "file:///config.json"

7}

8}

// 2. Response - Server replies with result or error

1{

2 "jsonrpc": "2.0",

3 "id": "unique -request -id",

4 "result": {

5

"contents": [{"text": "config data..."}]

6}

7}

// 3. Notification - One-way message, no response expected

1{

2 "jsonrpc": "2.0",

3 "method": "notifications/resources/changed",

4 "params": {

5

"uri": "file:///config.json"

6}

7}

Chhetri et al.

As the Table 2 shows, earlier methods primarily addressed syntactic interoperability or domainspecific challenges, often at the expense of generality and scalability. MCP extends this trajectory by incorporating semantic context exchange and capability negotiation as protocol-level primitives, positioning it as a potential unifying layer across heterogeneous transport systems.
5 Core Principles of MCP
The Model Context Protocol (MCP) has recently been proposed as a framework for unifying adaptive transport systems by standardizing secure, structured, and interoperable context exchange [12, 13]. Originally designed to support integration between AI-powered applications and external data sources, MCP operates through a client­server paradigm in which developers can expose contextual data via MCP servers or consume such data through MCP clients [12]. By defining structured context representation models, MCP allows diverse forms of contextual information--ranging from environmental telemetry to user preferences--to be encoded and interpreted consistently across systems [61]. In addition to representation, MCP specifies context exchange mechanisms that define protocols and interfaces for distributing information across heterogeneous systems [12, 65]. Contextual decision-making frameworks then use this information to inform adaptation strategies, balancing computational complexity with real-time operational constraints [13, 48, 49, 61]. In this way, MCP is discussed in the literature as a framework that may unify adaptive protocols,

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

13

Table 2. Comparison of legacy integration approaches and Model Context Protocol (MCP).

Approach

Characteristics

Limitations

Relevance to MCP References

Point-to-Point Adapters

Custom connectors High maintenance MCP replaces ad [6]

between specific sys- cost; poor scalability hoc adapters with

tems or applications. as the number of a

standardized,

systems grows.

protocol-level inter-

face.

Domain-Specific Middleware

Middleware tailored to specific domains (e.g., IoT, vehicular networks).

Limited

cross-

domain applicability;

requires domain ex-

pertise for extension.

MCP offers domainagnostic extensibility with semantic interoperability.

[7, 19]

Service-Oriented Ar- Expose functionality Syntactic interoper- MCP introduces [19]

chitectures (SOA) / through standardized ability only; lacks se- semantically rich

REST APIs

HTTP/REST services. mantic context ex- JSON-RPC messages

change; limited capa- and dynamic capabil-

bility negotiation. ity discovery.

Message Brokers (e.g., Support

pub- Efficient delivery but MCP builds on [6]

MQTT, AMQP)

lish­subscribe

weak semantic guar- message-passing but

communication for antees; limited con- standardizes context

distributed systems. text sharing beyond semantics and tool

payload.

orchestration.

Model Context Protocol (MCP)

Protocol-level standard for context representation, exchange, and orchestration.

Still emerging; adoption and standardization challenges remain.

Provides unified, extensible integration with semantic and context-awareness capabilities.

[12, 13, 15]

context-aware frameworks, and integration architectures into a coherent ecosystem for transport systems.
MCP protocol mechanisms encompass the communication and coordination techniques that enable structured context exchange between AI systems and external data sources [13, 14]. These mechanisms build on standardized client­server architectures and define how contextual information flows between distributed agents in AI-powered environments [15]. Unlike traditional transport protocols that primarily emphasize data delivery, MCP mechanisms focus on semantic context representation, capability negotiation, and resource discovery across heterogeneous tool ecosystems [16]. Prior studies indicate that this design may improve interoperability and real-time context sharing, though concerns remain regarding scalability, overhead, and the complexity of maintaining robust security boundaries across diverse applications. Current evidence suggests that MCP's strengths lie in addressing fragmentation in context sharing, while its limitations may emerge more clearly as implementations scale.
5.1 Design Philosophy
The foundational mechanism of MCP is based on a persistent client­server architecture intended to support long-lived context exchange sessions between AI applications and external data sources [13, 15]. This approach contrasts with stateless REST APIs by maintaining bidirectional connections that allow real-time updates and continuous tool interactions [14]. Literature suggests that such persistence can improve efficiency in multi-step interactions, although it may increase resource consumption since long-lived sessions can be costly at scale.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

14

Chhetri et al.

The client­server model relies on a trusted host process that coordinates multiple client lifecycles while enforcing privacy controls and capability boundaries [16]. Session establishment typically follows a capability negotiation protocol in which clients and servers exchange capability advertisements during initialization [13]. This negotiation provides flexibility, yet studies note that discovery can introduce latency and additional complexity in environments where tool availability changes frequently [15]. MCP also permits dynamic capability updates, enabling servers to advertise new tools or revoke access to existing ones without terminating the session. While this supports adaptability, it may also create synchronization challenges when multiple clients are active simultaneously.
Security mechanisms such as role-based access control (RBAC) and OAuth 2.1-compliant authentication are incorporated to provide fine-grained permission management [16]. However, reliance on external identity infrastructures may limit applicability in lightweight or decentralized deployments, where maintaining such infrastructures can be impractical.
5.2 JSON-RPC Context Exchange and Capability Discovery
MCP implements context exchange through a JSON-RPC 2.0-based messaging protocol (see Box 1) that defines structured communication patterns [14, 16]. Four primary message types are supported: requests, results, errors, and notifications [13]. This structure provides predictability and compatibility with existing systems, though some researchers note that JSON-RPC's verbosity and reliance on text-based encoding can lead to bandwidth inefficiencies in data-intensive scenarios. Context representation uses standardized schemas that embed metadata for provenance, temporal validity, and uncertainty quantification [15, 16]. These additions enable informed decision-making but also increase message size, potentially reducing throughput under high-frequency data exchange. Schema evolution through versioned formats addresses backward compatibility, though version fragmentation remains a possible issue in multi-vendor environments. Message routing and reliability mechanisms--such as intelligent dispatching, retry with exponential backoff, and compression--improve resilience [13, 66]. However, studies also highlight risks of added protocol overhead, where maintaining features like multiplexing and token-based referencing may offset gains in efficiency when compared to more lightweight alternatives [16].
5.3 Resource Discovery and Tool Orchestration
MCP's resource discovery mechanisms enable dynamic identification of tools and data sources through standardized capability advertisement [15]. These rely on semantic ontologies to automate matching between client needs and server capabilities [13]. While this design fosters intelligent interoperability, it depends heavily on the accuracy and consistency of ontological descriptions, which can be difficult to maintain across diverse contributors. Tool orchestration is another area where MCP provides coordination primitives for sequential, parallel, and conditional workflows [14, 16]. This makes complex workflows more manageable but introduces potential drawbacks such as orchestration overhead, dependency bottlenecks, and error propagation in chained tool executions. Literature also points to the benefits of dynamic resource binding and graceful degradation, yet these advantages rely on robust fallback tools being available, which is not always guaranteed in practice [13, 15]. Additional features like load balancing and circuit breaker patterns [16] strengthen system resilience, though at the cost of added implementation complexity. Errors in orchestration may still require human intervention, limiting full automation in certain deployment contexts.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

15

5.4 Contextual Message Routing and Quality of Service
MCP incorporates semantic awareness into contextual message routing [13], enabling prioritization of critical messages and optimization of delivery paths [15]. This capability is seen as a significant improvement over network-level routing, particularly for safety-critical or latency-sensitive applications. However, semantic routing requires additional computation for context inspection, which may increase processing delays in high-throughput environments. QoS mechanisms provide differentiated service levels, ranging from best-effort delivery to bounded-latency guarantees [14, 16]. While valuable, strict QoS enforcement can strain resources during peak demand, creating tradeoffs between fairness and responsiveness. Adaptive routing strategies and context aggregation approaches, such as batching, enhance bandwidth efficiency [66], but they also introduce risks of delayed delivery if batching thresholds are not carefully tuned. Taken together, these mechanisms illustrate MCP's ambition to unify diverse approaches to context exchange. Existing studies recognize MCP's potential for standardization and interoperability but also caution against challenges related to protocol complexity, overhead, and reliance on semantic infrastructures that may not scale seamlessly across all AI-driven domains.
6 MCP in Context-Aware Transport Systems
Context-aware frameworks form the intelligence layer of adaptive transport systems, enabling sensing, interpretation, and sharing of environmental, application, and network information in ways that support coordinated decision-making. Within the Model Context Protocol (MCP), these frameworks can be viewed as both producers and consumers of structured context, exchanging semantically rich, uncertainty-aware representations through a standardized interface. MCP has been proposed as a unifying layer for diverse context flows across vehicles, infrastructure, edge nodes, and control centers, aiming to provide consistent situational awareness. While this goal aligns with longstanding challenges in interoperability, questions remain about the scalability, overhead, and standardization costs of such unification. This section outlines three major dimensions of context-awareness--environmental context processing, application context recognition, and network state awareness--each framed as a potential domain where MCP could offer benefits, but also where limitations and open research challenges must be acknowledged.
6.1 Environmental and Application Context Processing
Environmental context processing in intelligent transportation has evolved into a structured loop of acquisition, fusion, semantic interpretation, and exposure, where heterogeneous sensor inputs (Light Detection and Ranging (LiDAR), cameras, Radio Detection and Ranging (radar), Inertial Measurement Unit (IMU), Global Navigation Satellite System (GNSS), High-Definition (HD) maps) are transformed into probabilistic spatial states usable by planning and control systems [19, 67, 68]. Literature consistently demonstrates that deep multimodal fusion outperforms unimodal perception in adverse conditions such as fog, rain, or night driving, with comparative reviews identifying data-, feature-, and decision-level fusion strategies [69­71]. Cooperative perception extends this by enabling vehicles and roadside infrastructure to exchange object lists or Bird's-Eye View (BEV) features, improving detection at occluded intersections [72, 73]. Edge computing platforms such as Multi-access Edge Computing (MEC) and Vehicular Edge Computing (VEC) now often host computationally intensive fusion stages, reducing latency for perception sharing near Roadside Units (RSUs) [74­76]. In principle, MCP could standardize how these perception outputs are packaged and exchanged, enabling environmental state updates to be represented as structured, uncertainty-aware context objects. Such a schema might include semantic labels, timeliness metadata, and provenance tracking. This would make perception data more easily consumable across heterogeneous stacks.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

16

Chhetri et al.

For example, an RSU could publish occupancy grids or lane geometry with confidence scores that nearby vehicles can immediately use. Yet, this also raises challenges. Standardization risks constraining innovation in perception pipelines, while transmitting rich fused context at scale could create bandwidth and processing burdens. Moreover, the reliability of shared context depends heavily on the trustworthiness of its sources, which MCP by itself cannot guarantee.
Application context recognition translates user state, agent intent, and task parameters into adaptation signals for navigation, Mobility-as-a-Service (MaaS), human­machine interaction, and safety logic. Examples include transportation mode detection from smartphone sensors [77­79], driver monitoring through vision-based fatigue or distraction detection [80, 81], and pedestrian trajectory and intention prediction for vulnerable road users [82, 83]. Multi-task and intention-aware models have been shown to outperform single-task baselines, enabling earlier hazard detection under distribution shifts [82, 84, 85]. In MaaS, multi-source behavioral context such as time, weather, and social data improves demand forecasting and recommendations [86]. MCP provides one possible mechanism for structuring and disseminating such context across heterogeneous systems. Context events like "driver distracted," "pedestrian likely to cross in 3s," or "group prefers low-transfer route" could be published as machine-readable, confidence-tagged objects. This would allow, for example, an automated vehicle's decision module to consume a driver monitoring system's output from a third-party vendor, or a MaaS platform to integrate risk-aware pedestrian forecasts. At the same time, the feasibility of such interoperability depends on broad agreement over semantic definitions and schema evolution. Differences in labeling practices or thresholds for uncertainty could undermine consistency, and the need to protect sensitive behavioral data raises significant privacy and governance concerns. Thus, while MCP could facilitate cross-origin interoperability, its deployment in application context domains requires careful attention to interpretability, standardization, and user trust.
6.2 Network State Awareness
Network state awareness provides real-time telemetry on topology, load, latency, and link quality across SDN-enabled V2X and MEC infrastructures, ensuring that sensing, computation, and control remain within QoS and SLA targets [87­89]. Research on VANET routing, GNN-based traffic prediction [90, 91], and SDN orchestration [92, 93] highlights the value of coupling application urgency with network state to optimize resource allocation. For example, placing compute at RSUs reduces end-to-end latency for cooperative perception, while prediction-driven routing pre-warms paths for safety-critical updates [94]. MCP could serve as a binding layer between network telemetry and adaptive application behavior by standardizing the way metrics such as slice capacity, link delay, or congestion forecasts are expressed. An orchestrator could, for instance, publish "link degradation between RSU-23 and RSU-24, expected latency +30 ms," prompting applications to adjust fusion pipelines or send rates. Such alignment could improve resilience, but it also depends on the accuracy and timeliness of telemetry. Overhead from continuous reporting may tax already constrained networks, and the complexity of semantic QoS definitions could complicate adoption. Furthermore, enforcing priorities across competing stakeholders (e.g., private fleets vs. public safety systems) may raise fairness and governance issues. These tradeoffs suggest that MCP can provide a useful abstraction, but one that introduces as many challenges as it resolves when applied to real-world networked transport systems.
6.3 Schema Unification and Standardized Context Models
MCP Unification Models represent the architectural frameworks and standardization mechanisms that aim to integrate diverse AI tools, context sources, and applications into coherent, interoperable ecosystems [13, 15]. These models address the persistent challenge of semantic and syntactic

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

17

heterogeneity in AI system integration, where tools, data sources, and reasoning engines often differ in interfaces, data formats, and operational paradigms [14]. Unlike point-to-point adapters or monolithic middleware approaches, MCP proposes a standardized protocol layer that abstracts integration complexity while preserving system-specific capabilities [16]. This promise of unification has attracted attention, but concerns remain about protocol overhead, governance of schema evolution, and the risk of over-standardization. This section reviews three central dimensions of MCP unification: context standardization, AI tool integration, and multi-agent coordination.
Context standardization in MCP targets the difficulty of representing heterogeneous contextual information in a machine-interpretable and interoperable format [13]. Traditional systems often suffer from semantic fragmentation, with incompatible representations for similar concepts [58, 59]. MCP responds through schema definitions and ontological frameworks designed to provide consistency across domains [16]. The separation of syntactic representation (e.g., JSON-RPC message formats) from semantic meaning (ontological relationships) is intended to allow extensibility while maintaining protocol-level compatibility [14, 15]. Schema evolution mechanisms with versioning and backward compatibility aim to accommodate changing requirements in long-lived deployments [13, 16]. Provenance and constraint-checking mechanisms further ensure semantic consistency and data quality [59]. However, scholars caution that schema governance may become a bottleneck. Maintaining alignment across diverse contributors is non-trivial, and version fragmentation could emerge if consensus over ontological changes is slow. Furthermore, enforcing strict schema validation may reject useful but unconventional contextual signals, raising a tradeoff between strict interoperability and system adaptability.
6.4 AI Tool Integration and Capability Orchestration
AI tool integration through MCP attempts to unify diverse reasoning systems, data processing tools, and AI services into shared workflows [15]. Capability abstraction and negotiation mechanisms enable tools to advertise their functions in standardized ways [13], reducing the friction of incompatible interfaces highlighted in earlier integration literature [16]. Dynamic discovery and negotiation allow flexible service composition while respecting tool limitations [14]. Workflow orchestration includes sequential, parallel, and conditional execution patterns [16], supported by coordination primitives for data flow, error propagation, and transactional consistency [13]. Optimizations such as token-based referencing and distributed caching reduce payload sizes and communication overhead [16, 66]. Yet, this additional protocol machinery may introduce its own performance costs, particularly in latency-sensitive scenarios. Streaming coordination helps mitigate delays, but system designers must balance flexibility with real-time guarantees. Error handling techniques--such as circuit breakers, retries, and compensation mechanisms--enhance robustness [13, 15]. Still, orchestration complexity can escalate quickly as workflows span heterogeneous tools, potentially leading to debugging challenges and difficulty in ensuring consistent semantics across vendors.
6.5 Multi-Agent Coordination and Collaborative Intelligence
Multi-agent coordination frameworks in MCP seek to support distributed AI collaboration on tasks that exceed the scope of individual agents [15]. Coordination models range from hierarchical delegation and peer-to-peer negotiation to consensus-driven decision-making [14, 16]. These patterns echo long-standing approaches in multi-agent systems [6], but MCP's contribution lies in offering standardized communication, conflict resolution, and consensus mechanisms tailored for AI tool ecosystems [13]. Context sharing across agents requires balancing freshness with efficiency. MCP employs distributed context management and reconciliation strategies to maintain eventual consistency [15, 66]. While this enables collaboration, it also introduces complexity in

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

18

Chhetri et al.

ensuring timeliness under high churn conditions. Conflict resolution via timestamping or semantic reconciliation can reduce inconsistencies but may not scale well when agents operate under highly asynchronous conditions. Collaborative intelligence is framed as the outcome of MCP's ability to integrate agents specializing in NLP, vision, reasoning, or domain expertise [13, 16]. Mechanisms such as attention and contribution weighting aim to produce coherent outputs from diverse inputs. Nevertheless, studies note the risk of coordination overhead eroding performance benefits, particularly when communication dominates computation. Security and trust are another challenge. While authentication, authorization, and audit mechanisms provide boundaries for collaboration [13, 16], enforcing these consistently across distributed and possibly adversarial participants is difficult. Over-reliance on protocol-level security may also obscure the need for complementary governance frameworks that address incentives, fairness, and accountability in collaborative multi-agent environments.
6.6 Integrating Multiple Communication Paradigms
Transport system integration requires bridging multiple communication paradigms, device capabilities, and cloud infrastructures in a way that maintains interoperability, performance, and security. Recent work positions the MCP as a useful conceptual parallel for these efforts, given its focus on structured context exchange, persistent session management, and schema-based interoperability [16, 95]. However, transport systems pose unique constraints--resource limitations in IoT, dynamic handoffs in multi-modal environments, and elasticity in cloud-native infrastructures--that highlight both opportunities and open challenges for applying MCP-inspired principles. Table 3 summarizes the key integration domains and their corresponding mechanisms, challenges, and MCP analogies.
Multi-modal Transportation: Multi-modal systems increasingly span heterogeneous network types and paradigms, including client­server, publish­subscribe, and peer-to-peer [11, 52]. Ensuring seamless transitions between these fabrics while preserving service continuity remains a central challenge [51]. As shown in Table 3, abstraction layers and unified APIs parallel MCP's standardized interfaces, decoupling application workflows from underlying transport specifics [95, 99]. MCPinspired features like token-based referencing [66] and lifecycle-aware context management [95] illustrate how transport APIs might reduce signaling overhead during mode switching, though issues of scalability and vendor adoption remain open.
IoT Integration: IoT integration adds complexity due to device constraints, intermittent links, and protocol fragmentation [5]. MCP's session model and schema-flexible payloads offer lessons for lightweight, persistent telemetry management in such environments [96]. Table 3 highlights parallels between MCP's OTA lifecycle management and IoT fleet requirements such as secure onboarding, firmware updates, and buffering during disconnections. Optimizations like FastMCP's token-based caching and Redis-backed persistence [66] demonstrate potential scalability, though operational deployments still face security and semantic interoperability challenges.
Cloud-Native Protocols: Cloud-native protocols must adapt to ephemeral containers, serverless execution, and edge-cloud continuum architectures [10, 56]. Protocols like QUIC are increasingly adopted to reduce latency and manage multiplexed streams [97], while service meshes impose requirements for adaptive routing, encryption, and observability. As summarized in Table 3, MCP's emphasis on capability negotiation, session management, and secure delegation resonates with these demands [16, 95]. Yet the cloud-native domain raises unique concerns about cold-start latency, multi-tenant fairness, and standardization gaps, which remain unsolved despite architectural parallels with MCP.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

19

Table 3. Comparison of integration dimensions in transport systems and MCP-inspired mechanisms.

Integration Dimension

Key Challenges

MCP-Inspired Mechanisms

Strengths

Limitations

Multi-modal Transportation

Seamless switching

across heteroge-

neous networks

(wired,

wire-

less, vehicular,

satellite); preserv-

ing QoE across

client­server, pub-

lish­subscribe,

and peer-to-peer

paradigms [8, 11].

Standardized APIs for abstraction [52]; token-based referencing for efficient mode switching [66]; lifecycle management for trips akin to context sessions [95].

Flexibility through abstraction; reduces integration complexity; enables adaptive switching across modes.

Scalability and vendor adoption challenges; risk of overhead during frequent transitions; requires consensus on APIs.

IoT Integration

Constrained devices, intermittent connectivity, protocol fragmentation [5].

Lightweight persistent sessions [96]; schema-flexible payloads; OTA updates and device onboarding; edge caching with tokenized contexts [66].

Supports constrained devices; improves reliability during disconnections; scalable OTA management.

Security

vul-

nerabilities in

heterogeneous

fleets; semantic

interoperability

difficulties; added

complexity at

gateways.

Cloud-Native Protocols

Elastic scaling, serverless lifecycles, and heterogeneous edge­cloud topologies [10].

Session-oriented authentication (OAuth 2.1) [16]; QUIC/HTTP3based low-latency transport [97]; observability hooks for adaptive routing and fault isolation [98].

High performance under elasticity; strong alignment with microservice and zero-trust security models.

Cold-start latency in serverless contexts; fairness across tenants; lack of standardization in APIs.

7 Performance Analysis and Evaluation
7.1 Evaluation Methodologies
The evaluation of adaptive transport systems requires comprehensive methodologies that can assess performance across diverse conditions, applications, and adaptation strategies[44, 100]. Traditional network performance metrics such as throughput, latency, and packet loss provide important baseline measurements but may not capture the full benefits of adaptive systems[3, 44]. Adaptive systems evaluation must consider factors such as adaptation responsiveness, stability, and overhead in addition to traditional performance metrics[44, 45]. Simulation-based evaluation provides controlled environments for testing adaptive transport systems under diverse conditions[44, 100]. These evaluations can systematically explore parameter spaces and scenario variations that would be difficult to reproduce in real-world testbeds [3, 44]. However, simulation models must accurately capture the complexity of real network environments to provide meaningful results[44, 48]. Real-world testbed evaluation provides validation of simulation results and assessment of practical deployment challenges [3, 44]. The Network Survey tool demonstrates approaches for comprehensive wireless protocol evaluation across multiple network types and conditions [101]. However, testbed evaluation is limited by the scope of conditions that can be practically tested [44, 100].

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

20

Chhetri et al.

7.2 Performance Metrics
Performance metrics for adaptive transport systems must capture both traditional network performance characteristics and adaptation-specific behaviors [3, 44]. Throughput, latency, and reliability metrics provide baseline performance assessment but must be supplemented with metrics that assess adaptation effectiveness [44, 100]. Adaptation metrics include convergence time, stability, overhead, and robustness to changing conditions[44, 45]. Energy efficiency has become an increasingly important performance metric, particularly for mobile and IoT applications [4, 5]. Adaptive transport systems can significantly impact energy consumption through their adaptation decisions, making energy efficiency a critical evaluation criterion[4, 102]. The WhiteRate protocol demonstrates approaches for balancing energy efficiency with communication performance through context-aware adaptation [4].
Quality of Experience (QoE) metrics provide user-centric evaluation of adaptive transport systems by assessing the end-user impact of adaptation decisions [47, 49]. These metrics must consider application-specific requirements and user preferences when evaluating system performance [4, 44]. The development of standardized QoE metrics for adaptive transport systems remains an active research area[49, 100].
7.3 Comparative Analysis
Comparative analysis of adaptive transport systems requires careful consideration of evaluation scenarios, baseline systems, and performance metrics [44, 100]. Fair comparison requires systems to be evaluated under identical conditions with appropriate baseline systems that represent current best practices [3, 44]. The diversity of adaptive transport approaches makes direct comparison challenging, necessitating comprehensive evaluation frameworks [45, 100]. The analysis of adaptation overhead is critical for understanding the practical viability of adaptive transport systems [3, 44]. Adaptation mechanisms incur computational, communication, and storage overhead that must be weighed against performance benefits [4, 44]. Systems that achieve modest performance improvements at high overhead may not be practical for deployment[44, 45].
Robustness analysis assesses the ability of adaptive transport systems to maintain performance under adverse conditions, system failures, and attack scenarios[3, 13]. Adaptive systems may be more vulnerable to certain types of attacks or failures due to their increased complexity [3]. The security analysis of MCP systems highlights the importance of considering security implications in adaptive system design [13, 65]. Evaluation of adaptive transport systems has relied on a range of methodologies, from simulation studies and testbed deployments to analytical modeling and trace-driven analysis. Each method emphasizes different aspects of performance, such as scalability, latency, reliability, or predictive accuracy. Table 4 summarizes the most common methodologies, their associated metrics, and their limitations.
In summary this Table 4 highlights that no single methodology provides comprehensive coverage. Simulations offer scalability but risk oversimplification, while testbeds provide realism at higher cost. Analytical models and trace-driven studies contribute rigor and contextual relevance but face reproducibility challenges. Hybrid approaches are increasingly favored, aligning with MCP's potential to support multi-metric, system-wide evaluation.
8 Challenges and Open Problems
Despite significant advancements in the design and deployment of adaptive transport systems and MCP, numerous challenges and unresolved research questions persist. This section outlines the most pressing issues that limit the scalability, security, and interoperability of current approaches.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

21

Table 4. Evaluation methodologies and metrics in adaptive transport systems.

Methodology

Description / Typical Met- Limitations

Examples

rics

References

Simulation-Based Studies

Microscopic or mesoscopic traffic simulators (e.g., SUMO, VISSIM).

Travel time, delay, throughput, emissions, energy efficiency.

Simplified assumptions may not capture realworld variability.

[20, 25]

Testbed / Pilot Deployments

Experimental or small-scale realworld setups.

Reliability, latency, packet loss, coordination success rate.

High cost; limited scalability for large-scale validation.

[24, 30]

Analytical Modeling

Mathematical or theoretical protocol models.

Stability, convergence, scalability bounds.

Difficult to incorporate stochasticity and context variability.

[17, 18]

Trace-Driven / Data-Centric Evaluation

Use of sensor

logs,

field-

collected data, or

traffic traces.

Prediction accuracy, generalization, robustness.

Data quality and availability constraints; reproducibility challenges.

[6, 7]

Hybrid Approaches

Combination of simulation, modeling, and real data.

Multi-metric evaluation across both network and transport performance.

Complex setup; results may be harder to interpret consistently.

[10, 16]

8.1 Scalability and Technical Complexity
As the number of connected devices, sensors, and autonomous vehicles continues to rise exponentially, adaptive transport systems must process an ever-growing volume of real-time data. This includes not only traffic and mobility data but also contextual information such as environmental conditions, user behavior, and system performance metrics. The burden placed on the underlying network infrastructure is substantial, necessitating robust mechanisms for data ingestion, processing, storage, and communication[103, 104]. Traditional architectures are often inadequate in meeting these demands, prompting a shift toward more flexible, scalable solutions such as edge computing and distributed processing frameworks.
Compounding this challenge is the integration of advanced technologies like machine learning, the IoT, and edge-cloud hybrid infrastructures[104, 105]. These technologies, while offering greater adaptability and predictive capabilities, also introduce a new layer of technical complexity that demands specialized expertise. Designing and maintaining systems that can simultaneously handle real-time decision-making, failover recovery, and resource allocation across distributed nodes is a nontrivial task.
Moreover, the initial investment required for implementing adaptive transport solutions is often substantial. Infrastructure upgrades, acquisition of specialized hardware, software development, and integration with legacy systems can incur significant costs. Delays in procurement, rapid shifts in technology trends, and the risk of obsolescence further complicate the implementation process. Beyond installation, operations and maintenance present ongoing challenges, especially

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

22

Chhetri et al.

as systems age or as newer technologies are introduced. Maintaining reliable system performance with minimal downtime demands dedicated technical personnel and consistent financial support [105] for updates, training, and repair.
8.2 Security and Privacy
With increasing interconnectedness and dependence on data, adaptive transport systems have become more susceptible to cybersecurity and privacy threats. The growing number of entry points, ranging from roadside sensors and in-vehicle networks to cloud-based services, creates a wider attack surface for malicious actors[105, 106]. Real-world incidents have demonstrated vulnerabilities such as malware intrusions, unauthorized access, and denial-of-service (DDoS) attacks. In many cases, organizations operating these systems lack the in-house cybersecurity capabilities to effectively prevent, detect, or respond to such threats, making security a critical concern[106].
Privacy concerns are equally pressing. The operation of adaptive systems typically involves the collection and processing of highly sensitive data, including real-time location tracking, travel patterns, and even personal identifiers [107] linked to mobile applications or transit cards. Ensuring this data is collected, transmitted, and stored in compliance with privacy regulations such as GDPR or state-level privacy laws is a persistent challenge. Developing mechanisms that ensure data minimization, user consent, and anonymization without compromising system functionality remains an active area of research and policy debate [107].
8.3 Standardization and Interoperability
One of the most persistent obstacles to the widespread deployment of adaptive transport systems is the lack of standardized architectures [108, 109] and communication protocols. The current technological landscape is highly fragmented, with different agencies, municipalities, and vendors employing proprietary systems that are often incompatible with one another [105, 108]. This siloed development leads to duplication of effort, increased costs, and inefficiencies when attempting to scale or integrate systems across regional or national boundaries. The absence of uniform standards for data exchange, messaging formats, and protocol interfaces further complicates system interoperability. This is particularly evident in emerging domains such as the Internet of Vehicles (IoV), where the need for dynamic coordination among highly heterogeneous devices, such as connected cars, roadside infrastructure, and cloud services exacerbates integration challenges.
Beyond mere technical compatibility, achieving semantic interoperability is equally essential. Systems must not only be able to exchange data, but they must also understand and correctly interpret the meaning and intent behind shared information [108]. Misinterpretations due to inconsistent data models or contextual misunderstandings can lead to poor decision-making, inefficiencies, or even critical safety failures. Addressing these issues requires not only technical solutions but also coordinated policy development, collaborative standard-setting, and robust governance mechanisms.
In conclusion, the realization of truly adaptive, resilient, and intelligent transport systems will depend on our ability to overcome these interconnected challenges. Doing so will require continued research, interdisciplinary collaboration, policy support, and sustained investment from both public and private sectors. Only then can the full potential of adaptive transport systems be harnessed to meet the evolving needs of urban mobility and digital infrastructure.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

23

Table 5. Summary of Challenges and Open Problems in Adaptive Transport Systems.

Category

Sub-Issue

Description

Scalability & Technical Complexity

Data Volume & System Load Technology Integration Initial Investment & Upgrades Operations & Maintenance

Rapid growth in connected devices creates data surges requiring robust real-time processing, storage, and transmission.
Incorporating AI, IoT, and edge computing increases system design complexity, demanding high technical expertise.
High upfront costs for hardware/software, risk of technology obsolescence, and ongoing upgrade requirements.
Complex, aging systems require dedicated maintenance resources to ensure uptime and consistent performance.

Security & Privacy

Cybersecurity Threats Data Privacy

Interconnected systems are vulnerable to attacks like malware, unauthorized access, and DDoS, often lacking sufficient protections.
Collection of sensitive user data (e.g., location, travel habits) raises concerns over compliance and safeguarding.

Standardization & Interoperability Fragmented Systems Lack of Uniform Standards Semantic Interoperability

Diverse, proprietary systems across vendors and agencies hinder communication and cross-platform integration.
Absence of standardized data exchange and protocols limits system scalability and cohesion, especially in Internet of Vehicles.
Systems must agree not just on format, but on the meaning of shared data to ensure coordinated and accurate decision-making.

9 Future Research Directions
9.1 AI-Driven Adaptation
The integration of artificial intelligence and machine learning techniques into adaptive transport systems represents one of the most promising directions for future research [45, 48]. AI-driven adaptation can potentially achieve better performance than traditional rule-based approaches by learning optimal strategies from data and adapting to changing conditions automatically [45, 100]. The development of online learning algorithms that can adapt continuously without requiring offline training represents a critical research challenge [48, 57]. Reinforcement learning techniques show particular promise for adaptive transport systems as they can learn optimal policies through interaction with the environment [45, 57]. These techniques can potentially discover adaptation strategies that outperform human-designed approaches while adapting to conditions that were not anticipated during system design [48, 100]. However, the stability, convergence, and safety properties of reinforcement learning-based adaptation require careful analysis [45, 57]. Federated learning approaches enable distributed training of adaptation models while preserving privacy and reducing communication overhead [48, 110]. These approaches can leverage data from multiple systems to improve adaptation performance while maintaining data locality [45]. The development of federated learning algorithms optimized for adaptive transport systems represents an important research opportunity [100, 110].

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

24

Chhetri et al.

9.2 Edge Computing Integration
Edge computing integration offers significant opportunities for improving adaptive transport systems by enabling distributed processing of context information and adaptation decisions [56, 57]. Edge computing resources can reduce the latency of adaptation decisions and improve system responsiveness to changing conditions [10, 56]. The development of adaptive transport systems that can leverage heterogeneous edge computing resources represents an important research direction [51, 57]. The coordination of adaptation decisions across distributed edge resources presents significant technical challenges [50, 56]. Distributed consensus algorithms and coordination mechanisms must balance the benefits of coordination with the overhead and latency of consensus processes [50, 57]. The development of efficient distributed coordination mechanisms for adaptive transport systems represents a critical research area [51, 56]. Container orchestration and serverless computing platforms at the edge present new opportunities and challenges for adaptive transport systems [10, 51]. These platforms enable dynamic deployment and scaling of adaptation components but require transport systems that can adapt to rapidly changing service topologies [10] [57]. The development of transport protocols optimized for dynamic edge environments represents an emerging research area [51, 56].
9.3 Quantum Communication
Quantum communication technologies present both opportunities and challenges for adaptive transport systems [3]. Quantum key distribution and quantum communication protocols may require new types of adaptation mechanisms to handle the unique characteristics of quantum channels [3]. The development of adaptive protocols for quantum networks represents a frontier research area with significant potential impact [3]. Quantum computing may also impact adaptive transport systems by enabling new types of optimization algorithms and context processing techniques [48]. Quantum algorithms for optimization problems could potentially improve the efficiency of adaptation decisions and enable more sophisticated optimization objectives [3, 48]. However, the practical implementation of quantum-enhanced adaptive systems remains a long-term research goal [48]. Post-quantum cryptography considerations are important for adaptive transport systems that must maintain security in the presence of quantum computing threats [3, 13]. Adaptive systems must be able to migrate to post-quantum cryptographic algorithms when necessary while maintaining operational continuity [13]. The development of cryptographically agile adaptive systems represents an important research challenge [3, 13].
9.4 Autonomous System Coordination
The coordination of autonomous adaptive transport systems presents significant challenges and opportunities for future research [57, 111]. Autonomous systems must be able to negotiate adaptation parameters, share context information, and coordinate decisions without human intervention [3, 50]. The development of autonomous coordination mechanisms that can handle complex multiparty scenarios represents a critical research area [56, 57]. Game-theoretic approaches may provide frameworks for analyzing and designing autonomous coordination mechanisms [3, 50]. These approaches can help understand the incentives and strategic behavior of autonomous systems and design mechanisms that promote cooperation and system-wide optimization [57]. However, the computational complexity of game-theoretic mechanisms must be carefully managed [3, 48]. Blockchain and distributed ledger technologies may provide infrastructure for trustless coordination between autonomous adaptive systems [3, 57]. These technologies can enable autonomous systems to share information and coordinate decisions without requiring trusted third parties [50].

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

25

The development of blockchain-based coordination mechanisms for adaptive transport systems represents an emerging research opportunity [3, 57].
10 Conclusions
This comprehensive survey has examined the landscape of unifying models for adaptive transport systems, with particular emphasis on MCP and their role in enabling context-aware communication frameworks. Through systematic analysis of research spanning 26 years of development, we have identified key trends, challenges, and opportunities in adaptive transport system design. The taxonomy presented in this survey provides a structured framework for understanding the diverse approaches to adaptive transport systems and their integration.
Our analysis reveals that while significant progress has been made in individual components of adaptive transport systems, the field still lacks comprehensive unifying models that can seamlessly integrate adaptive protocols with context-aware decision making. The emergence of MCPs represents an important step toward standardization, but significant challenges remain in areas such as scalability, security, and interoperability. Future research directions including AI-driven adaptation, edge computing integration, and autonomous system coordination offer promising opportunities for advancing the field.
The evolution of adaptive transport systems reflects the broader trend toward intelligent, contextaware computing systems that can adapt to changing conditions and requirements. As applications become more sophisticated and deployment environments more diverse, the need for comprehensive adaptive transport frameworks will continue to grow. The research roadmap presented in this survey provides guidance for addressing the key challenges and opportunities in this critical area of computer systems research.
The success of future adaptive transport systems will depend on the development of comprehensive frameworks that can integrate diverse adaptation mechanisms, context processing techniques, and application requirements into cohesive, efficient, and reliable systems. This survey provides the foundation for such development by systematically analyzing the current state of the field and identifying the key research challenges that must be addressed.
References
[1] Olivier Bonaventure. Beyond tcp: The evolution of internet transport protocols, 2015. Keynote, October 2015 CNSM. [2] Ericsson. Quic ­ a vehicle for transport protocol evolution, 2018. Accessed: 2025-06-24. [3] Cliff C Zou, Nick Duffield, Don Towsley, and Weibo Gong. Adaptive defense against various network attacks. IEEE
Journal on Selected Areas in Communications, 24(10):1877­1888, 2006. [4] Veljko Pejovic and Elizabeth M Belding. A context-aware approach to wireless transmission adaptation. In 2011 8th
Annual IEEE Communications Society Conference on Sensor, Mesh and Ad Hoc Communications and Networks, pages 592­600. IEEE, 2011. [5] Talking IoT. Protocol wars: How unifying iot protocols can save the iot from chaos, 2025. Accessed: 2025-06-24. [6] Hung Du, Srikanth Thudumu, Rajesh Vasa, and Kon Mouzakis. A survey on context-aware multi-agent systems: techniques, challenges and future directions. arXiv preprint arXiv:2402.01968, 2024. [7] Xin Li, Martina Eckert, José-Fernán Martinez, and Gregorio Rubio. Context aware middleware architectures: Survey and challenges. Sensors, 15(8):20570­20607, 2015. [8] Adaptive transport systems with holistic representation of supply and demand (adapt-or). https://cordis.europa.eu/ project/id/101117675, 2023. European Commission, CORDIS, Project Fact Sheet, HORIZON-ERC. [9] Maritime and Transport Technology Department, TU Delft. Adaptive transportation and logistics (adapt-or), 2025. Accessed: 2025-06-24. [10] F Alanazi and M Alenezi. A framework for integrating intelligent transportation systems with smart city infrastructure. J. Infrastruct. Policy Dev, 8(5), 2024. [11] Francesco Russo and Giuseppe Musolino. A unifying modelling framework to simulate the spatial economic transport interaction process at urban and national scales. Journal of Transport Geography, 24:189­197, 2012. [12] Anthropic. Introducing the model context protocol, 2024. Accessed: 2025-06-24.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

26

Chhetri et al.

[13] Xinyi Hou, Yanjie Zhao, Shenao Wang, and Haoyu Wang. Model context protocol (mcp): Landscape, security threats, and future research directions. arXiv preprint arXiv:2503.23278, 2025.
[14] Abul Ehtesham, Aditi Singh, Gaurav Kumar Gupta, and Saket Kumar. A survey of agent interoperability protocols: Model context protocol (mcp), agent communication protocol (acp), agent-to-agent protocol (a2a), and agent network protocol (anp), 2025.
[15] Naveen Krishnan. Advancing multi-agent systems through model context protocol: Architecture, implementation, and applications. arXiv preprint arXiv:2504.21030, 2025.
[16] Partha Pratim Ray. A survey on model context protocol: Architecture, state-of-the-art, challenges and future directions. Authorea Preprints, 2025.
[17] Eric He, Pascale Vicat-Blanc Primet, and Michael Welzl. A survey of transport protocols other than "standard" tcp. Technical Report GFD-I.055, Global Grid Forum, 2005. Accessed: 2025-06-24.
[18] Aravind Velayutham, Hung-Yun Hsieh, and Raghupathy Sivakumar. On transport layer adaptation in heterogeneous wireless data networks. In International Workshop on Quality of Service, pages 69­80. Springer, 2005.
[19] Matthias Baldauf, Schahram Dustdar, and Florian Rosenberg. A survey on context-aware systems. International Journal of ad Hoc and ubiquitous Computing, 2(4):263­277, 2007.
[20] Saeed Maadi, Sebastian Stein, Jinhyun Hong, and Roderick Murray-Smith. Real-time adaptive traffic signal control in a connected and automated vehicle environment: optimisation of signal planning with reinforcement learning under vehicle speed guidance. Sensors, 22(19):7501, 2022.
[21] Giovanni Calabrò, Andrea Araldo, Simon Oh, Ravi Seshadri, Giuseppe Inturri, and Moshe Ben-Akiva. Adaptive transit design: Optimizing fixed and demand responsive multi-modal transportation via continuous approximation. Transportation Research Part A: Policy and Practice, 171:103643, 2023.
[22] Orlando Roman, Tanvi Maheshwari, Canh Do, Bryan Adey, Pieter Fourie, Qiming Ye, and Prateek Bansal. A modelbased adaptive planning framework using surrogate modelling for urban transport systems under uncertainty. Available at SSRN 5020996, 2024.
[23] Muhammad Farooq, Nima Afraz, and Fatemeh Golpayegani. An adaptive system architecture for multimodal intelligent transportation systems. arXiv preprint arXiv:2402.08817, 2024.
[24] Changjian Cai and Min Wei. Adaptive urban traffic signal control based on enhanced deep reinforcement learning. Scientific reports, 14(1):14116, 2024.
[25] Md Akhtar Hossain, Nabil Hasan, and Kumar Sowrave Pujan. Vissim study: Comparing adaptive and traditional traffic systems' efficiency and environmental impact. Available at SSRN 4836046, 2024.
[26] Zhongyi Huang. Reinforcement learning based adaptive control method for traffic lights in intelligent transportation. Alexandria Engineering Journal, 106:381­391, 2024.
[27] Muhammad Tahir Rafique, Ahmed Mustafa, and Hasan Sajid. Reinforcement learning for adaptive traffic signal control: Turn-based and time-based approaches to reduce congestion. arXiv preprint arXiv:2408.15751, 2024.
[28] Andrea Vidali, Luca Crociani, Giuseppe Vizzari, Stefania Bandini, et al. A deep reinforcement learning approach to adaptive traffic lights management. In Woa, pages 42­50, 2019.
[29] Dingshan Sun, Anahita Jamshidnejad, and Bart De Schutter. Adaptive parameterized control for coordinated traffic management using reinforcement learning. IFAC-PapersOnLine, 56(2):5463­5468, 2023.
[30] Eias Al-Humdan. Enhancing transportation agility through neuroadaptive AI and behavioural decision intelligence. Transportation Research Interdisciplinary Perspectives, 31:101468, 2025.
[31] Ma'moun Mansour, Sahel Alouneh, et al. Quic transmission protocol: Test-bed design, implementation and experimental evaluation. Journal of Electrical Engineering, 72(1):20­28, 2021.
[32] Apostolos Kyratzis and Panayotis Cottis. Quic vs tcp: A performance evaluation over lte with ns-3. Communications and Network, 14:12­22, 01 2022.
[33] Luomeng Chao, Celimuge Wu, Tsutomu Yoshinaga, Wugedele Bao, and Yusheng Ji. A brief review of multipath tcp for vehicular networks. Sensors, 21(8):2793, 2021.
[34] Sébastien Barré, Christoph Paasch, and Olivier Bonaventure. Multipath tcp: from theory to practice. In NETWORKING 2011: 10th International IFIP TC 6 Networking Conference, Valencia, Spain, May 9-13, 2011, Proceedings, Part I 10, pages 444­457. Springer, 2011.
[35] Reto Krummenacher, Holger Lausen, Thomas Strang, and Jacek Kopecky. Analyzing the modeling of context with ontologies. VDE Verlag Proceedings, pages 11­22, 2007.
[36] Claudia Villalonga, Muhammad Asif Razzaq, Wajahat Ali Khan, Hector Pomares, Ignacio Rojas, Sungyoung Lee, and Oresti Banos. Ontology-based high-level context inference for human behavior identification. Sensors, 16(10):1617, 2016.
[37] Hatim Guermah, Tarik Fissaa, Hatim Hafiddi, Mahmoud Nassar, and Abdelaziz Kriouile. An ontology oriented architecture for context aware services adaptation. arXiv preprint arXiv:1404.3280, 2014.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

27

[38] Benmesbah Ouissem, Mahnane Lamia, and Mohamed Hafidi. A proposed ontology-based generic context model for ubiquitous learning. International Journal of Web-Based Learning and Teaching Technologies (IJWLTT), 16(3):47­64, 2021.
[39] Anand Ranganathan and Roy H Campbell. A middleware for context-aware agents in ubiquitous computing environments. In ACM/IFIP/USENIX International Conference on Distributed Systems Platforms and Open Distributed Processing, pages 143­161. Springer, 2003.
[40] Markus C Huebscher and Julie A McCann. Adaptive middleware for context-aware applications in smart-homes. In Proceedings of the 2nd workshop on Middleware for pervasive and ad-hoc computing, pages 111­116, 2004.
[41] Ahmed Elbery, Yi Lian, and Geng Li. Toward fair and efficient congestion control: Machine learning aided congestion control (mlacc). In Proceedings of the 7th Asia-Pacific Workshop on Networking, pages 88­94, 2023.
[42] Zhifei Zhang, Shuo Li, Yiyang Ge, Ge Xiong, Yu Zhang, and Ke Xiong. Pbq-enhanced quic: Quic with deep reinforcement learning congestion control mechanism. Entropy, 25(2):294, 2023.
[43] Eric He, Rajkumar Kettimuthu, Y Gu, S Hegde, M Welzl, P Vicat-Blanc Primet, J Leigh, and C Xiong. Survey of protocols and mechanisms for enhanced transport over long fat pipes. In Global Grid Forum White paper Draft (work in progress), Data Transport Research Group, 2003.
[44] Benjamin Atkin and Kenneth P Birman. Evaluation of an adaptive transport protocol. In IEEE INFOCOM 2003. Twenty-second Annual Joint Conference of the IEEE Computer and Communications Societies (IEEE Cat. No. 03CH37428), volume 3, pages 2323­2333. IEEE, 2003.
[45] Hamidreza Anvari. Adaptive network protocol selection: A machine-learning approach. 2023. [46] DevX. Context-aware network, 2025. Accessed: 2025-06-24. [47] Åse Jevinger, Emil Johansson, Jan A Persson, and Johan Holmberg. Context-aware travel support during unplanned
public transport disturbances. In VEHITS 2023-9th International Conference on Vehicle Technology and Intelligent Transport Systems, April 26-28, 2023, Prague, Czech Republic, volume 1, pages 160­170. SciTePress, 2023. [48] KH Lai et al. Context-aware domain adaptation for time series anomaly detection (2023). [49] Chen Linqing and Wang Weilei. Dynamic-fact: A dynamic framework for adaptive context-aware translation. In Proceedings of the 22nd Chinese National Conference on Computational Linguistics, pages 665­676, 2023. [50] Ram Kumar, Soheil Ghiasi, and Mani Srivastava. Dynamic adaptation of networked reconfigurable systems. In Workshop on Software Support for Reconfigurable Systems (SSRS), 2003. [51] Network modernization: The promise of the adaptive network. Technical report, GovLoop and Ciena, 2020. Accessed: 2025-06-24. [52] ELATEC. Smart moves: Transforming urban transit with unified access systems, 2025. Accessed: 2025-06-24. [53] Sami Iren, Paul D Amer, and Phillip T Conrad. The transport layer: tutorial and survey. ACM Computing Surveys (CSUR), 31(4):360­404, 1999. [54] Hamptons College. Why are standardization and protocols crucial in data communication and networking?, 2025. Accessed: 2025-06-24. [55] Wikipedia contributors. Communication protocol, 2025. Accessed: 2025-06-24. [56] Ankit Bhardwaj, Chinmay Kulkarni, and Ryan Stutsman. Adaptive placement for in-memory storage functions. USENIX ATC '20 Conference Presentation, University of Utah, 2020. Accessed: 2025-06-24. [57] Hsin-Hsuan Sung, Jou-An Chen, Wei Niu, Jiexiong Guan, Bin Ren, and Xipeng Shen. Decentralized applicationlevel adaptive scheduling for multi-instance dnns on open mobile devices. In Proceedings of the 2023 USENIX Annual Technical Conference (USENIX ATC '23), pages 865­877, Boston, MA, 2023. USENIX Association. Conference presentation, Accessed: 2025-06-24. [58] First Author and Second Author. Semantic representation of context model. 2016. PDF available at: d1wqtxts1xzle7.cloudfront.net. [59] Michael Knappmeyer, Saad Liaquat Kiani, Cristina Frà, Boris Moltchanov, and Nigel Baker. Contextml: A light-weight context representation and context management schema. In IEEE 5th International Symposium on Wireless Pervasive Computing 2010, pages 367­372, 2010. [60] IARIA. Proceedings of the Tenth International Conference on Creative Content Technologies (CONTENT 2018), Barcelona, Spain, February 18­22 2018. Steering Committee: Raouf Hamzaoui, De Montfort University; Dan Tamir, Texas State University; Mu-Chun Su, National Central University. [61] Phil Schmid. Model context protocol (mcp) an overview, 2025. Accessed: 2025-06-24. [62] Martin Svensson. Contextual metadata in practice. In 2009 First International Conference on Advances in Multimedia, pages 12­17, 2009. [63] Partha Pratim Ray. The rapid proliferation of large-language-model services is constrained by three long-standing barriers: stateless integration interfaces, ... TechRxiv, April 2025. Preprint, available online. [64] Aaditya Bhatia, Ellis E. Eghan, Manel Grichi, William G. Cavanagh, Zhen Ming (Jack) Jiang, and Bram Adams. Towards a change taxonomy for machine learning pipelines: Empirical study of ml pipelines and forks related to

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

28

Chhetri et al.

academic publications. Empirical Software Engineering, 28(Article 60), 2023. [65] openags. paper-search-mcp: A mcp for searching and downloading academic papers from multiple sources like arxiv,
pubmed, biorxiv, etc. https://github.com/openags/paper-search-mcp, 2025. MIT License, Accessed: 2025-06-24. [66] Manmohan Alla. Scalable mcp server-client architecture with fastmcp in microservices. Journal Of Multidisciplinary,
5(7):823­829, 2025. [67] Jong-yi Hong, Eui-ho Suh, and Sung-Jin Kim. Context-aware systems: A literature review and classification. Expert
Systems with applications, 36(4):8509­8522, 2009. [68] Anind K Dey. Understanding and using context. Personal and ubiquitous computing, 5(1):4­7, 2001. [69] Jamil Fayyad, Mohammad A Jaradat, Dominique Gruyer, and Homayoun Najjaran. Deep learning sensor fusion for
autonomous vehicle perception and localization: A review. Sensors, 20(15):4220, 2020. [70] Qin Tang, Jing Liang, and Fangqi Zhu. A comparative review on multi-modal sensors fusion based on deep learning.
Signal Processing, 213:109165, 2023. [71] Yuxiao Zhang, Alexander Carballo, Hanting Yang, and Kazuya Takeda. Perception and sensing for autonomous vehicles
under adverse weather conditions: A survey. ISPRS Journal of Photogrammetry and Remote Sensing, 196:146­177, 2023. [72] Zhengwei Bai, Guoyuan Wu, Matthew J Barth, Yongkang Liu, Emrah Akin Sisbot, Kentaro Oguchi, and Zhitong
Huang. A survey and framework of cooperative perception: From heterogeneous singleton to hierarchical cooperation. IEEE Transactions on Intelligent Transportation Systems, 2024. [73] Yangjie Ji, Zewei Zhou, Ziru Yang, Yanjun Huang, Yuanjian Zhang, Wanting Zhang, Lu Xiong, and Zhuoping Yu. Toward autonomous vehicles: A survey on cooperative vehicle-infrastructure system. Iscience, 27(5), 2024. [74] Lucas Bréhon-Grataloup, Rahim Kacimi, and André-Luc Beylot. Mobile edge computing for v2x architectures and applications: A survey. Computer Networks, 206:108797, 2022. [75] Manzoor Ahmed, Salman Raza, Muhammad Ayzed Mirza, Abdul Aziz, Manzoor Ahmed Khan, Wali Ullah Khan, Jianbo Li, and Zhu Han. A survey on vehicular task offloading: Classification, issues, and challenges. Journal of King Saud University-Computer and Information Sciences, 34(7):4135­4162, 2022. [76] Syed Adnan Yusuf, Arshad Khan, and Riad Souissi. Vehicle-to-everything (v2x) in the autonomous vehicles domain­ a technical review of communication, sensor, and ai technologies for road user safety. Transportation Research Interdisciplinary Perspectives, 23:100980, 2024. [77] Qinrui Tang and Hao Cheng. Feature pyramid bilstm: Using smartphone sensors for transportation mode detection. Transportation Research Interdisciplinary Perspectives, 26:101181, 2024. [78] Mahdieh Kamalian, Paulo Ferreira, and Eric Jul. A survey on local transport mode detection on the edge of the network. Applied Intelligence, 52(14):16021­16050, 2022. [79] Paria Sadeghian, Johan Håkansson, and Xiaoyun Zhao. Review and evaluation of methods in transport mode detection based on gps tracking data. Journal of Traffic and Transportation Engineering (English Edition), 8(4):467­482, 2021. [80] Wanli Li, Jing Huang, Guoqi Xie, Fakhri Karray, and Renfa Li. A survey on vision-based driver distraction analysis. Journal of Systems Architecture, 121:102319, 2021. [81] Michael A Nees and Claire Liu. Mental models of driver monitoring systems: perceptions of monitoring capabilities in an online us-based sample. Transportation research part F: traffic psychology and behaviour, 91:484­498, 2022. [82] Neha Sharma, Chhavi Dhiman, and Seema Indu. Pedestrian intention prediction for autonomous vehicles: A comprehensive survey. Neurocomputing, 508:120­152, 2022. [83] Jincao Zhou, Xin Bai, Weiping Fu, Benyu Ning, and Rui Li. Pedestrian intention estimation and trajectory prediction based on data and knowledge-driven method. IET Intelligent Transport Systems, 18(2):315­331, 2024. [84] Iago Pachêco Gomes and Denis Fernando Wolf. A comprehensive review of deep learning techniques for interactionaware trajectory prediction in urban autonomous driving. Neurocomputing, page 131014, 2025. [85] Taokai Xia and Hui Chen. A survey of autonomous vehicle behaviors: Trajectory planning algorithms, sensed collision risks, and user expectations. Sensors, 24(15):4808, 2024. [86] Valentino Servizi, Francisco C Pereira, Marie K Anderson, and Otto A Nielsen. Transport behavior-mining from smartphones: a review. European transport research review, 13(1):57, 2021. [87] Indukuri Mani Varma and Neetesh Kumar. A comprehensive survey on sdn and blockchain-based secure vehicular networks. Vehicular Communications, 44:100663, 2023. [88] Lizhuang Tan, Wei Su, Wei Zhang, Jianhui Lv, Zhenyi Zhang, Jingying Miao, Xiaoxi Liu, and Na Li. In-band network telemetry: A survey. Computer Networks, 186:107763, 2021. [89] Muhammad Sohail, Zohaib Latif, Shahzeb Javed, Sujit Biswas, Sahar Ajmal, Umer Iqbal, Mohsin Raza, and Abd Ullah Khan. Routing protocols in vehicular adhoc networks (vanets): A comprehensive survey. Internet of things, 23:100837, 2023. [90] Weiwei Jiang and Jiayun Luo. Graph neural network for traffic forecasting: A survey. Expert systems with applications, 207:117921, 2022.

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

Model Context Protocols in Adaptive Transport Systems: A Survey

29

[91] Shams Forruque Ahmed, Sweety Angela Kuldeep, Sabiha Jannat Rafa, Javeria Fazal, Mahfara Hoque, Gang Liu, and Amir H Gandomi. Enhancement of traffic forecasting through graph neural network-based information fusion techniques. Information Fusion, 110:102466, 2024.
[92] Tesnim Mekki, Issam Jabri, Abderrezak Rachedi, and Lamia Chaari. Software-defined networking in vehicular networks: A survey. Transactions on Emerging Telecommunications Technologies, 33(10):e4265, 2022.
[93] Mohd Fikri Azli Abdullah, Sumendra Yogarayan, Siti Fatimah Abdul Razak, Afizan Azman, Anang Hudaya Muhamad Amin, and Mazrah Salleh. Edge computing for vehicle to everything: a short review. F1000Research, 10:1104, 2023.
[94] Leo Mendiboure, Mohamed-Aymen Chalouf, and Francine Krief. Edge computing based applications in vehicular environments: Comparative study and main issues. Journal of Computer Science and Technology, 34(4):869­886, 2019.
[95] Xinyi Hou, Yanjie Zhao, Shenao Wang, and Haoyu Wang. Model context protocol (mcp): Landscape, security threats, and future research directions. arXiv preprint arXiv:2503.23278, 2025.
[96] Piyush Patil. Inside the mcp protocol: Revolutionizing data communication and system interoperability. World Journal of Advanced Research and Reviews, 26(1):3055­3071, 2025.
[97] Chuning Zhu, Raymond Yu, Siyuan Feng, Benjamin Burchfiel, Paarth Shah, and Abhishek Gupta. Unified world models: Coupling video and action diffusion for pretraining on large robotic datasets, 2025.
[98] Shihao Jiang, Yu Zhang, Junqiang Li, Hongfang Yu, Long Luo, and Gang Sun. A survey of network protocol fuzzing: Model, techniques and directions. arXiv preprint arXiv:2402.17394, 2024.
[99] Aditi Singh, Abul Ehtesham, Saket Kumar, and Tala Talaei Khoei. A survey of the model context protocol (mcp): Standardizing context to enhance large language models (llms). 2025.
[100] João Gama, Indre Zliobaite, Albert Bifet, Mykola Pechenizkiy, and Abdelhamid Bouchachia. A survey on concept drift adaptation. ACM computing surveys (CSUR), 46(4):1­37, 2014.
[101] Network Survey. Network survey, 2025. Wireless Protocol Survey Android App, Accessed: 2025-06-24. [102] Wendi Rabiner Heinzelman, Joanna Kulik, and Hari Balakrishnan. Adaptive protocols for information dissemination
in wireless sensor networks. In Proceedings of the 5th annual ACM/IEEE international conference on Mobile computing and networking, pages 174­185, 1999. [103] Intelligent Transportation Society of America. Building today's and tomorrow's intelligent transportation systems, 2024. Accessed: 2025-07-12. [104] XenaTech. Challenges and opportunities of implementing intelligent transportation systems, 2024. Accessed: 2025-07-12. [105] ITSDigest. Gao report 2023: Intelligent transportation system (its) challenges, 2023. Accessed: 2025-07-12. [106] Geldner. The gateway dtls attack, 2024. Accessed: 2025-07-12. [107] Ahsan Waqar, Abdulaziz H Alshehri, Fayez Alanazi, Saleh Alotaibi, and Hamad R Almujibah. Evaluation of challenges to the adoption of intelligent transportation system for urban smart mobility. Research in Transportation Business & Management, 51:101060, 2023. [108] Paul Agbaje, Afia Anjum, Arkajyoti Mitra, Emmanuel Oseghale, Gedare Bloom, and Habeeb Olufowobi. Survey of interoperability challenges in the internet of vehicles. IEEE Transactions on Intelligent Transportation Systems, 23(12):22838­22861, 2022. [109] Sisinnio Concas, Vishal C Kummetha, and Lisa Staes. Mobility data­standards and specifications for interoperability. Technical report, 2024. [110] Network and Penn State University Security Research Group. Paper on adaptive federated learning accepted to jsac. https://nsrg.cse.psu.edu/2019/02/11/paper-on-adaptive-federated-learning-accepted-to-jsac/, 2019. Accessed: 2025-06-24. [111] Association for Computing Machinery. Acm launches new journal on autonomous transportation systems, 2022. Accessed: 2025-06-24.
Received 26 August 2025

ACM Comput. Surv., Vol. 1, No. 1, Article . Publication date: August 2025.

