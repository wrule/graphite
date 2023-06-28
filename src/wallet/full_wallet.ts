import { Wallet } from '.';
import { Binance } from '../exchange/binance';

export
class FullWallet
extends Wallet {
  public constructor(
    private exchange: Binance,
    params: { [name: string]: number } = { },
  ) {
    super(params);
  }

  public BuyFull(symbol: string) {
    console.log(this.exchange.Exchange.markets[symbol]);
  }

  public SellFull(symbol: string) {

  }
}
