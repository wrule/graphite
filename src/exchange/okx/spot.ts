import { okex5 } from 'ccxt';
import { OKX } from '.';

export
class OKXSpot implements OKX {
  public constructor(public readonly Exchange: okex5) { }

  public async MarketLongOpen(symbol: string, funds: number) {
    const amount = this.Exchange.costToPrecision(symbol, funds);
    const order = await this.Exchange.createMarketBuyOrder(symbol, amount, {
      tgtCcy: 'quote_ccy',
    });
    const order_detail = await this.Exchange.fetchOrder(order.id, symbol);
    return order_detail;
  }

  public async MarketLongClose(symbol: string, assets: number) {
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    const order = await this.Exchange.createMarketSellOrder(symbol, amount);
    const order_detail = await this.Exchange.fetchOrder(order.id, symbol);
    return order_detail;
  }
}

export
async function CreateOKXSpot(config: any) {
  const exchange = new OKXSpot(new okex5({ ...config }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
