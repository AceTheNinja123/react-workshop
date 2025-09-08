import { create } from 'zustand';
import { persist, type PersistOptions } from 'zustand/middleware'
import _ from 'lodash';
import { CustomizerSlice, type State as CustomizerState, type Actions as CustomizerActions, } from './slices/CustomizerSlice'
import { add, startOfDay, sub, getYear} from 'date-fns';
import Storage from '../utils/Storage'

const now = new Date();
const start = startOfDay(now);
const end = add(sub(start, { seconds: 1 }), { days: 1 });
const storage = Storage();
export const month = [startOfDay(sub(start, { days: 31 })), end];

export interface Store {
    [key: string]: unknown;
    customizer: CustomizerState & CustomizerActions;
}
interface PersistStore {
    customizer: CustomizerState;
}

export type StoreSet = (partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>)) => void;
export type StoreGet = () => Store;
type CreatePersistStore<T, R> = (
    config: (set: StoreSet, get: StoreGet) => T,
    options: PersistOptions<R>
) => (set: StoreSet, get: StoreGet, api: unknown) => T;

const useStore = create<Store>(
    (persist as CreatePersistStore<Store, PersistStore>)(
        (set) => ({
            customizer: CustomizerSlice(set),
        }),
        {
            name: 'root-storage',
            partialize: (state: PersistStore): PersistStore => ({
                customizer: state.customizer,
            }),
            merge: (persistedState, currentState) => _.merge({}, currentState, persistedState),
        }
    )
);
/* Difference between start and end dates*/
const pickerStart = new Date(storage.getItem('picker-start', 'session'));
const pickerEnd = new Date(storage.getItem('picker-end', 'session'));

/*Get the start and end year*/
export const startYear = getYear(pickerStart);
export const endYear = getYear(pickerEnd);
export default useStore;