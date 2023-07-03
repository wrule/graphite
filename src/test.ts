import fs from 'fs';
import { okex5 } from 'ccxt';
import { CreateOKXSpot } from './exchange/okx/spot';
import { FullWallet } from './wallet/full_wallet';

const secret = require('../.secret.okx.json');

async function main() {
  const spot = await CreateOKXSpot(secret.exchange);
  const a = await spot.fetchFreeBalanceByCurrency('ETH');
  console.log(a);
  // const wallet = new FullWallet(spot, { USDT: 20 });
  // await wallet.OpenFull('ETH/USDT');
  // const order = await wallet.CloseFull('ETH/USDT');
  // console.log(order.end_time - order.start_time);
}

main();
