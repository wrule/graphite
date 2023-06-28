import 'global-agent/bootstrap';
import fs from 'fs';
import ccxt from 'ccxt';
import { Binance, BinanceFutures, BinanceMargin, BinanceSpot } from './exchange/binance';

const secret = require('../.secret.json');

async function main() {
  const ex: Binance = await new BinanceFutures('ETH/USDT', secret.exchange).Init();
  const order = await ex.MarketLongClose(0.010);
  fs.writeFileSync('output/output.json', JSON.stringify(order, null, 2));
}

main();
