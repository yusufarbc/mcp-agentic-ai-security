import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Hata: GEMINI_API_KEY .env dosyasında veya ortam değişkenlerinde ayarlanmamış.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

async function main() {
    const userQuery = "Büyük bir satış veritabanından, sadece 'Beklemede' olan 50.000$ üzeri siparişleri bul ve listele.";

    console.log(`Kullanıcı İsteği: "${userQuery}"`);
    console.log("Gemini 2.0 Flash-Lite ile kod üretiliyor...");

    const prompt = `
    You are an expert software engineer agent.
    Your task is to write a TypeScript script to solve the user's query using the available tools.
    
    AVAILABLE TOOLS/LIBRARIES:
    - You have access to a local module at './servers/crm-database' which exports:
      - \`getOrders(): Promise<{ id: string; amount: number; status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' }[]>\`
    
    USER QUERY: "${userQuery}"
    
    REQUIREMENTS:
    1. Import the tool using: \`import * as crm from './servers/crm-database';\`
    2. Fetch all data using \`crm.getOrders()\`.
    3. Filter the data IN MEMORY (do not print the whole list).
    4. Print the count of found items.
    5. Print the filtered list of items.
    6. Output ONLY the valid TypeScript code block. Do not include markdown backticks or explanations outside the code.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let code = response.text();

    // Varsa markdown biçimlendirmesini temizle
    code = code.replace(/```typescript/g, "").replace(/```/g, "").trim();

    console.log("\n--- Üretilen Kod ---\n");
    console.log(code);
    console.log("\n----------------------\n");

    const generatedFilePath = path.join(__dirname, "generated_task.ts");
    fs.writeFileSync(generatedFilePath, code);

    console.log("Üretilen kod çalıştırılıyor...\n");

    try {
        // ts-node kullanarak çalıştır
        const output = execSync(`npx ts-node ${generatedFilePath}`, { encoding: 'utf-8' });
        console.log("\n--- Çalıştırma Çıktısı ---\n");
        console.log(output);
    } catch (error: any) {
        console.error("Çalıştırma başarısız oldu:", error.message);
        if (error.stdout) console.log("Stdout:", error.stdout);
        if (error.stderr) console.error("Stderr:", error.stderr);
    }
}

main();
