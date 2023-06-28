import { Order } from 'ccxt';

export
interface Binance {
  MarketLongOpen(funds: number): Promise<Order>;
  MarketLongClose(assets: number): Promise<Order>;
}
