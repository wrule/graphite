import { binance } from 'ccxt';
import { FuturesExchange } from '../futures';

export
class BinanceFuturesShort extends FuturesExchange {
  public constructor(public readonly Exchange: binance) { super() }

  public async MarketOpen(symbol: string, funds: number) {
    const start_time = Number(new Date());
    const price = await this.getLastAskPrice(symbol);
    const amount = this.Exchange.amountToPrecision(symbol, funds / price);
    const order = await this.Exchange.createMarketSellOrder(symbol, amount, {
      positionSide: 'SHORT',
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
    const order = await this.Exchange.createMarketBuyOrder(symbol, amount, {
      positionSide: 'SHORT',
    });
    const end_time = Number(new Date());
    return {
      ...order,
      start_time, end_time, fee_list: order.trades.map((trade) => trade.fee),
    };
  }
}

export
async function CreateBinanceFuturesShort(config: any) {
  const exchange = new BinanceFuturesShort(new binance({
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
