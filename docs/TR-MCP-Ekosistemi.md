> Auto-extracted plain text from [`TR-MCP-Ekosistemi.pdf`](./TR-MCP-Ekosistemi.pdf) via `pdftotext`. Tables, figures, and layout are not preserved here — consult the PDF for those.

MCP-Model Context Protocol
Mimari Analiz, Tehdit Vektörleri ve Savunma Stratejileri
Yusuf Talha Arabacı
Yazılım Mühendisliği Yüksek Lisans Öğrencisi Karabük Üniversitesi | Aralık 2025

Giriş: Birlikte Çalışabilirlik Krizi

Her AI uygulaması, harici araçlarla iletişim kurmak için özel bağlantılar gerektiriyordu. Bu durum, yüksek bakım maliyetlerine, yavaş geliştirme süreçlerine ve ölçeklendirme zorluklarına yol açıyordu.

MCP, AI uygulamaları için bir 'USB-C' standardı gibi çalışarak, LLM'lerin dış sistemlerle bağlanması için evrensel bir yol sağlar. Bu, geliştirme süreçlerini basitleştirir ve ölçeklenebilir bir ekosistem yaratır.

Çözüm: MCP Nedir?
Tanım: Anthropic tarafından Kasım 2024'te tanıtılan, AI modelleri ile harici araçlar veya kaynaklar arasında birleşik, çift yönlü iletişim ve dinamik keşif sağlayan açık bir standarttır. Genellikle AI uygulamaları için "USB-C portu" olarak anılır.
Temel Amacı: Zekayı (Model) veri kaynaklarından ve araçlardan ayırarak evrensel bir bağlantı sağlamaktır.
Stratejik Rol: LLM'leri pasif metin üreticilerinden, gerçek dünyada eylemler gerçekleştirebilen otonom ajanlara dönüştürmenin temelini atar.
https://modelcontextprotocol.io/ https://www.anthropic.com/news/model-context-protocol

Temel Mimari Bileşenler
MCP, temiz bir istemci-sunucu mimarisi kullanır ve iletişim JSON-RPC protokolü üzerinden gerçekleşir.
MCP Host: LLM'i barındıran ana uygulama (Claude Desktop, VS Code, Cursor).
MCP Client: Host içinde yer alır, LLM'in isteğini standart RPC çağrılarına çevirir ve sunucuyla 1:1 bağlantıyı yönetir.
MCP Server: Harici yetenekleri (API, veritabanı, dosya sistemi) sunan harici hizmet veya programdır.

Mimari ve Protokolün Temel Taşları
Handshake (El Sıkışma): Host ve Server arasında yetenek ve kimlik bilgilerinin karşılıklı müzakeresi .
3 Temel Bileşen (Primitives): Araçlar: Eylem ve kod yürütme. Kaynaklar: Salt okunur veri akışları . İstemler: Hazır görev ve iş akışı şablonları.
Taşıma Katmanları: Stdio: Yerel süreçler arası hızlı ve güvenli iletişim . HTTP/SSE: Uzak bağlantılar ve bulut tabanlı sistemler için standart.
https://modelcontextprotocol.io/specification/2025-06-18

Yerel Veri ve Araç Entegrasyonu (MCP)
Doğrudan Bağlantı: Claude Desktop, GitHub Copilot veya Gemini gibi AI asistanlarını; bilgisayarınızdaki dosyalara, veritabanlarına ve yerel yazılımlara güvenli bir şekilde bağlar.
Kişiselleştirilmiş Asistan: Basit bir yapılandırma ile AI, yerel dosyalarınızı analiz edebilir, raporlar oluşturabilir ve sizin adınıza masaüstü araçlarını kullanabilir.
Tam Kontrol ve Güvenlik: AI’nın hangi klasörlere erişebileceği kullanıcı tarafından belirlenir ve her işlem için açık onay mekanizması çalışır.
Veri Egemenliği: Verileriniz yerelde kalırken, AI’nın işlem gücü doğrudan kendi çalışma alanınıza dahil olur.
https://modelcontextprotocol.io/quickstart/user

Uygulama Örneği: Claude Desktop & MCP
Yapılandırma: JSON dosyası ile yerel sunucu (char-counter) tanımlanması. Otonom Eylem: Modelin count_a aracını görev için otomatik tetiklemesi. Teknik Altyapı: Yerel betiğin (subprocess) standart protokol ile fastmcp ile yazdığımız sunucuyla hberleşmesi.
https://modelcontextprotocol.io/examples

Performans Sorunu: "Context Bloat"
Tanım: Büyük Dil Modellerinin (LLM), her bir harici araç için JSON şemalarını, dökümantasyonları ve ara işlem sonuçlarını kendi bağlam penceresine (context window) yüklemesiyle oluşan aşırı veri yüküdür.
Maliyet Etkisi: Literatürde yapılan araştırmalarda binlerce araca sahip sistemlerde, girdi token maliyetlerinin 236 kata kadar arttığı gözlemlenmiştir.
Lost in the Middle (Samanlıkta iğne aramak): Modelin yoğun metinler arasında kritik araç tanımlarını veya ana görevi unutması.

Bağlam Şişmesi (Context Bloat)

Devrimsel Çözüm: Kod Yürütme Paradigması
Yaklaşım: Her adımda ayrı araç çağırmak yerine, modelin tüm işlemleri yapacak bir Python betiği yazması. Verimlilik: Token kullanımında %98,7 tasarruf sağlanması. Kademeli Bilgi (Progressive Disclosure): Modelin sadece ihtiyaç duyduğu araçları dosya sisteminden yüklemesi.
https://www.anthropic.com/engineering/code-execution-with-mcp

Devrimsel Çözüm: Kod Yürütme Paradigması
LLM, her işlem adımı için aracıya (agent) ne yapması gerektiğini söyleyen metin tabanlı komutlar üretir. Bu sürekli git-gel trafiği, her yeni etkileşimde bağlam penceresini (context window) tekrarlanan verilerle hızla
tüketerek büyük ölçekli görevlerde verimliliği ve kapasiteyi sınırlar.
https://blog.cloudflare.com/code-mode/

Devrimsel Çözüm: Kod Yürütme Paradigması
LLM, araçları yönetecek karmaşık mantığı içeren kodu tek seferde yazar ve bu kod izole bir Sandboxda güvenle yürütülür. Mantıksal akışı yerelde çözerek LLM ile olan git-gel trafiğini minimize eder; böylece bağlam penceresinden ciddi tasarruf sağlar ve çok adımlı operasyonları otonom bir verimlilikle tamamlar.
https://blog.cloudflare.com/code-mode/

Güvenlik Analizi: "Ölümcül Üçlü" (Lethal Trifecta)
Risk Bileşimi: Ajanlara verilen üç yetkinin birleşmesi kritik bir tehdit oluşturur:
1.Veri Erişimi: Hassas ve özel verilere sorgu yetkisi. 2.İnternet Bağlantısı: Dış dünya ile kontrolsüz iletişim. 3.Otonom Eylem: Sistem üzerinde doğrudan işlem yapma gücü.
Tehlike: Basit bir sohbet robotunun "root" (yönetici) yetkili bir kullanıcıya dönüşmesi

Temel Tehdit Vektörleri
Dolaylı İstem Enjeksiyonu (IPI): Ajanın okuduğu dış içeriklerdeki (web sayfası vb.) gizli talimatlarla saldırgan tarafından ele geçirilmesi.
Araç Zehirlenmesi (Tool Poisoning): Tedarik zinciri saldırısı, mevcut MCP sunucularının %5.5'i halihazırda güvenlik açığı barındırmaktadır.
Örnekleme Manipülasyonu: Sunucunun modele sahte veriler sunarak karar alma sürecini sabote etmesi ve AI'ı yanlış yönlendirmesi.

Savunma Stratejileri
Kademeli Sandboxing: Kod yürüten riskli araçların mikroVM (örn. Firecracker) içinde izole edilmesi.
Leke Takibi (Taint Tracking): Güvenilmeyen dış verinin işaretlenmesi ve temizlenmeden kritik işlemlere sokulmaması .
Güven Kaydı (Trust Registry): Sunucular için SSL benzeri merkezi bir kimlik doğrulama ve onay mekanizması .
Hedef: Güvenliği sonradan eklenen bir yama değil, sistemin temeli (Secure-bydefault) haline getirmek.

MCP Ekosistemi: Araçlar ve Riskler

Araç Platformları
Smithery: MCP sunucularını keşfetmek ve tek komutla kurmak için en popüler dağıtım noktası.
Glama.ai & MCP.get: Google Maps, Slack, PostgreSQL gibi topluluk destekli onlarca sunucunun dizini.
Anthropic Official: Protokol kurucusu tarafından sağlanan, referans niteliğindeki "güvenilir" sunucu koleksiyonu.

Durum Analizi ve Risk
Denetimsiz Büyüme: Araçların çoğu topluluk yapımıdır; bu da "araç zehirlenmesi" (tool poisoning) riskini artırır.
Olgunluk Süreci: Ekosistem şu an "regülasyon boşluğu" aşamasındadır; ancak ISO 42001 gibi standartlarla merkezi güven kayıtlarına doğru evrilmektedir.

Mimari Vizyon: Verimlilik ve "Local-First"
1. Verimlilik Devrimi Kod Yürütme (Code Execution): Modelin çoklu API tanımları yerine doğrudan kod yazıp çalıştırması, bağlam şişmesini (context bloating) %98 oranında azaltmıştır.
2. Güvenli Çalışma Zamanı İzolasyon: Otonom eylem riskleri, araçların mikroVM (Firecracker) gibi izole ortamlarda çalıştırılmasıyla minimize edilmektedir.
3. Gelecek Vizyonu: "Local-First" AI Veri Egemenliği: İşlem gücünün buluttan yerel sunucuya (On-premise) dönmesi. Gizlilik: Hassas verilerin internete çıkmadan işlenmesi.

Teknik Sınırlar: Güvenilirlik Bariyeri
Protokol vs. Davranış: Teknik altyapı standart olsa da, modellerin araç kullanım yönergelerine uyumunda sapmalar yaşanmaktadır .
%40 Hata Payı: En gelişmiş modeller (GPT-4o, Claude 3.5), karmaşık ve çok adımlı MCP görevlerinde %40'ın üzerinde başarısızlık oranına sahiptir.
Bağlam Kaybı: Görev karmaşıklaştıkça modelin ana hedeften uzaklaşması ve araçlar arasında "mantıksal kopukluk" yaşaması.
Kritik Eşik: Protokolün kararlılığı, modelin "akıl yürütme" kapasitesiyle sınırlıdır.

Etik ve Sorumluluk Paradoksu
1. Karar Verici Kim? (The Responsibility Gap) MCP ajanlarının otonom eylemleri (örn. kritik veri silme) sonucunda doğan zararda, sorumluluğun geliştirici, operatör veya model arasında belirsizleşmesi sorunsalıdır.
2. Güvenlik ve Fonksiyonellik Dengesi Protokolün esnekliği ile kurumsal "Zero Trust" (Sıfır Güven) politikalarının çatışması; sisteme verilen her yeni yetkinin (capability) aynı zamanda yeni bir saldırı yüzeyi oluşturması paradoksudur.
3. Gözetim Şeffaflığı ve "Human-in-the-Loop" Sistemin otonom hız avantajını kaybetmeden, kritik işlemlerde insan onay mekanizmasının entegre edilme zorunluluğu ve denetim-verimlilik dengesidir.

Sonuç ve Vizyon: AGI'ya Giden Yol
1. Statik Modelden "Dijital Çalışan"a (Dönüşüm) Mevcut LLM'ler "kavanozdaki beyin" gibidir; çok zekidirler ancak eylemsizdirler. MCP, bu beyne dosya sistemleri ve API'lar üzerinden "eller ve kollar" ekleyerek, onları sadece sohbet eden botlardan, gerçek dünyada iş bitiren yetkili dijital çalışanlara dönüştürür.
2. Geleceğin Mimarisi: "Agentic Web" (Vizyon) Standartlaşma tamamlandığında MCP, "AI dünyasının işletim sistemi" olacaktır. Geleceğin interneti sadece insanların okuması için HTML sayfaları değil; ajanların doğrudan etkileşime girmesi için MCP sunucuları barındıran hibrit bir yapıya evrilecektir.
3. Güvenlik ve Kontrol (Zorunluluk)Yapay Genel Zekaya (AGI) giden yolda, otonom kararlar alabilen bu ajanların kontrolü sonradan eklenen yamalarla sağlanamaz. Güvenlik; protokolün çekirdeğine işlenmiş (Secure-by-design), katı yetki sınırları ve izolasyon (sandboxing) ile mimarinin başlangıç noktası olmalıdır.

ChatGPT: AGI'ya Giden Yol

Gemini: AGI'ya Giden Yol

Claude: AGI'ya Giden Yol

Grok: AGI'ya Giden Yol

