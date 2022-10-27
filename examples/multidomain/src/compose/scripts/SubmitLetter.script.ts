import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "@seijs/redux-hang-on/lib/types";
import { IState, ITriggers } from "src/_redux/types";
import { IComposeTriggers } from "../compose.config";


export class SubmitLetterScript {
    constructor (private opts: ScriptOptsType<IComposeTriggers,ITriggers, IState, 'submitLetter'>) {}




    public init(args: ScriptInitArgsType<IComposeTriggers, 'submitLetter', 'init'>) {
        const {subject, body, openedComposeId} = this.opts.getCurrentState().compose;
        this.opts.trigger('saveLetter', 'init', {
            'body': body,
            'subject': subject,
            'from': 'asapovk@gmail.com',
            'to': '',
            'uid': 1
        })
        // trggier open with null
        // then save
    }

    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'submitLetter', 'init' | 'done' | 'save'>) {
            // catch save done
            //
    }
}