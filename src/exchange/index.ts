import { Exchange, Order } from 'ccxt';

export
interface OrderX extends Order {
  start_time: number;
  end_time: number;
  fee_list: { currency: string, cost: number }[];
}

export
interface ExchangeX {
  Exchange: Exchange,
  MarketLongOpen(symbol: string, funds: number): Promise<OrderX>;
  MarketLongClose(symbol: string, assets: number): Promise<OrderX>;
}
