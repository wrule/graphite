import fs from 'fs';
import { okex5 } from 'ccxt';
import { CreateOKXSpot } from './exchange/okx/spot';

const secret = require('../.secret.okx.json');

async function main() {
  const spot = await CreateOKXSpot(secret.exchange);
  const b = await spot.Exchange.fetchBalance();
  console.log(b);
  await spot.MarketLongClose('ETH/USDT', 0.010862127);
}

main();
