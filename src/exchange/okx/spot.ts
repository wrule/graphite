import fs from 'fs';
import { Order, okex5 } from 'ccxt';
import { OKX } from '.';
import { OrderX } from '..';

export
class OKXSpot implements OKX {
  public constructor(public readonly Exchange: okex5) { }

  public async MarketLongOpen(symbol: string, funds: number) {
    const amount = this.Exchange.costToPrecision(symbol, funds);
    const start_time = Number(new Date());
    const order = await this.Exchange.createMarketBuyOrder(symbol, amount, {
      tgtCcy: 'quote_ccy',
    });
    const end_time = Number(new Date());
    const order_detail = await this.Exchange.fetchOrder(order.id, symbol);
    return {
      ...order_detail,
      start_time, end_time,
      fee_list: (order_detail as any).fees || [],
    } as OrderX;
  }

  public async MarketLongClose(symbol: string, assets: number) {
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    const start_time = Number(new Date());
    const order = await this.Exchange.createMarketSellOrder(symbol, amount);
    const end_time = Number(new Date());
    let order_detail: Order;
    try {
      order_detail = await this.Exchange.fetchOrder(order.id, symbol);
    } catch (e) {
      throw '';
    }
    return {
      ...order_detail,
      start_time, end_time,
      fee_list: (order_detail as any).fees || [],
    } as OrderX;
  }
}

export
async function CreateOKXSpot(config: any) {
  const exchange = new OKXSpot(new okex5({ ...config }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
