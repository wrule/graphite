import { binance } from 'ccxt';
import { OKX } from '.';

export
class OKXSpot implements OKX {
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
async function CreateOKXSpot(config: any) {
  const exchange = new OKXSpot(new binance({ ...config }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
