
export class ValueProvider<T> {

  constructor(private readonly provider: () => Promise<T>){}

  provide(): Promise<T> {
    return this.provider();
  }

}