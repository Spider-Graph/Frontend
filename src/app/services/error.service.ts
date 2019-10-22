import { Store } from 'undux';

export type ErrorState = { error?: string };

export class ErrorService {
  private static store: Store<ErrorState>;

  public static inject(store: Store<ErrorState>) {
    this.store = store;
    this.effects();
    return store;
  }

  public static effects() {
    return this.store;
  }
}
