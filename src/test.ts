import fs from 'fs';
import { okex5 } from 'ccxt';
import { CreateOKXSpot } from './exchange/okx/spot';
import { FullWallet } from './wallet/full_wallet';

const secret = require('../.secret.okx.json');

async function main() {
  const spot = await CreateOKXSpot(secret.exchange);
  const wallet = new FullWallet(spot, { USDT: 20 });
  await wallet.OpenFull('ETH/USDT');
  await wallet.CloseFull('ETH/USDT');
}

main();
