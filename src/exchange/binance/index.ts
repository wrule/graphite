import { Order, binance } from 'ccxt';

export
interface Binance {
  Exchange: binance,
  MarketLongOpen(symbol: string, funds: number): Promise<Order>;
  MarketLongClose(symbol: string, assets: number): Promise<Order>;
}

export { BinanceSpot } from './spot';
export { BinanceMargin } from './margin';
export { BinanceFutures } from './futures';
