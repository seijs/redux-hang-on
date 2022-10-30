
import { IState, ITriggers } from "src/_redux/types";
import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "../../../../../dist/lib/types";
import { IComposeTriggers } from "../compose.config";



export class PreventCloseScript {
    constructor(private opts: ScriptOptsType<IComposeTriggers,ITriggers,IState, 'preventClose'>) {}

    private body: string
    private subject: string
    private check: boolean = true
    private poceedCallBack: ()=>void
    private preventCallBack: ()=>void

    public init(args: ScriptInitArgsType<IComposeTriggers, 'preventClose', 'init'>) {
        console.log('PREVENT INIT')
        const {subject, body} = this.opts.getCurrentState().compose
        this.body = body
        this.subject =subject
        this.poceedCallBack = args.proceed
        this.preventCallBack = args.prevent
    }

    private handleCheck (args:ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'check'> ) {
        console.log('CHECK')
        if(this.check && (args.payload.subject !== this.subject || args.payload.body !== this.body)) {
            this.preventCallBack()
        }
        else {
            this.poceedCallBack()
           // this.opts.drop()
        }   
    }
    private handleClear (args:ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'clear'> ) {
        this.check = false
        this.poceedCallBack()
    }

    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'preventClose', 'check' | 'clear'>) {
        if(args.status === 'check') {
            this.handleCheck(args as any)
        }
        if(args.status === 'clear') {
            this.handleClear(args as any)
        }
    }

}