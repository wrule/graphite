import { binance } from 'ccxt';
import { Spot } from '.';

export
class SpotBinance implements Spot {
  public constructor(
    private readonly symbol: string,
    private readonly exchange: binance,
  ) { }

  public async Buy(funds: number) {
    const a = this.exchange.costToPrecision(this.symbol, funds);
    return this.exchange.createMarketBuyOrder(this.symbol, a, { quoteOrderQty: a });
  }

  public async Sell(assets: number) {
    const b = this.exchange.amountToPrecision(this.symbol, assets);
    return this.exchange.createMarketSellOrder(this.symbol, b);
  }
}
