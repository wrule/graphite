import 'global-agent/bootstrap';
import { CreateOKXSpotExchange } from './exchange/okx/spot';
import { FullTrader } from './trader/full_trader';
import { CreateBinanceFuturesLong } from './exchange/binance/futures_long';
import fs from 'fs';

const secret = require('../.secret.json');

async function main() {
  const spot = await CreateBinanceFuturesLong(secret.exchange);
  
  // const a = await spot.Exchange.market('ETH/USDT');
  // fs.writeFileSync('output/a.json', JSON.stringify(a, null, 2));

  // const spot = await CreateOKXSpotExchange(secret.exchange);
  const trader = new FullTrader(spot, { USDT: 20 });
  const open_order = await trader.MarketOpenFull('ETH/USDT');
  fs.writeFileSync('output/fbuy.json', JSON.stringify(open_order, null, 2));
  const close_order = await trader.MarketCloseFull('ETH/USDT');
  fs.writeFileSync('output/fsell.json', JSON.stringify(close_order, null, 2));
}

main();
