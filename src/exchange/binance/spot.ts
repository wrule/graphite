import { binance } from 'ccxt';
import { Binance } from '.';

export
class BinanceSpot implements Binance {
  public constructor(private readonly config: {
    symbol: string,
    exchange: binance,
  }) { }

  public MarketLongOpen(funds: number) {
    const amount = this.config.exchange.costToPrecision(this.config.symbol, funds);
    return this.config.exchange.createMarketBuyOrder(this.config.symbol, amount, {
      quoteOrderQty: amount,
    });
  }

  public MarketLongClose(assets: number) {
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, assets);
    return this.config.exchange.createMarketSellOrder(this.config.symbol, amount);
  }
}
