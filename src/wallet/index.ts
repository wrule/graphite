
export
class Wallet {
  public constructor(params: { [name: string]: number } = { }) {
    this.wallet = new Map<string, number>(Object.entries(params));
  }

  private wallet: Map<string, number>;

  public Get(name: string) {
    return this.wallet.get(name) ?? 0;
  }

  public Set(name: string, amount: number) {
    return this.wallet.set(name, amount);
  }

  public In(name: string, amount: number) {
    this.Set(name, this.Get(name) + amount);
  }

  public Out(name: string, amount: number) {
    this.Set(name, this.Get(name) - amount);
  }

  public States() {
    return Object.fromEntries(this.wallet.entries());
  }
}
