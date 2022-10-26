import { ScriptUpdateArgsType } from "@seijs/redux-hang-on/lib/types";
import { IState, ITriggers } from "src/_redux/types";
import { ScriptInitArgsType, ScriptOptsType } from "../../../../../dist/lib/types";
import { IComposeTriggers } from "../compose.config";




export class SetContentScript {
    constructor (private opts: ScriptOptsType<IComposeTriggers,ITriggers, IState, 'setContent'>) {}

    private subject: string = ''
    private body: string = ''

    public init(args: ScriptInitArgsType<IComposeTriggers, 'setContent', 'init'>) {

    }

    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'setContent',  'setForm' | 'openWindow'>) {
        console.log(args.status)
        console.log(this.opts.getCurrentState())

        if(args.status === 'setForm') {
            //@ts-ignore
            if(args.payload.input === 'subject') {
                 //@ts-ignore
                this.subject = args.payload.text
            }
             //@ts-ignore
            if(args.payload.input === 'body') {
                 //@ts-ignore
                this.body = args.payload.text
            }
        }
        if(args.status === 'openWindow') {
            this.opts.trigger('setFormState', '', {
                'body': this.body,
                'subject': this.subject
            })
        }
    }

}