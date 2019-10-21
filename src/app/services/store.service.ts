import { Effects, Store, createConnectedStore, withLogger } from 'undux';

import { TokenService, TokenState } from './token.service';

export type StoreState = TokenState;
export type StoreProp = { store: Store<StoreState> };

export class StoreService {
  private static readonly effects: Effects<StoreState> = store => {
    withLogger(store)
    TokenService.inject(store as Store<TokenState>);
    return store;
  };

  private static readonly store = createConnectedStore<StoreState>(
    { token: localStorage.getItem('token') },
    StoreService.effects
  );

  public static readonly Container = StoreService.store.Container;
  public static readonly withStore = StoreService.store.withStore;
  public static readonly useStore = StoreService.store.useStore;
}