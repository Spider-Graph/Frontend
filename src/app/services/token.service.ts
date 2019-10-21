import { Store } from 'undux';

export type TokenState = { token?: string };

export class TokenService {
  private static store: Store<TokenState>;

  public static inject(store: Store<TokenState>) {
    this.store = store;
    this.effects();
    return store;
  }

  public static effects() {
    this.store.on('token').subscribe(async token => {
      localStorage.setItem('token', token);
    })

    return this.store;
  }
}