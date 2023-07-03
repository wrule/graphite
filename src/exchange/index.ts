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
}
