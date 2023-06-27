import 'global-agent/bootstrap';
import fs from 'fs';
import ccxt from 'ccxt';
import { Wallet } from './wallet';
import { SpotBinance } from './spot/binance';
import { ContractBinance } from './contract/binance';

const secret = require('../.secret.json');

async function main() {
  const exchange = new ccxt.binance({
    ...secret.exchange,
    options: {
      defaultType: 'future',
      hedgeMode: true,
    },
  });
  const markets = await exchange.loadMarkets();
  // Object.keys(markets)
  //   .filter((key) => key.includes('ETH'))
  //   .filter((key) => key.includes(':'))
  //   .forEach((key) => console.log(key));

  const contract = new ContractBinance({ symbol: 'ETH/USDT:USDT', exchange });
  const order = await contract.MarketShortBuy(10);
  fs.writeFileSync('output/output.json', JSON.stringify(order, null, 2));
}

main();
