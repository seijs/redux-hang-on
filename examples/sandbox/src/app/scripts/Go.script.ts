import {
    ScriptInitArgsType,
    ScriptOptsType,
    ScriptUpdateArgsType,
  } from '../../../../../dist/lib/types';
  import { IState, ITriggers } from 'src/_redux/types';
  import { IAppTriggers } from '../app.config';
  import {UpdateOn} from '../../../../../dist/lib/processor/decorator/UpdateOn'
  
  export class Go {
    
    private isCanGo: boolean;
    constructor(
      private opts: ScriptOptsType<IAppTriggers, ITriggers, IState, 'go'>
    ) {}
  
    public async init(args: ScriptInitArgsType<IAppTriggers, 'go','init'>) {
        console.log('Go init');
    }

    private async goBackward(args) {
         console.log('go_backward')
         const state = this.opts.getCurrentState();
         console.log(state.app)
         const supply = await this.opts.hook('supply', 'meat_start', 'meat_end', null as never);
         this.opts.trigger('setAppState','', {
          //@ts-ignore 
           'app': state.app.app + supply,
           'loading':false
         })
         const state2 = this.opts.getCurrentState();
         this.opts.trigger('setAppState','', {
          //@ts-ignore 
           'app': state2.app.app - 2* supply,
           'loading':false
         })

    }

    private goForward(args) {
      console.log('go_forward');
    }
  
    public async update(args: ScriptUpdateArgsType<ITriggers, 'go', 'backward_start' | 'forward_start'>) {
        if(args.status === 'backward_start') {
            await this.goBackward(args)
        }
        if(args.status === 'forward_start') {
            this.goForward(args)
        }
    }

  
  }
  