import { ILetter } from "src/letters/interfaces/Letter.interface"
import { IState, ITriggers } from "src/_redux/types"
import { Bite, Slice } from "../../../../dist/lib"
import { TriggerPhaseWrapper } from "../../../../dist/lib/types"
import { changeItemReducer } from "./reducers/changeItem.reducer"
import { closeWindowRecucer } from "./reducers/closeWindow.reducer"
import {openWindowReducer} from './reducers/openWindow.reducer'
import { OpenWindowScript } from "./scripts/OpenWindow.script"
import { PreventCloseScript } from "./scripts/PreventClose.script"
import { SetContentScript } from "./scripts/SetContent.script"
import { SubmitLetterScript } from "./scripts/SubmitLetter.script"


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
    createWindow: TriggerPhaseWrapper<{
      init: null
      createNew: null
      openLetter: {subject: string, body: string}
      openWindow: { id: string};
    }>
    setContent: TriggerPhaseWrapper<{
        init: null;
        changeItem: { id: string; subject?: string };
        openFromList: { subject: string, body: string}
        openWindow: { id: string | null };
        closeWindow: { id: string };
        submit: {id: string};
        commitFormContent: null;
        syncForm: {
          text: string,
          input: 'subject' | 'body'
        }
        done: null;
    }>
    submitLetter: TriggerPhaseWrapper<{
        init: null
        save: null
        done: null
    }>
    preventClose: TriggerPhaseWrapper<{
      init: {proceed: () => void, prevent: ()=> void},
      clear: null
      check: {body: string, subject: string}
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
    openFromList: null,
    openWindow: openWindowReducer,
    closeWindow: closeWindowRecucer,
    commitFormContent: null,
    submit: closeWindowRecucer,
    syncForm: null, // вытащить из хранилища форму и положить ее в стор
    done: null
  },
  {
    updateOn: ['setContent'],
    canTrigger: ['setFormState', 'setContent', 'preventClose', 'openPopup'],
    script: SetContentScript,
    instance: 'stable',
    triggerStatus: 'init',
  }
);

const submitLetterBite = Bite<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'submitLetter'
>(
  {
    init: null,
    save: null,
    done: null
  },
  {
    updateOn: ['submitLetter'],
    canTrigger: ['saveLetter', 'submitLetter', 'setContent', 'showNotification'],
    script: SubmitLetterScript,
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


const preventCloseBite = Bite<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'preventClose'
>(
  {
    init: null,
    check: null,
    clear: null
  },
  {
    updateOn: ['preventClose'],
    canTrigger: ['openPopup'],
    script: PreventCloseScript,
    instance: 'stable',
    triggerStatus: 'init',
  }
);


const createWindowBite = Bite<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'createWindow'
>(
  {
    init: null,
   'createNew': openWindowReducer,
   'openLetter': openWindowReducer,
   'openWindow': openWindowReducer
  },
  {
    updateOn: ['createWindow'],
    canTrigger: ['createWindow'],
    script: OpenWindowScript,
    instance: 'stable',
    triggerStatus: 'init',
  }
);



export const composeSlice = Slice<IComposeTriggers, ITriggers, IComposeState, IState>(
    'compose',
      {
       'setContent': setContentBite,
        'submitLetter':submitLetterBite,
        'setFormState': setFormStateBite,
        'preventClose': preventCloseBite,
        'createWindow': createWindowBite
      },
      composeInitialState
  );