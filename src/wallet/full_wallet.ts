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

  public async BuyFull(symbol: string) {
    const market = this.exchange.Exchange.market(symbol);
    console.log(this.States);
    const order = await this.exchange.MarketLongOpen(symbol, this.Get(market.quote));
    this.Out(market.quote, order.cost);
    this.In(market.base, order.amount);
    order.trades.forEach((trade) => {
      this.Out(trade.fee.currency, trade.fee.cost);
    });
    console.log(this.States);
    fs.writeFileSync('output/output-buy.json', JSON.stringify(order, null, 2));
  }

  public async SellFull(symbol: string) {
    const market = this.exchange.Exchange.market(symbol);
    console.log(this.States);
    const order = await this.exchange.MarketLongClose(symbol, this.Get(market.base));
    this.Out(market.base, order.amount);
    this.In(market.quote, order.cost);
    order.trades.forEach((trade) => {
      this.Out(trade.fee.currency, trade.fee.cost);
    });
    console.log(this.States);
    fs.writeFileSync('output/output-sell.json', JSON.stringify(order, null, 2));
  }
}
