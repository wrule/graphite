import { Order } from 'ccxt';

export
interface Spot {
  MarketBuy(funds: number): Promise<Order>;
  MarketSell(assets: number): Promise<Order>;
}
