import { ScriptUpdateArgsType } from "@seijs/redux-hang-on/lib/types";
import { IState, ITriggers } from "src/_redux/types";
import { ScriptOptsType, ScriptInitArgsType } from "../../../../../dist/lib/types";
import { Record } from "../interfaces/Record.interface";
import { IRecordTriggers } from "../recorder.config";




export class RecordScript  {
    constructor(private opts: ScriptOptsType<IRecordTriggers,ITriggers,IState, 'record'>) {}

    private time: number = 0
    private records: Array<Record>
    private isStart: boolean = false
    private interval;

    public init(args: ScriptInitArgsType<IRecordTriggers, 'record', 'init'>) {
        this.records = []
    }
    private act(args: ScriptUpdateArgsType<IRecordTriggers, 'record', 'act'>) {
        if(this.isStart) {
            this.opts.trigger('record', 'stop', null)
        }
        else {
            this.opts.trigger('record', 'start', null)
        }
    }

    public update(args: ScriptUpdateArgsType<IRecordTriggers, 'record', 'start'| 'stop' | 'act' >) {
        //@ts-ignore
        if(args.status === 'act' && args.trigger === 'record') {
            this.act(args as any)
        }
        //@ts-ignore
        if(args.status === 'start' && args.trigger === 'record') {
            this.handleStart(args as any)
        }
         //@ts-ignore
        if(args.status === 'stop' && args.trigger === 'record') {
            this.handleStop(args as any)
        }
         //@ts-ignore
        else if(this.isStart && (args.trigger !== 'setState')) {
            this.records.push({
                'args': args.payload,
                'status': args.status,
                'trigger': args.trigger as any,
                'time':  this.time
            })
            console.log(this.records)
        }

        console.log(`${args.trigger}/${args.status}`)
    }


    private handleStart(args: ScriptUpdateArgsType<IRecordTriggers, 'record', 'start'>) {
        this.isStart = true
        this.opts.trigger('setState', '', {
            'isRecording': true
        })
        this.interval = setInterval(()=> {
            this.time+=1
            this.opts.trigger('setState', '', {
                'time': this.time
            })
        },1000)

    }
    private handleStop(args: ScriptUpdateArgsType<IRecordTriggers, 'record', 'stop'>) {
        this.isStart = false
        this.opts.trigger('setState', '', {
            'isRecording': false
        })
        if(this.interval) {
            clearInterval(this.interval)
        }

    }
}