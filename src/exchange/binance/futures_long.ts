import { binance } from 'ccxt';
import { FuturesExchange } from '../futures';

export
class BinanceFuturesLong extends FuturesExchange {
  public constructor(public readonly Exchange: binance) { super() }

  private async getLastAskPrice(symbol: string) {
    const book = await this.Exchange.fetchOrderBook(symbol, 10);
    return book.asks[0][0];
  }

  public async MarketOpen(symbol: string, funds: number) {
    const start_time = Number(new Date());
    const price = await this.getLastAskPrice(symbol);
    const amount = this.Exchange.amountToPrecision(symbol, funds / price);
    const order = await this.Exchange.createMarketBuyOrder(symbol, amount, {
      positionSide: 'LONG',
    });
    const end_time = Number(new Date());
    return {
      ...order,
      start_time, end_time, fee_list: order.trades.map((trade) => trade.fee),
    };
  }

  public async MarketClose(symbol: string, assets: number) {
    const start_time = Number(new Date());
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    const order = await this.Exchange.createMarketSellOrder(symbol, amount, {
      positionSide: 'LONG',
    });
    const end_time = Number(new Date());
    return {
      ...order,
      start_time, end_time, fee_list: order.trades.map((trade) => trade.fee),
    };
  }

  // public async MarketShortOpen(symbol: string, funds: number) {
  //   const price = await this.getLastAskPrice(symbol);
  //   const amount = this.Exchange.amountToPrecision(symbol, funds / price);
  //   return this.Exchange.createMarketSellOrder(symbol, amount, {
  //     positionSide: 'SHORT',
  //   });
  // }

  // public async MarketShortClose(symbol: string, assets: number) {
  //   const amount = this.Exchange.amountToPrecision(symbol, assets);
  //   return this.Exchange.createMarketBuyOrder(symbol, amount, {
  //     positionSide: 'SHORT',
  //   });
  // }
}

export
async function CreateBinanceFuturesLong(config: any) {
  const exchange = new BinanceFuturesLong(new binance({
    ...config,
    options: {
      defaultType: 'future',
      hedgeMode: true,
      ...config.options,
    },
  }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
