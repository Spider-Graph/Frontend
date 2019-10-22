import { Effects, Store, createConnectedStore, withLogger } from 'undux';

import { ChartService, ChartState } from './chart.service';
import { ErrorService, ErrorState } from './error.service';
import { TokenService, TokenState } from './token.service';

export type StoreState = ChartState & ErrorState & TokenState;
export type StoreProp = { store: Store<StoreState> };

export class StoreService {
  private static readonly effects: Effects<StoreState> = (store) => {
    ChartService.inject(store as Store<ChartState>);
    ErrorService.inject(store as Store<ErrorState>);
    TokenService.inject(store as Store<TokenState>);

    store.on('token').subscribe((token) => {
      if (!token) store.set('chart')(null);
    });

    withLogger(store);
    return store;
  };

  private static readonly store = createConnectedStore<StoreState>(
    { token: localStorage.getItem('token'), chart: null, error: '' },
    StoreService.effects
  );

  public static readonly Container = StoreService.store.Container;
  public static readonly withStore = StoreService.store.withStore;
  public static readonly useStore = StoreService.store.useStore;
}
