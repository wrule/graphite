import { Wallet } from '.';
import { Binance } from '../exchange/binance';
import fs from 'fs';

export
class FullWallet
extends Wallet {
  public constructor(
    private exchange: Binance,
    params: { [name: string]: number } = { },
  ) {
    super(params);
  }

  public async OpenFull(symbol: string) {
    const market = this.exchange.Exchange.market(symbol);
    console.log(this.States());
    const order = await this.exchange.MarketLongOpen(symbol, this.Get(market.quote));
    this.Send(market.quote, order.cost);
    this.Receive(market.base, order.amount);
    order.trades.forEach((trade) => {
      this.Send(trade.fee.currency, trade.fee.cost);
    });
    console.log(this.States());
    fs.writeFileSync('output/output-buy.json', JSON.stringify(order, null, 2));
  }

  public async CloseFull(symbol: string) {
    const market = this.exchange.Exchange.market(symbol);
    console.log(this.States());
    const order = await this.exchange.MarketLongClose(symbol, this.Get(market.base));
    this.Send(market.base, order.amount);
    this.Receive(market.quote, order.cost);
    order.trades.forEach((trade) => {
      this.Send(trade.fee.currency, trade.fee.cost);
    });
    console.log(this.States());
    fs.writeFileSync('output/output-sell.json', JSON.stringify(order, null, 2));
  }
}
