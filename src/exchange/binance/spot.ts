import { binance } from 'ccxt';
import { Binance } from '.';

export
class BinanceSpot implements Binance {
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
