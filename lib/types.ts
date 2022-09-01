export type GetByKey<T, K> = K extends keyof T ? T[K] : null;

export type MakeReducerType<AC, StoreType> = {
  [T in keyof AC]: AC[T] extends Record<string, unknown>
    ? {
        [S in keyof AC[T]]: (
          state: StoreType,
          payload: GetByKey<AC[T], S>
        ) => void;
      }
    : (state: StoreType, payload: AC[T]) => void;
};
export type MakeActionCreatorsType<AC> = {
  [T in keyof AC]: (args: AC[T]) => void;
};

export type DispatcherType<IR> = <K extends keyof IR, S extends keyof IR[K]>(
  type: K,
  status: IR[K] extends Record<string, unknown> ? S : null,
  payload: IR[K] extends Record<string, unknown> ? IR[K][S] : IR[K]
) => void;

export type SetStatatusType<IR, Trigger extends keyof IR> = <
  Status extends keyof IR[Trigger]
>(
  status: Status,
  payload: IR[Trigger][Status]
) => void;

export type DefautOpts<IR, IStore, Trigger extends keyof IR> = {
  setStatus: SetStatatusType<PickWithKeys<IR>, Trigger>;
  trigger: DispatcherType<IR>;
  triggerOnly: DispatcherType<IR>;
  save: DispatcherType<IR>;
  uid: string;
  getCurrentState: () => IStore;
  stopPropagate: () => void;
  drop: () => void;
  state: IStore;
};

export type MakeProcessorType<IR, IStore> = Partial<{
  [key in keyof IR]: {
    triggerStatus: keyof OmitNever<PickWithKeys<IR>>[keyof OmitNever<
      PickWithKeys<IR>
    >];
    updateOn?: Array<
      | Record<
          keyof IR,
          keyof OmitNever<PickWithKeys<IR>>[keyof OmitNever<PickWithKeys<IR>>]
        >
      | keyof IR
    >;
    dropType?: keyof IR;
    dropStatus?: keyof OmitNever<PickWithKeys<IR>>[keyof OmitNever<
      PickWithKeys<IR>
    >];
    instance: 'stable' | 'multiple' | 'refreshing';

    saga: unknown; //IA[key];
    opts?: DefautOpts<IR, IStore, keyof IR>;
    customOpts?: unknown;
    canTrigger?: Array<keyof IR>;
  };
}>;

export type ProcessorOptsType<
  IR,
  IStore,
  Trigger extends keyof IR
> = DefautOpts<IR, IStore, Trigger>;

type PickWithKeys<Type> = {
  [K in keyof Type]: Type[K] extends Record<string, unknown> ? Type[K] : never;
};

type PickSubKeys<Type> = keyof PickWithKeys<Type>;
type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

export type ProcessorUpdateArgs<IR, IStore> = {
  payload: IR[keyof IR] extends Record<string, unknown>
    ? IR[keyof IR][keyof IR[keyof IR]]
    : IR[keyof IR];
  trigger: keyof IR;
  status: keyof OmitNever<PickWithKeys<IR>>[keyof OmitNever<PickWithKeys<IR>>];
  nextState: IStore;
  stop: (args?: {keepUpdate: boolean}) => void;
};
