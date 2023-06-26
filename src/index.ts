import 'global-agent/bootstrap';
import ccxt from 'ccxt';

const secret = require('../.secret.json');

async function main() {
  console.log('你好，世界');
  const exchange = new ccxt.binance(secret.exchange);
  const rsp = await exchange.fetchBalance();
  console.log(rsp);
}

main();
