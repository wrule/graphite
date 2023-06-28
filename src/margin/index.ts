
export
interface Margin {
  MarketLongOpen(funds: number): Promise<any>;
  MarketLongClose(assets: number): Promise<any>;
}
