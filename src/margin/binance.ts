import { binance } from 'ccxt';
import { Margin } from '.';

export
class MarginBinance implements Margin {
  public constructor(
    private readonly config: {
      symbol: string,
      exchange: binance,
    },
  ) { }

  public async MarketOpen(funds: number) {
    const amount = this.config.exchange.costToPrecision(this.config.symbol, funds);
    return this.config.exchange.createMarketBuyOrder(this.config.symbol, amount, { quoteOrderQty: amount });
  }

  public async MarketClose(assets: number) {
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, assets);
    return this.config.exchange.createMarketSellOrder(this.config.symbol, amount);
  }
}
