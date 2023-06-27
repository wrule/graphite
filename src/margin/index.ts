
export
interface Margin {
  MarketOpen(funds: number): Promise<any>;
  MarketClose(assets: number): Promise<any>;
}
