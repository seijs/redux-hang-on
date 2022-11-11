import { TriggerPhaseWrapper } from "@seijs/redux-hang-on/lib/types"
import {Bite,Slice} from '@seijs/redux-hang-on'
import { IState, ITriggers } from "src/_redux/types"
import { RecordScript } from "./scripts/Record.script"
import { PlayScript } from "./scripts/Play.script"



export interface IRecordState {
    isRecording: boolean
    time: number
}


export interface IRecordTriggers {
    record: TriggerPhaseWrapper<{
        'act': null
        'init': null
        'start': null,
        'stop': null,
    }>
    play: TriggerPhaseWrapper<{
        'init': null
        'start': null,
        'stop': null,
    }>,
    setState: Partial<IRecordState>,
}

export const recordBite = Bite<IRecordTriggers, ITriggers, IRecordState, IState, 'record'>({
    'act': null,
    'start': null,
    'stop': null,
    'init': null, 
}, {
    'script': RecordScript,
    'instance': 'stable',
    'updateOn': [],
    'triggerStatus': 'init',
    'canTrigger': ['record', 'setState']
})

export const playBite = Bite<IRecordTriggers, ITriggers, IRecordState, IState, 'play'>({
    'start': null,
    'stop': null,
    'init': null
}, {
    'script': PlayScript,
    'instance': 'stable',
    'updateOn': ['play'],
    'triggerStatus': 'init',
    'canTrigger': ['play']
})


const recorderInitialState: IRecordState = {
    isRecording: false,
    time: 0
}


export const recorderSlice = Slice<IRecordTriggers, ITriggers, IRecordState, IState>('recorder', {
    'play': playBite,
    'record': recordBite,
    setState: Bite((state, payload)=> Object.assign(state, payload),null)
},recorderInitialState)