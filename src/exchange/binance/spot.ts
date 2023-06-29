import { binance } from 'ccxt';
import { ExchangeX, OrderX } from '..';

export
class BinanceSpot implements ExchangeX {
  public constructor(public readonly Exchange: binance) { }

  public async MarketLongOpen(symbol: string, funds: number) {
    const amount = this.Exchange.costToPrecision(symbol, funds);
    const start_time = Number(new Date());
    const order = await this.Exchange.createMarketBuyOrder(symbol, amount, {
      quoteOrderQty: amount,
    });
    const end_time = Number(new Date());
    return {
      ...order,
      start_time, end_time,
      fee_list: order.trades.map((trade) => trade.fee),
    } as OrderX;
  }

  public async MarketLongClose(symbol: string, assets: number) {
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    const start_time = Number(new Date());
    const order = await this.Exchange.createMarketSellOrder(symbol, amount);
    const end_time = Number(new Date());
    return {
      ...order,
      start_time, end_time,
      fee_list: order.trades.map((trade) => trade.fee),
    } as OrderX;
  }
}

export
async function CreateBinanceSpot(config: any) {
  const exchange = new BinanceSpot(new binance({ ...config }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
