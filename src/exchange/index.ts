import { Exchange, Market, Order } from 'ccxt';
import { CopyError } from '../utils';

export
interface OrderX extends Order {
  start_time: number;
  end_time: number;
  fee_list: { currency: string, cost: number }[];
}

export
abstract class Trader {
  public abstract Exchange: Exchange;
  public abstract MarketOpen(symbol: string, funds: number): Promise<OrderX>;
  public abstract MarketClose(symbol: string, assets: number): Promise<OrderX>;
}
