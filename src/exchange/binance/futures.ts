import { binance } from 'ccxt';
import { Binance } from '.';

export
class BinanceFutures implements Binance {
  public constructor(private readonly symbol: string, config: any) {
    this.exchange = new binance({
      ...config,
      options: {
        defaultType: 'future',
        hedgeMode: true,
        ...config.options,
      },
    });
  }

  private exchange: binance;

  public get Exchange() {
    return this.exchange;
  }

  public async Init() {
    await this.exchange.loadMarkets();
    return this;
  }

  private async getLastAskPrice() {
    const book = await this.exchange.fetchOrderBook(this.symbol, 10);
    return book.asks[0][0];
  }

  public async MarketLongOpen(funds: number) {
    const price = await this.getLastAskPrice();
    const amount = this.exchange.amountToPrecision(this.symbol, funds / price);
    return this.exchange.createMarketBuyOrder(this.symbol, amount, {
      positionSide: 'LONG',
    });
  }

  public async MarketLongClose(assets: number) {
    const amount = this.exchange.amountToPrecision(this.symbol, assets);
    return this.exchange.createMarketSellOrder(this.symbol, amount, {
      positionSide: 'LONG',
    });
  }

  public async MarketShortOpen(funds: number) {
    const price = await this.getLastAskPrice();
    const amount = this.exchange.amountToPrecision(this.symbol, funds / price);
    return this.exchange.createMarketSellOrder(this.symbol, amount, {
      positionSide: 'SHORT',
    });
  }

  public async MarketShortClose(assets: number) {
    const amount = this.exchange.amountToPrecision(this.symbol, assets);
    return this.exchange.createMarketBuyOrder(this.symbol, amount, {
      positionSide: 'SHORT',
    });
  }
}
