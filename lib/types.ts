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

export type TriggerPhaseVals<IR> = {
  [K in keyof IR]: IR[K] extends TriggerPhaseWrapper<Record<string, unknown>>
    ? ReturnType<IR[K]>
    : never;
};
export type TriggerPhaseKeys<
  IR,
  K extends keyof IR
> = K extends keyof OmitNever<TriggerPhaseVals<IR>>
  ? keyof OmitNever<TriggerPhaseVals<IR>>[K]
  : '';
type TriggerPhasePayload<
  IR,
  K extends keyof IR,
  S extends TriggerPhaseKeys<IR, K>
> = IR[K] extends TriggerPhaseWrapper<Record<string, unknown>>
  ? GetByKey<ReturnType<IR[K]>, S>
  : IR[K];

export type DispatcherType<IR> = <
  K extends keyof IR,
  S extends TriggerPhaseKeys<IR, K>
>(
  type: K,
  status: S,
  payload: TriggerPhasePayload<IR, K, S>
) => void;

export type SetStatusType<IR, K extends keyof IR> = <
  S extends TriggerPhaseKeys<IR, K>
>(
  status: S,
  payload: TriggerPhasePayload<IR, K, S>
) => void;

export type DefautOpts<
  ITrigger,
  IRootTrigger,
  IState,
  BiteName extends keyof ITrigger
> = {
  setStatus: SetStatusType<ITrigger, BiteName>;
  trigger: DispatcherType<IRootTrigger>;
  triggerOnly: DispatcherType<IRootTrigger>;
  save: DispatcherType<IRootTrigger>;
  uid: string;
  getCurrentState: () => IState;
  drop: () => void;
  state: IState;
};

export type ReducerArgsType<ITrigger> = {
  [K in keyof ITrigger]: ITrigger[K] extends TriggerPhaseWrapper<Record<string, unknown>> ? ReturnType<ITrigger[K]>:ITrigger[K]
}


// export type MakeProcessorType<IR, IStore> = Partial<{
//   [key in keyof IR]: {
//     triggerStatus: keyof OmitNever<PickWithKeys<IR>>[keyof OmitNever<
//       PickWithKeys<IR>
//     >];
//     updateOn?: Array<
//       | Record<
//           keyof IR,
//           keyof OmitNever<PickWithKeys<IR>>[keyof OmitNever<PickWithKeys<IR>>]
//         >
//       | keyof IR
//     >;
//     dropType?: keyof IR;
//     dropStatus?: keyof OmitNever<PickWithKeys<IR>>[keyof OmitNever<
//       PickWithKeys<IR>
//     >];
//     instance: 'stable' | 'multiple' | 'refreshing';

//     saga: unknown; //IA[key];
//     opts?: DefautOpts<IR, IStore, keyof IR>;
//     customOpts?: unknown;
//     canTrigger?: Array<keyof IR>;
//   };
// }>;

// export type ProcessorOptsType<
//   IR,
//   IStore,
//   Trigger extends keyof IR
// > = DefautOpts<IR, IStore, Trigger>;

// type PickWithKeys<Type> = {
//   [K in keyof Type]: Type[K] extends Record<string, unknown> ? Type[K] : never;
// };

//type PickSubKeys<Type> = keyof PickWithKeys<Type>;
type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

// export type ProcessorUpdateArgs<IR, IStore> = {
//   payload: IR[keyof IR] extends Record<string, unknown>
//     ? IR[keyof IR][keyof IR[keyof IR]]
//     : IR[keyof IR];
//   trigger: keyof IR;
//   status: keyof OmitNever<PickWithKeys<IR>>[keyof OmitNever<PickWithKeys<IR>>];
//   hangOn: (args?: { keepUpdate: boolean }) => void;
// };

export type TriggerPhaseWrapper<Args> = (args: Args) => Args;

export type MakeBiteReducerType<
  ITrigger,
  IState,
  BiteName extends keyof ITrigger
> = ITrigger[BiteName] extends TriggerPhaseWrapper<Record<string, unknown>>
  ? {
      [S in keyof ReturnType<ITrigger[BiteName]>]: (
        state: IState,
        payload: GetByKey<ReturnType<ITrigger[BiteName]>, S>
      ) => void;
    }
  : (state: IState, payload: ITrigger[BiteName]) => void;

export type MakeBiteProcessorType<
  ITrigger,
  IRootTrigger,
  IState,
  BiteName extends keyof ITrigger
> = {
  triggerStatus: ITrigger[BiteName] extends TriggerPhaseWrapper<
    Record<string, unknown>
  >
    ? keyof ReturnType<ITrigger[BiteName]>
    : '';
  updateOn?:
    | Array<
        Partial<
          Record<keyof ITrigger, TriggerPhaseKeys<ITrigger, keyof ITrigger>>
        >
      >
    | keyof ITrigger;
  instance: 'stable' | 'multiple' | 'refreshings';

  script: unknown; //IA[key];
  opts?: DefautOpts<ITrigger, IRootTrigger, IState, BiteName>;
  customOpts?: unknown;
  canTrigger?: Array<keyof IRootTrigger>;
};

export type MakeBiteType<ITrigger, IRootTrigger, IState> = {
  [key in keyof ITrigger]: {
    reducer: MakeBiteReducerType<ITrigger, IState, key> | null;
    processor: MakeBiteProcessorType<
      ITrigger,
      IRootTrigger,
      IState,
      key
    > | null;
  };
};

export type ScriptOptsType<
  ITrigger,
  IRootTrigger,
  IState,
  BiteName extends keyof ITrigger
> = DefautOpts<ITrigger, IRootTrigger, IState, BiteName>;

export type ScriptInitArgsType<
  ITrigger,
  Tr extends keyof ITrigger,
  PhK extends TriggerPhaseKeys<ITrigger, Tr>
> = TriggerPhasePayload<ITrigger, Tr, PhK>;

export type ScriptUpdateArgsType<
  ITrigger,
  Tr extends keyof ITrigger,
  PhK extends TriggerPhaseKeys<ITrigger, Tr>
> = {
  payload: TriggerPhasePayload<ITrigger, Tr, PhK>;
  trigger: ITrigger;
  status: PhK;
  hangOn: (args?: { keepUpdate: boolean }) => void;
};

// export interface ISript<
//   ITrigger,
//   IRootTrigger,
//   IState,
//   BiteName extends keyof ITrigger
// > {
//   opts?: ScriptOptsType<ITrigger, IRootTrigger, IState, BiteName>;

//   init: (
//     args: ScriptInitArgsType<ITrigger, IRootTrigger, IState, BiteName>
//   ) => void;

//   update?: (
//     args: ScriptUpdateArgsType<ITrigger, IRootTrigger, IState, BiteName>
//   ) => void;
// }
