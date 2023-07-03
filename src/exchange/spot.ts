import { Market } from 'ccxt';
import { CopyError } from '../utils';
import { OrderX, Trader } from '.';

export
abstract class SpotTrader extends Trader {
  public abstract MarketLongOpen(symbol: string, funds: number): Promise<OrderX>;
  public abstract MarketLongClose(symbol: string, assets: number): Promise<OrderX>;

  protected async fetchFreeBalanceByCurrency(currency: string) {
    try {
      const balance: any = await this.Exchange.fetchFreeBalance();
      return (balance[currency] ?? 0) as number;
    } catch (e) { throw CopyError(e); }
  }

  protected async syncBalance(symbol: string, amount: number, type: 'base' | 'quote') {
    const market: Market = this.Exchange.market(symbol);
    const balance = await this.fetchFreeBalanceByCurrency(market[type]);
    return amount > balance ? balance : amount;
  }

  protected fetchOrder(id: string, symbol?: string, params?: { }) {
    try {
      return this.Exchange.fetchOrder(id, symbol, params);
    } catch (e) { throw CopyError(e); }
  }
}
