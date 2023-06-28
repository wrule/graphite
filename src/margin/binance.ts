import { binance } from 'ccxt';
import { Margin } from '.';

export
class MarginBinance implements Margin {
  public constructor(private readonly config: {
    symbol: string,
    exchange: binance,
  }) { }

  public MarketLongOpen(funds: number) {
    const amount = this.config.exchange.costToPrecision(this.config.symbol, funds);
    return this.config.exchange.createMarketBuyOrder(this.config.symbol, amount, {
      quoteOrderQty: amount,
      type: 'margin',
    });
  }

  public MarketLongClose(assets: number) {
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, assets);
    return this.config.exchange.createMarketSellOrder(this.config.symbol, amount, {
      type: 'margin',
    });
  }
}
