
export
interface Spot {
  MarketLongOpen(funds: number): Promise<any>;
  MarketLongClose(assets: number): Promise<any>;
}
