
export
class Wallet {
  private wallet = new Map<string, number>();

  public Get(name: string) {
    return this.wallet.get(name) || 0;
  }

  public Set(name: string, amount: number) {
    return this.wallet.set(name, amount);
  }

  public In(name: string, amount: number) {

  }

  public Out(name: string, amount: number) {
    
  }
}
