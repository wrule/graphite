import { Order, okex5 } from 'ccxt';

export
interface OKX {
  Exchange: okex5,
  MarketLongOpen(symbol: string, funds: number): Promise<Order>;
  MarketLongClose(symbol: string, assets: number): Promise<Order>;
}

// export { BinanceSpot, CreateBinanceSpot } from './spot';
// export { BinanceMargin, CreateBinanceMargin } from './margin';
// export { BinanceFutures, CreateBinanceFutures } from './futures';
