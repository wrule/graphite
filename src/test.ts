import fs from 'fs';
import { okex5 } from 'ccxt';
import { CreateOKXSpot } from './exchange/okx/spot';

const secret = require('../.secret.okx.json');

async function main() {
  const spot = await CreateOKXSpot(secret.exchange);
  const b = await spot.Exchange.fetchBalance();
  console.log(b);
  const order = await spot.MarketLongOpen('ETH/USDT', 20);
  fs.writeFileSync('output/output-okx-buy.json', JSON.stringify(order, null, 2));
}

main();
