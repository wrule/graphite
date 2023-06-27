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

  public async MarketLongBuy(assets: number) {
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, assets);
    return this.config.exchange.createMarketBuyOrder(this.config.symbol, amount, {
      positionSide: 'LONG',
    });
  }

  public async MarketLongSell(assets: number) {
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, assets);
    return this.config.exchange.createMarketSellOrder(this.config.symbol, amount, {
      positionSide: 'LONG',
    });
  }

  public async MarketShortBuy(funds: number) {

  }

  public async MarketShortSell(assets: number) {
    const amount = this.config.exchange.amountToPrecision(this.config.symbol, assets);
    return this.config.exchange.createMarketSellOrder(this.config.symbol, amount, {
      positionSide: 'SHORT',
    });
  }
}
