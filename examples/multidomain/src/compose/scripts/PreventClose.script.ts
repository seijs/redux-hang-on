
import { IState, ITriggers } from "src/_redux/types";
import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "../../../../../dist/lib/types";
import { IComposeTriggers } from "../compose.config";



export class PreventCloseScript {
    constructor(private opts: ScriptOptsType<IComposeTriggers,ITriggers,IState, 'preventClose'>) {}

    private body: string = ''
    private subject: string = ''
    private check: boolean = true
    private passCb: ()=>void

    public init(args: ScriptInitArgsType<IComposeTriggers, 'preventClose', 'init'>) {
        console.log('PREVENT INIT')
    }

    private handleCheck (args:ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'checkReq'> ) {
        console.log('CHECK')
        this.passCb = args.payload.passCb
        if (typeof args.payload.subject === 'undefined' && typeof args.payload.body === 'undefined') {
            this.opts.trigger('preventClose', 'checkResp', true)
        }
        else if (this.check && (args.payload.subject !== this.subject || args.payload.body !== this.body)) {
            this.opts.trigger('preventClose', 'checkResp', false)
        }
        else {
           this.opts.trigger('preventClose', 'checkResp', true)
           this.opts.drop()
        }   
    }
    private handleClear (args:ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'clear'> ) {
        if(this.passCb) {
            this.passCb()
        } 
        this.check = false
        this.opts.drop()
    }
    private handleSet (args:ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'set'> ) {
        this.body = args.payload.body
        this.subject = args.payload.subject
    }

    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'checkReq' | 'clear' | 'set'>) {
        if(args.status === 'checkReq') {
            this.handleCheck(args as any)
        }
        if(args.status === 'clear') {
            this.handleClear(args as any)
        }
        if(args.status === 'set') {
            this.handleSet(args as any)
        }
    }

}