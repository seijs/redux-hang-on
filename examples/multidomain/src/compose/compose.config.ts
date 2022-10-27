import { ILetter } from "src/letters/interfaces/Letter.interface"
import { IState, ITriggers } from "src/_redux/types"
import { Bite, Slice } from "../../../../dist/lib"
import { TriggerPhaseWrapper } from "../../../../dist/lib/types"
import { changeItemReducer } from "./reducers/changeItem.reducer"
import { closeWindowRecucer } from "./reducers/closeWindow.reducer"
import {openWindowReducer} from './reducers/openWindow.reducer'
import { SetContentScript } from "./scripts/SetContent.script"


export interface IComposeState  {
    openedComposeId: string | null
    composeItems: Array<{
        id: string
        subject: string
    }>
    body: string
    subject: string
    from: string
    to: string
}

const composeInitialState: IComposeState = {
    openedComposeId: null,
    composeItems: [],
    body: '',
    subject: '',
    from: '',
    to: ''
}



export interface IComposeTriggers {
    setContent: TriggerPhaseWrapper<{
        init: null;
        changeItem: { id: string; subject?: string };
        openWindow: { id: string | null };
        closeWindow: { id: string };
        submit: {id: string};
        syncForm: {
          text: string,
          input: 'subject' | 'body'
        }
        done: null;
    }>
    saveLetter: TriggerPhaseWrapper<{
        init: null
        save: null
        done: null
    }>
    setFormState: Partial<IComposeState>

}

const setContentBite = Bite<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'setContent'
>(
  {
    init: null,
    changeItem: changeItemReducer,
    openWindow: openWindowReducer,
    closeWindow: closeWindowRecucer,
    submit: closeWindowRecucer,
    syncForm: null, // вытащить из хранилища форму и положить ее в стор
    done: null
  },
  {
    updateOn: ['setContent'],
    canTrigger: ['setFormState', 'setContent'],
    script: SetContentScript,
    instance: 'stable',
    triggerStatus: 'init',
  }
);

const saveLetterBite = Bite<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'saveLetter'
>(
  {
    init: null,
    save: null,
    done: null
  },
  {
    updateOn: ['setContent'],
    canTrigger: ['setFormState'],
    script: SetContentScript,
    instance: 'stable',
    triggerStatus: 'init',
  }
);

const setFormStateBite = Bite<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'setFormState'
>((state, payload) => {
    Object.assign(state, payload)
},null
);




export const composeSlice = Slice<IComposeTriggers, ITriggers, IComposeState, IState>(
    'compose',
      {
       'setContent': setContentBite,
        'saveLetter':saveLetterBite,
        'setFormState': setFormStateBite
      },
      composeInitialState
  );