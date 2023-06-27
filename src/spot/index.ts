import { Order } from 'ccxt';

export
interface Spot {
  Buy(funds: number): Promise<Order>;
  Sell(assets: number): Promise<Order>;
}
