import { okex5, ExchangeError } from 'ccxt';
import { OrderX } from '..';
import { SpotTrader } from '../spot';

export
class OKXSpotTrader extends SpotTrader {
  public constructor(public readonly Exchange: okex5) { super() }

  public async MarketOpen(
    symbol: string,
    funds: number,
    sync = false,
    start_time = Number(new Date()),
  ): Promise<OrderX> {
    try {
      let amount = sync ? await this.syncBalance(symbol, funds, 'quote') : funds;
      amount = this.Exchange.costToPrecision(symbol, amount);
      const order = await this.Exchange.createMarketBuyOrder(symbol, amount, {
        tgtCcy: 'quote_ccy',
      });
      const end_time = Number(new Date());
      const order_detail = await this.fetchOrder(order.id, symbol);
      return {
        ...order_detail,
        start_time, end_time, fee_list: (order_detail as any).fees || [],
      };
    } catch (e) {
      if (!sync && e instanceof ExchangeError) {
        const [order] = await Promise.all([
          this.MarketOpen(symbol, funds, true, start_time),
          // 发送异常消息
        ]);
        return order;
      }
      throw e;
    }
  }

  public async MarketClose(
    symbol: string,
    assets: number,
    sync = false,
    start_time = Number(new Date()),
  ): Promise<OrderX> {
    try {
      let amount = sync ? await this.syncBalance(symbol, assets, 'base') : assets;
      amount = this.Exchange.amountToPrecision(symbol, amount);
      const order = await this.Exchange.createMarketSellOrder(symbol, amount);
      const end_time = Number(new Date());
      const order_detail = await this.fetchOrder(order.id, symbol);
      return {
        ...order_detail,
        start_time, end_time, fee_list: (order_detail as any).fees || [],
      };
    } catch (e) {
      if (!sync && e instanceof ExchangeError) {
        const [order] = await Promise.all([
          this.MarketClose(symbol, assets, true, start_time),
          // 发送异常消息
        ]);
        return order;
      }
      throw e;
    }
  }
}

export
async function CreateOKXSpot(config: any) {
  const exchange = new OKXSpotTrader(new okex5({ ...config }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
