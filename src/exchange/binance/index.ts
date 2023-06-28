import { Order, binance } from 'ccxt';

export
interface Binance {
  Exchange: binance,
  Init(): Promise<Binance>;
  MarketLongOpen(funds: number): Promise<Order>;
  MarketLongClose(assets: number): Promise<Order>;
}

export { BinanceSpot } from './spot';
export { BinanceMargin } from './margin';
export { BinanceFutures } from './futures';
