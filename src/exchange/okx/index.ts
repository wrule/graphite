import { okex5 } from 'ccxt';
import { OrderX } from '..';

export
interface OKX {
  Exchange: okex5,
  MarketLongOpen(symbol: string, funds: number): Promise<OrderX>;
  MarketLongClose(symbol: string, assets: number): Promise<OrderX>;
}

// export { BinanceSpot, CreateBinanceSpot } from './spot';
// export { BinanceMargin, CreateBinanceMargin } from './margin';
// export { BinanceFutures, CreateBinanceFutures } from './futures';
