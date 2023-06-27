import { binance } from 'ccxt';
import { Spot } from '.';

export
class SpotBinance implements Spot {
  public constructor(
    private readonly symbol: string,
    private readonly exchange: binance,
  ) { }

  public async Buy(funds: number) {
    return this.exchange.createMarketBuyOrder(this.symbol, funds, { });
  }

  public async Sell(assets: number) {
    return this.exchange.createMarketSellOrder(this.symbol, assets, { });
  }
}
