import 'global-agent/bootstrap';
import fs from 'fs';
import ccxt from 'ccxt';
import { Binance, BinanceSpot } from './exchange/binance';

const secret = require('../.secret.json');

async function main() {
  const exchange = new ccxt.binance({
    ...secret.exchange,
    // options: {
    //   defaultType: 'margin',
    //   // hedgeMode: true,
    // },
  });
  const markets = await exchange.loadMarkets();
  Object.keys(markets)
    .filter((key) => key.includes('ETH'))
    .filter((key) => key.includes(':'))
    .forEach((key) => console.log(key));

  const ex: Binance = new BinanceSpot({ symbol: 'ETH/USDT', exchange });
  const order = await ex.MarketLongOpen(20);
  fs.writeFileSync('output/output.json', JSON.stringify(order, null, 2));
}

main();
