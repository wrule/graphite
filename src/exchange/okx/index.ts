import { Order, binance } from 'ccxt';

export
interface OKX {
  Exchange: binance,
  MarketLongOpen(symbol: string, funds: number): Promise<Order>;
  MarketLongClose(symbol: string, assets: number): Promise<Order>;
}

// export { BinanceSpot, CreateBinanceSpot } from './spot';
// export { BinanceMargin, CreateBinanceMargin } from './margin';
// export { BinanceFutures, CreateBinanceFutures } from './futures';
