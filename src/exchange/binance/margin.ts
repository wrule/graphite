import { binance } from 'ccxt';
import { Binance } from '.';

export
class BinanceMargin implements Binance {
  public constructor(private readonly symbol: string, config: any) {
    this.exchange = new binance({
      ...config,
      options: {
        defaultType: 'margin',
        ...config.options,
      },
    });
  }

  private exchange: binance;

  public MarketLongOpen(funds: number) {
    const amount = this.exchange.costToPrecision(this.symbol, funds);
    return this.exchange.createMarketBuyOrder(this.symbol, amount, {
      quoteOrderQty: amount,
      type: 'margin',
    });
  }

  public MarketLongClose(assets: number) {
    const amount = this.exchange.amountToPrecision(this.symbol, assets);
    return this.exchange.createMarketSellOrder(this.symbol, amount, {
      type: 'margin',
    });
  }
}
