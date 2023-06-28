import 'global-agent/bootstrap';
import fs from 'fs';
import ccxt from 'ccxt';
import { CreateBinanceFutures } from './exchange/binance';

const secret = require('../.secret.json');

async function main() {
  const ex = await CreateBinanceFutures(secret.exchange);
  const order = await ex.MarketShortClose('ETH/USDT', 0.01);
  fs.writeFileSync('output/output.json', JSON.stringify(order, null, 2));
}

main();
