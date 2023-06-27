
export
interface Contract {
  MarketLongOpen(funds: number): Promise<any>;
  MarketLongClose(assets: number): Promise<any>;
  MarketShortOpen(funds: number): Promise<any>;
  MarketShortClose(assets: number): Promise<any>;
}
