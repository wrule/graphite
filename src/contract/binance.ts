import { binance } from 'ccxt';
import { Contract } from '.';

export
class ContractBinance implements Contract {
  public constructor(
    private readonly config: {
      symbol: string,
      exchange: binance,
    },
  ) { }

  private async getLastAskPrice() {
    const book = await this.config.exchange.fetchOrderBook(this.config.symbol, 10);
    return book.asks[0][0];
  }

  public async MarketLongOpen(funds: number) {
    const price = await this.getLastAskPrice();
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, funds / price);
    return this.config.exchange.createMarketBuyOrder(this.config.symbol, amount, {
      positionSide: 'LONG',
    });
  }

  public async MarketLongClose(assets: number) {
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, assets);
    return this.config.exchange.createMarketSellOrder(this.config.symbol, amount, {
      positionSide: 'LONG',
    });
  }

  public async MarketShortOpen(funds: number) {
    const price = await this.getLastAskPrice();
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, funds / price);
    return this.config.exchange.createMarketSellOrder(this.config.symbol, amount, {
      positionSide: 'SHORT',
    });
  }

  public async MarketShortClose(assets: number) {
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, assets);
    return this.config.exchange.createMarketBuyOrder(this.config.symbol, amount, {
      positionSide: 'SHORT',
    });
  }
}
