# Boşluk Analizi (Gap Analysis) — Türkçe

> Bu doküman, orijinal araştırma arşivinden (`mcp-agentic-security-review-main`) taşınmıştır ve henüz [01-08 numaralı İngilizce dokümanlara](.) entegre edilmemiş literatür boşluk analizini orijinal dilinde içerir.

Model Bağlam Protokolü (MCP) ekosistemine yönelik mevcut çalışmaların kapsamlı analizi, protokolün mimari standartlaştırma konusunda büyük bir başarı elde ettiğini, ancak bu başarının LLM'lerin performans, güvenlik ve ekosistem yönetişimi gibi alanlarda getirdiği önemli ve çözülmemiş zorlukları açığa çıkardığını göstermektedir.

Aşağıda, mevcut çalışmaların yeterliliği, eksiklikleri ve temel sınırlılıkları detaylı bir şekilde analiz edilmiştir.

### I. Mevcut Çalışmaların Kapsamı ve Yeterliliği

Literatür, MCP'yi LLM destekli otonom sistemlerin omurgası olarak sağlam bir şekilde konumlandırmıştır ve protokolün mimari temellerini ve amaçlarını yeterince kapsamıştır.

#### 1. Mimari Temeller ve Standardizasyon
MCP, LLM'ler ile harici araçlar ve kaynaklar arasında **birleşik, çift yönlü iletişim** ve **dinamik keşif** sağlayan açık bir standart olarak net bir şekilde tanımlanmıştır. Protokolün mimarisi (Host, Client, Server) ve iletişim mekanizması (JSON-RPC 2.0) detaylıca açıklanmıştır. Bu standardizasyon, LLM entegrasyonunda karşılaşılan **"N x M" parçalanma zorluğunu** çözerek, LLM'lerin pasif metin üreticilerinden **otonom ajanlara** geçişini desteklemedeki kritik rolünü teyit etmiştir.

#### 2. Güvenlik Tehditlerinin Kapsamlı Modellemesi
Araştırmalar, protokolün yeni riskler getirdiği gerçeğine **proaktif** bir şekilde yanıt vermiştir. MCP sunucusunun tam yaşam döngüsü (oluşturma, dağıtım, işletim, bakım) tanımlanmış ve bu yaşam döngüsü boyunca ortaya çıkan riskleri kapsayan **16 tehdit senaryosundan** oluşan kapsamlı bir tehdit taksonomisi oluşturulmuştur. Bu taksonomi, **araç zehirleme** ve **dolaylı istem enjeksiyonu** gibi MCP'ye özgü tehdit vektörlerini ayrıntılı olarak ele alır.

#### 3. Ampirik Doğrulama ve Tehdit Yaygınlığı
Yapılan ilk büyük ölçekli ampirik çalışmalar (1.899 açık kaynak MCP sunucusu üzerinde), teorik risklerin **gerçek dünyadaki yaygınlığını** doğrulamıştır: sunucuların %7,2'sinde genel güvenlik açıkları ve **%5,5'inde MCP'ye özgü araç zehirleme** riski tespit edilmiştir. Ayrıca, sunucuların %66'sında kod kokusu gibi yaygın bakım sorunlarına rastlanmıştır.

#### 4. Otomasyon ve Ölçeklenebilir Dağıtım Çözümleri
Çalışmalar, MCP sunucusu kurulumundaki **manuel geliştirme darboğazının** çözüldüğünü göstermiştir. **AutoMCP** gibi derleyiciler, OpenAPI spesifikasyonlarından tam işlevli MCP sunucularını büyük ölçüde otomatik olarak üretebilmektedir (%99,9 başarı oranı). Ayrıca, **FaaS (Hizmet Olarak İşlev)** platformlarının (örneğin AWS Lambda) MCP sunucularını barındırmak için kullanılması (**AgentX** modeli), protokolün **kurumsal ölçeklenebilirlik ve maliyet optimizasyonu** gereksinimleriyle uyumlu olduğunu kanıtlamıştır.

### II. Mevcut Çalışmaların Eksiklikleri, Sınırlılıkları ve Kritik Boşluklar (Gap Analysis)

Mevcut çalışmalar, protokolün mimari çerçevesini oluşturmakta yeterli olsa da, MCP'nin tam potansiyeline ulaşmasını engelleyen ve acil araştırma gerektiren kritik eksiklikler ve sınırlılıklar mevcuttur.

#### 1. LLM Uyumunda Düşük Güvenilirlik ve Kümülatif Risk Boşluğu
**Eksiklik:** LLM'lerin standardizasyona rağmen **güvenilir ve tutarlı araç koordinasyonunda** başarısız olması.

*   **Sınırlılık:** **MCPGAUGE** çalışması, MCP entegrasyonunun LLM etkinliğini artırmadığını, aksine altı ticari modelde ortalama **%9,5 performans düşüşüne** neden olduğunu göstermiştir. Bu, LLM'lerin dış bağlamı **etkili bir şekilde kullanma** ve zararlı bilgiyi filtreleme yeteneğinin yetersiz olduğunu gösterir.
*   **Kritik Arıza Modları:** En gelişmiş modeller bile **çok adımlı görevlerde %60'ın altında** başarı oranı sergilemektedir (LiveMCP-101, MCP-Universe). Ajanlar, gereksinimi göz ardı etme veya **"aşırı kendine güvenen kendi kendine çözümleme"** (harici aracı atlayıp içsel bilgiye güvenme) gibi kritik arıza modları sergilemektedir.
*   **Kümülatif Zarar (STAC):** Mevcut savunmaların ve LLM muhakemesinin en büyük sınırlılığı, **Sıralı Araç Saldırı Zincirlemesi (STAC)** ile gelen **kümülatif zararı** öngörememesidir. Bireysel olarak masum görünen adımların (dosya okuma + harici adrese gönderme) oluşturduğu zincirleme etkiyi engelleyecek yerleşik bir mekanizma bulunmamaktadır.

#### 2. Güvenlik Denetimi ve Tespit Araçlarında Yetersizlik
**Eksiklik:** MCP'ye özgü saldırıların **güvenilir bir şekilde tespit edilmesi** için gerekli olgun araç ve metodolojinin bulunmaması.

*   **Sınırlılık:** Ampirik veriler, geleneksel statik analiz araçlarının (SonarQube) MCP'ye özgü zafiyetleri tespit etmede **yetersiz** kaldığını kanıtlamıştır. Mevcut MCP tarayıcıları (`mcp-scan`), ilk aşamalarda, **sınırlı kapsama** ve **güvenilirlik sorunları** ile mücadele etmektedir.
*   **Yeni Saldırı Vektörleri:** **Sampling** özelliğinin kötüye kullanımı, sunucuların LLM token kotalarını çalmak veya istemcinin LLM'ine **kalıcı talimatlar enjekte etmek** (Conversation Hijacking) için kullanabileceği yeni ve tehlikeli bir vektör olarak tanımlanmıştır. Bu, LLM'in kendisini saldırganın amaçları için kullanmasını sağlayan bir kontrol kaybı sorunudur.
*   **İzolasyon Eksikliği:** MCP protokolü, protokol düzeyinde bir yalıtım (sandboxing) sağlamadığı için, güvenlik tamamen **barındırma ortamının yapılandırmasına** bağlıdır. Bu durum, Sandbox Kaçışı veya Komut Enjeksiyonu risklerini artırmaktadır.

#### 3. Ölçeklenebilirlik ve Bağlam Yönetimi Kısıtlılıkları
**Eksiklik:** Büyük araç envanterlerini **LLM bağlam penceresi sınırlamasını** aşmadan verimli bir şekilde yönetme yeteneği.

*   **Sınırlılık:** LLM'nin **bağlam penceresinin katı kısıtlaması**, bir ajanın tek bir çalışmada etkili bir şekilde değerlendirebileceği araçların sayısını sınırlandırmaktadır. Araç tanımlarının (şemaların) ve ara sonuçların LLM bağlamına yüklenmesi, **önemli hesaplama yükü** ve **token verimsizliği** yaratır (3.25x ila 236.5x token artışı).
*   **Çözüm Yetersizliği:** Her ne kadar **"Code Execution with MCP"** paradigması (Code Mode) ile araç tanımlarının sadece gerektiğinde yüklenmesi ve verilerin sandbox ortamında filtrelenmesi önerilse de, bu teknik hala bir **mimarinin ötesinde LLM'nin kendi kapasite limitleri** ile mücadele etmektedir.

#### 4. Yönetişim ve Kurumsal Güven Zorlukları
**Eksiklik:** Merkezi olmayan (decentralized) ekosistemde **tek tip güvenlik politikaları** ve **güven sınırları** için zorunlu kılınmış yönetişim mekanizmaları.

*   **Sınırlılık:** MCP sunucu yönetiminin bağımsız geliştiriciler tarafından yapılması, **merkezi bir denetim otoritesinin olmamasına** yol açar. Bu, tutarsız yama uygulamalarına, **yapılandırma sapmasına** ve uzun süreli **ayrıcalık kalıcılığına** neden olur.
*   **Kurumsal Uyum Eksikliği:** MCP, OAuth 2.1'i desteklese de, ilk spesifikasyonda kurumsal güvenlik gereklilikleriyle (örneğin Konfüze Vekil Sorunu'nu azaltmak için **RFC 8707** kullanımı) çelişen veya yetersiz kalan noktalar tespit edilmiştir. Protokolün **OAuth 2.1 Kaynak Göstergeleri (RFC 8707)** gibi sıkı standartları zorunlu kılmaması, kurumsal uygulamada yüksek risk taşımaktadır.
*   **Kullanıcı Denetiminin Zorluğu:** Otonom ajanlar adına kritik eylemler (finansal işlemler, dosya yazma) yapılmadan önce **kullanıcı onayı** (Human-in-the-Loop) önerilse de, bu durumun tekrarlayan görevlerde **"onay yorgunluğuna"** yol açması ve kullanıcının gözden kaçırması riski, bir güvenlik sınırlılığıdır.

### III. Gelecekteki Araştırma ve Geliştirme Yönelimleri

Mevcut çalışmaların ortaya çıkardığı boşluklar, MCP'nin uzun vadeli başarısı için kritik araştırma yollarını işaret etmektedir:

1.  **Proaktif Savunma Mimarileri:** Geleneksel çıktı filtrelemesinin ötesine geçen sistem düzeyinde denetime odaklanılmalıdır. **Bilgi Akışı Kontrolü (IFC)** prensipleri ve **dinamik taint-tracking** mekanizmaları geliştirilerek, düşük bütünlüğe sahip verinin (zehirli istem) ajanın sonuçsal eylemleri (STAC zincirleri) tetiklemesi engellenmelidir.
2.  **MCP-Uyumlu Model Eğitimi:** LLM'lerin **proaktiflik** ve **uyumluluk** sorunlarını çözmek için özel fine-tuning stratejileri geliştirilmelidir. Eğitim, LLM'lerin araç açıklamalarındaki meta verileri güvenilir bir şekilde ayrıştırmasını ve araçları daha tutarlı, daha az aşırı kendine güvenli bir şekilde kullanmasını sağlamalıdır.
3.  **Güvenlik ve Sürdürülebilirlik Yönetişimi:** Merkezi bir denetim eksikliğinden kaynaklanan riskleri azaltmak için **zorunlu yapılandırma doğrulaması**, **otomatik sürüm kontrolleri** ve **dijital imzalar** gibi teknik yönetişim çözümleri MCP kayıtlarına entegre edilmelidir.
4.  **Sandbox ve İzolasyonun Standartlaştırılması:** MCP protokolü düzeyinde yerleşik izolasyon (sandbox) mekanizmalarının geliştirilmesi, güvenliğin tamamen barındırma ortamına bağlı olma riskini azaltacaktır.
5.  **Otomatik Kırmızı Takım (Red Teaming):** **AutoMalTool** gibi otomatik kırmızı takım çerçeveleri, mevcut savunmaları aşabilen kötü niyetli MCP araçları üreterek ajans manipülasyonu riskini sistematik olarak test etmek için yaygınlaştırılmalıdır.
6.  **Token Verimliliği:** Daha fazla araca erişimi mümkün kılmak için **şema sıkıştırma teknikleri** ve bağlamsal önceliklendirme mekanizmaları aracılığıyla token tüketiminin azaltılmasına odaklanılmalıdır.
