import { StoreService, StoreState } from '@services/store.service';

const useUndux = (key: keyof StoreState): [string, (value: string) => void] => {
  const store = StoreService.useStore();
  const value = store.get(key);
  const setValue = store.set(key);
  return [value, setValue];
};

export { useUndux };
