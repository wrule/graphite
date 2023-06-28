import 'global-agent/bootstrap';
import fs from 'fs';
import ccxt from 'ccxt';
import { CreateBinanceFutures, CreateBinanceMargin } from './exchange/binance';
import { FullWallet } from './wallet/full_wallet';

const secret = require('../.secret.json');

async function main() {
  const exchange = await CreateBinanceMargin(secret.exchange);
  const wallet = new FullWallet(exchange, { USDT: 20 });
  await wallet.OpenFull('ETH/USDT');
  await wallet.CloseFull('ETH/USDT');
  // const order = await ex.MarketShortClose('ETH/USDT', 0.01);
  // fs.writeFileSync('output/output.json', JSON.stringify(order, null, 2));
}

main();
