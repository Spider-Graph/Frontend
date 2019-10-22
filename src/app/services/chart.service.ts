import { Store } from 'undux';

export type ChartState = { chart?: string };

export class ChartService {
  private static store: Store<ChartState>;

  public static inject(store: Store<ChartState>) {
    this.store = store;
    this.effects();
    return store;
  }

  public static effects() {
    return this.store;
  }
}
