import fs from 'fs';
import { okex5 } from 'ccxt';
import { CreateOKXSpotExchange } from './exchange/okx/spot';
import { FullWallet } from './wallet/full_wallet';

const secret = require('../.secret.okx.json');

async function main() {
  const spot = await CreateOKXSpotExchange(secret.exchange);
  const wallet = new FullWallet(spot, { USDT: 20 });
  await wallet.MarketOpenFull('ETH/USDT');
  const order = await wallet.MarketCloseFull('ETH/USDT');
  console.log(order.end_time - order.start_time);
}

main();
