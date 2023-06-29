import { Order, okex5 } from 'ccxt';

export
interface OrderX extends Order {
  fee_list: { currency: string, cost: number }[];
}

export
interface OKX {
  Exchange: okex5,
  MarketLongOpen(symbol: string, funds: number): Promise<OrderX>;
  MarketLongClose(symbol: string, assets: number): Promise<OrderX>;
}

// export { BinanceSpot, CreateBinanceSpot } from './spot';
// export { BinanceMargin, CreateBinanceMargin } from './margin';
// export { BinanceFutures, CreateBinanceFutures } from './futures';
