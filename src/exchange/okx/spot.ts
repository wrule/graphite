import fs from 'fs';
import { okex5 } from 'ccxt';
import { OKX, OrderX } from '.';

export
class OKXSpot implements OKX {
  public constructor(public readonly Exchange: okex5) { }

  public async MarketLongOpen(symbol: string, funds: number) {
    const amount = this.Exchange.costToPrecision(symbol, funds);
    const order = await this.Exchange.createMarketBuyOrder(symbol, amount, {
      tgtCcy: 'quote_ccy',
    });
    fs.writeFileSync('output/output-okx-buy.json', JSON.stringify(order, null, 2));
    const order_detail = await this.Exchange.fetchOrder(order.id, symbol);
    fs.writeFileSync('output/output-okx-buy-detail.json', JSON.stringify(order_detail, null, 2));
    return {
      ...order_detail,
      fee_list: (order_detail as any).fees || [],
    } as OrderX;
  }

  public async MarketLongClose(symbol: string, assets: number) {
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    const order = await this.Exchange.createMarketSellOrder(symbol, amount);
    fs.writeFileSync('output/output-okx-sell.json', JSON.stringify(order, null, 2));
    const order_detail = await this.Exchange.fetchOrder(order.id, symbol);
    fs.writeFileSync('output/output-okx-sell-detail.json', JSON.stringify(order_detail, null, 2));
    return {
      ...order_detail,
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
