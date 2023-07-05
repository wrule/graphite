import 'global-agent/bootstrap';
import { CreateOKXSpotExchange } from './exchange/okx/spot';
import { FullTrader } from './trader/full_trader';
import { CreateBinanceFuturesLong } from './exchange/binance/futures_long';

const secret = require('../.secret.json');

async function main() {
  const spot = await CreateBinanceFuturesLong(secret.exchange);
  const a = await spot.getLastBookTicker('ETH/USDT');
  console.log(a);
  // const spot = await CreateOKXSpotExchange(secret.exchange);
  // const wallet = new FullTrader(spot, { USDT: 20 });
  // await wallet.MarketOpenFull('ETH/USDT');
  // const order = await wallet.MarketCloseFull('ETH/USDT');
  // console.log(order.end_time - order.start_time);
}

main();
