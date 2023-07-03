import { Exchange, Order, okex5, ExchangeError, Market } from 'ccxt';
import { OKX } from '.';
import { OrderX } from '..';
import { CopyError } from '../../utils';

export
class OKXSpot implements OKX {
  public constructor(public readonly Exchange: okex5) { }

  public async MarketLongOpen(
    symbol: string,
    funds: number,
    sync = false,
    start_time = Number(new Date())): Promise<OrderX> {
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
      if (!sync && e instanceof ExchangeError)
        return await this.MarketLongOpen(symbol, funds, true, start_time);
      throw e;
    }
  }

  private fetchOrder(id: string, symbol?: string | undefined, params?: { } | undefined) {
    try {
      return this.Exchange.fetchOrder(id, symbol, params);
    } catch (e) { throw CopyError(e); }
  }

  public async fetchFreeBalanceByCurrency(currency: string) {
    try {
      const balance: any = await this.Exchange.fetchFreeBalance({ ccy: currency });
      return (balance[currency] ?? 0) as number;
    } catch (e) { throw CopyError(e); }
  }

  private async syncBalance(symbol: string, amount: number, type: 'base' | 'quote') {
    const market: Market = this.Exchange.market(symbol);
    const balance = await this.fetchFreeBalanceByCurrency(market[type]);
    return amount > balance ? balance : amount;
  }

  public async MarketLongClose(symbol: string, assets: number, sync = false): Promise<OrderX> {
    try {
      const start_time = Number(new Date());
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
      if (!sync && e instanceof ExchangeError)
        return await this.MarketLongClose(symbol, assets, true);
      throw e;
    }
  }
}

export
async function CreateOKXSpot(config: any) {
  const exchange = new OKXSpot(new okex5({ ...config }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
