import { binance } from 'ccxt';
import { ExchangeX } from '..';

export
class BinanceMargin implements ExchangeX {
  public constructor(public readonly Exchange: binance) { }

  public MarketLongOpen(symbol: string, funds: number) {
    const amount = this.Exchange.costToPrecision(symbol, funds);
    return this.Exchange.createMarketBuyOrder(symbol, amount, {
      quoteOrderQty: amount,
      type: 'margin',
    });
  }

  public MarketLongClose(symbol: string, assets: number) {
    const amount = this.Exchange.amountToPrecision(symbol, assets);
    return this.Exchange.createMarketSellOrder(symbol, amount, {
      type: 'margin',
    });
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
