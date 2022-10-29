import { ScriptUpdateArgsType } from "@seijs/redux-hang-on/lib/types";
import { IState, ITriggers } from "src/_redux/types";
import { useSystem } from "../../../../../dist/lib";
import { ScriptInitArgsType, ScriptOptsType } from "../../../../../dist/lib/types";
import { IComposeTriggers } from "../compose.config";


/*
** This script is responsible for opening 
** and closing window, managing form content.
*/
export class SetContentScript {
    constructor (private opts: ScriptOptsType<IComposeTriggers,ITriggers, IState, 'setContent'>) {}

    private forms: {[key: string]: {subject: string, body: string}} = {} 

    private system;

    public init(args: ScriptInitArgsType<IComposeTriggers, 'setContent', 'init'>) {
        this.system = useSystem();
    }


    // clear local saved data , then state will be changed by reducer
    private handleCloseWindow(args:ScriptUpdateArgsType<IComposeTriggers,'setContent', 'closeWindow'>) {
        const id = this.opts.getCurrentState().compose.openedComposeId
        if(id) {
            delete this.forms[id]
        }
      
       
    }

    // when window is getting opened we need this to restore saved state
    private handleOpenFromList(args: ScriptUpdateArgsType<IComposeTriggers, 'setContent', 'openFromList'>) {
        this.opts.trigger('setFormState', '', {
            'body': args.payload.body,
            'subject': args.payload.subject
        })
        this.opts.trigger('setContent','openWindow', {id: '-1'})
    }


    // if id = -1 => means we open brand new window 
    // if id = null => means we hide currently opened window
    private handleOpenWindow(args:ScriptUpdateArgsType<IComposeTriggers,'setContent', 'openWindow'>) {
        if(args.payload.id) {
            const savedData =  this.forms[args.payload.id]
            if(savedData) {
                this.opts.trigger('setFormState', '', {
                    'body': savedData.body,
                    'subject': savedData.subject
                })
            }
        }
        else {
            const {openedComposeId, subject, body} = this.opts.getCurrentState().compose
            console.log(`current id ${openedComposeId}`)
            if(openedComposeId) {
                const savedData =  this.forms[openedComposeId]
               
            
                this.opts.trigger('setContent', 'changeItem', {
                    'subject': savedData && savedData.subject || subject,
                    'id':  openedComposeId
                })
                if(!savedData) {
                    this.opts.trigger('setContent', 'syncForm', {
                        'input': 'body',
                        text: body
                    })
                    this.opts.trigger('setContent', 'syncForm', {
                        'input': 'subject',
                        'text': subject
                    })
                }
                this.opts.trigger('setFormState','', {
                    'body': '',
                    'subject': ''
                })
                
            }
            
        }
    }

    //save form input into class property
    private handleSyncForm(args: ScriptUpdateArgsType<IComposeTriggers, 'setContent', 'syncForm'>) {
        const currentId = this.opts.getCurrentState().compose.openedComposeId
        if(currentId) {
            if(!this.forms[currentId]) {
                this.forms[currentId] = {} as any
            }       
            if(args.payload.input === 'subject') {
                this.forms[currentId].subject = args.payload.text
            }
            if(args.payload.input === 'body') {
            this.forms[currentId].body = args.payload.text
            }
        }
    }

    public handleCommitFormContent(args:ScriptUpdateArgsType<IComposeTriggers, 'setContent', 'commitFormContent'> ) {
        const currentId = this.opts.getCurrentState().compose.openedComposeId
        if(currentId) {        
            const savedData =  this.forms[currentId]
            if(savedData) {
                this.opts.trigger('setFormState', '', {
                    'body': savedData.body,
                    'subject': savedData.subject
                })
            }
        }
    }



    public update(args: ScriptUpdateArgsType<IComposeTriggers, 'setContent',  'syncForm' | 'openWindow' | 'closeWindow' | 'commitFormContent' | 'openFromList'>) {
        //console.log(this.opts.getCurrentState())
        console.log(args.status)
        console.log(args.payload)
       // console.log(this.system)
        if(args.status === 'syncForm') {
            this.handleSyncForm(args as any);
        }
        if(args.status === 'openWindow') {
            this.handleOpenWindow(args as any);
        }
        if(args.status === 'closeWindow') {
            this.handleCloseWindow(args as any)
        }
        if(args.status === 'commitFormContent') {
            this.handleCommitFormContent(args as any)
        }
        if(args.status === 'openFromList') {
            this.handleOpenFromList(args as any)
        }
    }

}