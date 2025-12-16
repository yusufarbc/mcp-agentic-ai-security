// agent_script.ts
import * as crm from './servers/crm-database';

async function main() {
    // Tüm siparişleri çek ama LLM'e gösterme, değişkene ata
    const allOrders = await crm.getOrders();

    // KOD ORTAMINDA filtrele (LLM bu aşamada veri görmez)
    const highValuePending = allOrders.filter(order =>
        order.status === 'Pending' && order.amount > 50000
    );

    // Sadece filtrelenmiş, temiz sonucu yazdır
    console.log(`Bulunan Sipariş Sayısı: ${highValuePending.length}`);
    console.log(highValuePending);
}

main();
