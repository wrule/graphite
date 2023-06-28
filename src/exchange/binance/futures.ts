import { binance } from 'ccxt';
import { Binance } from '.';

export
class BinanceFutures implements Binance {
  public constructor(public readonly Exchange: binance) { }

  private async getLastAskPrice(symbol: string) {
    const book = await this.Exchange.fetchOrderBook(symbol, 10);
    return book.asks[0][0];
  }

  public async MarketLongOpen(symbol: string, funds: number) {
    const price = await this.getLastAskPrice(symbol);
    const amount = this.Exchange.amountToPrecision(symbol, funds / price);
    return this.Exchange.createMarketBuyOrder(symbol, amount, {
      positionSide: 'LONG',
    });
  }

  public async MarketLongClose(symbol: string, assets: number) {
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    return this.Exchange.createMarketSellOrder(symbol, amount, {
      positionSide: 'LONG',
    });
  }

  public async MarketShortOpen(symbol: string, funds: number) {
    const price = await this.getLastAskPrice(symbol);
    const amount = this.Exchange.amountToPrecision(symbol, funds / price);
    return this.Exchange.createMarketSellOrder(symbol, amount, {
      positionSide: 'SHORT',
    });
  }

  public async MarketShortClose(symbol: string, assets: number) {
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    return this.Exchange.createMarketBuyOrder(symbol, amount, {
      positionSide: 'SHORT',
    });
  }
}
