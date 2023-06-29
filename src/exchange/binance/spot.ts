import { binance } from 'ccxt';
import { ExchangeX } from '..';

export
class BinanceSpot implements ExchangeX {
  public constructor(public readonly Exchange: binance) { }

  public MarketLongOpen(symbol: string, funds: number) {
    const amount = this.Exchange.costToPrecision(symbol, funds);
    return this.Exchange.createMarketBuyOrder(symbol, amount, {
      quoteOrderQty: amount,
    });
  }

  public MarketLongClose(symbol: string, assets: number) {
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    return this.Exchange.createMarketSellOrder(symbol, amount);
  }
}

export
async function CreateBinanceSpot(config: any) {
  const exchange = new BinanceSpot(new binance({ ...config }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
