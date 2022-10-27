import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "@seijs/redux-hang-on/lib/types";
import { IState, ITriggers } from "src/_redux/types";
import { IComposeTriggers } from "../compose.config";


export class SaveLetterScript {
    constructor (private opts: ScriptOptsType<IComposeTriggers,ITriggers, IState, 'saveLetter'>) {}

    public init(args: ScriptInitArgsType<IComposeTriggers, 'saveLetter', 'init'>) {
        
    }

    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'saveLetter', 'init' | 'done' | 'save'>) {

    }
}