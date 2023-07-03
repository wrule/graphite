import { okex5, ExchangeError } from 'ccxt';
import { OrderX } from '..';
import { SpotExchange } from '../spot';
import { CopyError } from '../../utils';

export
class OKXSpotExchange extends SpotExchange {
  public constructor(public readonly Exchange: okex5) { super() }

  protected async fetchFreeBalanceByCurrency(currency: string) {
    try {
      const balance: any = await this.Exchange.fetchFreeBalance({ ccy: currency });
      console.log(1234, balance);
      return (balance[currency] ?? 0) as number;
    } catch (e) { throw CopyError(e); }
  }

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
async function CreateOKXSpotExchange(config: any) {
  const exchange = new OKXSpotExchange(new okex5({ ...config }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
