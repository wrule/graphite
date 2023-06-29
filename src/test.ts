import fs from 'fs';
import { okex5 } from 'ccxt';
import { CreateOKXSpot } from './exchange/okx/spot';

const secret = require('../.secret.okx.json');

async function main() {
  const spot = await CreateOKXSpot(secret.exchange);
  const b = await spot.Exchange.fetchBalance();
  console.log(b);
  let order = await spot.MarketLongClose('ETH/USDT', 0.01086913);
  order = await spot.Exchange.fetchOrder(order.id, 'ETH/USDT');
  fs.writeFileSync('output/output-okx-sell-detail.json', JSON.stringify(order, null, 2));
}

main();
