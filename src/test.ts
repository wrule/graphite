import { okex5 } from 'ccxt';

const secret = require('../.secret.okx.json');

async function main() {
  const a = new okex5(secret.exchange);
  await a.loadMarkets();
  const result = await a.fetchBalance();
  console.log(result);
}

main();
