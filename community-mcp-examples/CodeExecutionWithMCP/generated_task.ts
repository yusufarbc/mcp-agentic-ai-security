import * as crm from './servers/crm-database';

async function findPendingOrdersOver50k() {
  const orders = await crm.getOrders();
  const filteredOrders = orders.filter(order => order.status === 'Pending' && order.amount > 50000);
  console.log(`Found ${filteredOrders.length} pending orders over $50,000:`);
  console.log(filteredOrders);
}

findPendingOrdersOver50k();