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

  public async MarketLongBuy(funds: number) {

  }

  public async MarketLongSell(funds: number) {

  }

  public async MarketShortBuy(funds: number) {

  }

  public async MarketShortSell(funds: number) {

  }
}
