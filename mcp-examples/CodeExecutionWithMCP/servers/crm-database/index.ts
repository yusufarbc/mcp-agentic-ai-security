// servers/crm-database/index.ts

interface Order {
  id: string;
  amount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export const getOrders = async (): Promise<Order[]> => {
  // Büyük bir veri kümesini simüle et
  const orders: Order[] = [];

  // Belirli hedef siparişleri ekle
  orders.push({ id: "A1", amount: 55000, status: "Pending" });
  orders.push({ id: "B2", amount: 72000, status: "Pending" });
  orders.push({ id: "C3", "amount": 60000, status: "Pending" });

  // Biraz gürültü ekle (diğer siparişler)
  for (let i = 0; i < 100; i++) {
    orders.push({
      id: `N${i}`,
      amount: Math.floor(Math.random() * 10000), // Küçük tutarlar
      status: Math.random() > 0.5 ? 'Shipped' : 'Pending'
    });
  }

  // Yüksek tutarlı ama beklemede olmayan bir sipariş ekle
  orders.push({ id: "D4", amount: 80000, status: "Shipped" });

  return orders;
};
