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
  await trader.MarketOpenFull('ETH/USDT');
  const order = await trader.MarketCloseFull('ETH/USDT');
  console.log(order.end_time - order.start_time);
}

main();
