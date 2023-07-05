import { ExchangeX } from '.';

export
abstract class FuturesExchange extends ExchangeX {
  protected async getLastAskPrice(symbol: string) {
    const book = await this.Exchange.fetchOrderBook(symbol, 10);
    return book.asks[0][0];
  }
}
