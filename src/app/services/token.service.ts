import { Store } from 'undux';
import {client} from '@graphql/client'

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
      if (token) localStorage.setItem('token', token);
      if (!token) localStorage.removeItem('token');
      if (!token) client.resetStore();
    })

    return this.store;
  }
}