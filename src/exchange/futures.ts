import { ExchangeX } from '.';
import { CopyError } from '../utils';

export
abstract class FuturesExchange extends ExchangeX {
  protected fetchOrder(id: string, symbol?: string, params?: { }) {
    try {
      return this.Exchange.fetchOrder(id, symbol, params);
    } catch (e) { throw CopyError(e); }
  }
}
