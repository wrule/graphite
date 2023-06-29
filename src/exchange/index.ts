import { Order } from 'ccxt';

export
interface OrderX extends Order {
  start_time: number;
  end_time: number;
  fee_list: { currency: string, cost: number }[];
}
