import { Wallet } from '.';
import { Binance } from '../exchange/binance';
import fs from 'fs';
import { OKX } from '../exchange/okx';

export
class FullWallet
extends Wallet {
  public constructor(
    private exchange: OKX,
    params: { [name: string]: number } = { },
  ) {
    super(params);
  }

  public async OpenFull(symbol: string) {
    console.log(this.States());
    const market = this.exchange.Exchange.market(symbol);
    const order = await this.exchange.MarketLongOpen(symbol, this.Get(market.quote));
    this.Send(market.quote, order.cost);
    this.Receive(market.base, order.amount);
    order.fee_list.forEach((fee) => this.Send(fee.currency, fee.cost));
    console.log(this.States());
    return order;
  }

  public async CloseFull(symbol: string) {
    console.log(this.States());
    const market = this.exchange.Exchange.market(symbol);
    const order = await this.exchange.MarketLongClose(symbol, this.Get(market.base));
    this.Send(market.base, order.amount);
    this.Receive(market.quote, order.cost);
    order.fee_list.forEach((fee) => this.Send(fee.currency, fee.cost));
    console.log(this.States());
    return order;
  }
}
