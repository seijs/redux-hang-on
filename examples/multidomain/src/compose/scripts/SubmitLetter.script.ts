import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "../../../../../dist/lib/types";
import { IState, ITriggers } from "src/_redux/types";
import { IComposeTriggers } from "../compose.config";


export class SubmitLetterScript {
    constructor (private opts: ScriptOptsType<IComposeTriggers,ITriggers, IState, 'submitLetter'>) {}




    public async init(args: ScriptInitArgsType<IComposeTriggers, 'submitLetter', 'init'>) {
        const {subject, body, openedComposeId} = this.opts.getCurrentState().compose;
        
        this.opts.trigger('setContent', 'commitFormContent', null)
        this.opts.trigger('saveLetter', 'init', {
            'body': body,
            'subject': subject,
            'from': 'asapovk@gmail.com',
            'to': '',
            'uid': 123
        })
        const savedId = await this.opts.wait('saveLetter', 'done')
        //Here we can throw notification that savedId was just created. For example
        this.opts.trigger('setContent', 'closeWindow', {id: openedComposeId})
        this.opts.drop()
    }

    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'submitLetter', 'init' | 'done' | 'save'>) {
        
    }
}