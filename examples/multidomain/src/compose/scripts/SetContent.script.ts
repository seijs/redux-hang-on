import { IState, ITriggers } from "src/_redux/types";
import { ScriptInitArgsType, ScriptOptsType } from "../../../../../dist/lib/types";
import { IComposeTriggers } from "../compose.config";




export class SetContentScript {
    constructor (opt: ScriptOptsType<IComposeTriggers,ITriggers, IState, 'setContent'>) {}

    public init(args: ScriptInitArgsType<IComposeTriggers, 'setContent', 'init'>) {

    }

    public update(args: ScriptInitArgsType<IComposeTriggers, 'setContent', 'openWindow' | 'closeWindow' | 'changeItem' | 'done'>) {

    }
}