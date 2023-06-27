
export
interface Contract {
  MarketLongBuy(funds: number): Promise<any>;
  MarketLongSell(assets: number): Promise<any>;
  MarketShortBuy(funds: number): Promise<any>;
  MarketShortSell(assets: number): Promise<any>;
}
