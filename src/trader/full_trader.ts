import { Trader } from '.';
import { ExchangeX } from '../exchange';

export
class FullTrader
extends Trader {
  public constructor(
    private exchange: ExchangeX,
    params: { [name: string]: number } = { },
  ) {
    super(params);
  }

  public async MarketOpenFull(symbol: string) {
    console.log(this.States());
    const market = this.exchange.Exchange.market(symbol);
    const order = await this.exchange.MarketOpen(symbol, this.Get(market.quote));
    this.Send(market.quote, order.cost);
    this.Receive(market.base, order.amount);
    order.fee_list.forEach((fee) => this.Send(fee.currency, fee.cost));
    console.log(this.States());
    return order;
  }

  public async MarketCloseFull(symbol: string) {
    console.log(this.States());
    const market = this.exchange.Exchange.market(symbol);
    const order = await this.exchange.MarketClose(symbol, this.Get(market.base));
    this.Send(market.base, order.amount);
    this.Receive(market.quote, order.cost);
    order.fee_list.forEach((fee) => this.Send(fee.currency, fee.cost));
    console.log(this.States());
    return order;
  }
}