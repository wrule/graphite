import 'global-agent/bootstrap';
import fs from 'fs';
import ccxt from 'ccxt';
import { Wallet } from './wallet';
import { SpotBinance } from './spot/binance';

const secret = require('../.secret.json');

async function main() {

  const wallet = new Wallet({ 'USDT': 100 });
  wallet.In('USDT', 100);
  wallet.Out('USDT', 30);
  wallet.Out('ETH', 1);
  console.log(wallet.Get('USDT'));
  console.log(wallet.States());

  // return;
  console.log('你好，世界');
  console.log(secret.exchange);
  const exchange = new ccxt.binance({
    ...secret.exchange,
    // options: {
    //   defaultType: 'future',
    //   hedgeMode: true,
    // },
  });
  // const rsp = await exchange.fetchBalance();
  // console.log(rsp);
  const markets = await exchange.loadMarkets();
  Object.keys(markets)
    .filter((key) => key.includes('ETH'))
    .filter((key) => key.includes(':'))
    .forEach((key) => console.log(key));

  const spot = new SpotBinance({ symbol: 'ETH/USDT', exchange });
  // const order = await spot.MarketSell(0.0058);
  fs.writeFileSync('output/output.json', JSON.stringify(order, null, 2));
  // const rsp = await exchange.fetchTrades('ETH/USDT:USDT', undefined, 3);
  // fs.writeFileSync('output-2.json', JSON.stringify(rsp, null, 2));
}

main();
