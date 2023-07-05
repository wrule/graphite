import { binance } from 'ccxt';
import { OrderX } from '..';
import { Margin } from '../margin';

export
class BinanceMargin extends Margin {
  public constructor(public readonly Exchange: binance) { super() }

  public async MarketOpen(symbol: string, funds: number) {
    const start_time = Number(new Date());
    const amount = this.Exchange.costToPrecision(symbol, funds);
    const order = await this.Exchange.createMarketBuyOrder(symbol, amount, {
      quoteOrderQty: amount,
      type: 'margin',
    });
    const end_time = Number(new Date());
    return {
      ...order,
      start_time, end_time,
      fee_list: order.trades.map((trade) => trade.fee),
    } as OrderX;
  }

  public async MarketClose(symbol: string, assets: number) {
    const start_time = Number(new Date());
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    const order = await this.Exchange.createMarketSellOrder(symbol, amount, {
      type: 'margin',
    });
    const end_time = Number(new Date());
    return {
      ...order,
      start_time, end_time,
      fee_list: order.trades.map((trade) => trade.fee),
    } as OrderX;
  }
}

export
async function CreateBinanceMargin(config: any) {
  const exchange = new BinanceMargin(new binance({
    ...config,
    options: {
      defaultType: 'margin',
      ...config.options,
    },
  }));
  await exchange.Exchange.loadMarkets();
  return exchange;
}
