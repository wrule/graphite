
export
class Trader {
  public constructor(params: { [name: string]: number } = { }) {
    this.wallet = new Map<string, number>(Object.entries(params));
  }

  private wallet: Map<string, number>;

  public Get(name: string) {
    return this.wallet.get(name) ?? 0;
  }

  public Send(name: string, amount: number) {
    this.wallet.set(name, this.Get(name) - amount);
  }

  public Receive(name: string, amount: number) {
    this.wallet.set(name, this.Get(name) + amount);
  }

  public States() {
    return Object.fromEntries(this.wallet.entries());
  }
}
