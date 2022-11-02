




import { IState, ITriggers } from "src/_redux/types";
import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "../../../../../dist/lib/types";
import { IComposeTriggers } from "../compose.config";



export class OpenWindowScript {
    constructor(private opts: ScriptOptsType<IComposeTriggers,ITriggers,IState, 'preventClose'>) {}


    public init(args: ScriptInitArgsType<IComposeTriggers, 'preventClose', 'init'>) {

    }

    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'check' | 'clear'>) {

    }

}