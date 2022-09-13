import {
    ScriptInitArgsType,
    ScriptOptsType,
    ScriptUpdateArgsType,
  } from '../../../../../dist/lib/types';
  import { IState, ITriggers } from 'src/_redux/types';
  import { IAppTriggers } from '../app.config';
  import {UpdateOn} from '../../../../../dist/lib/processor/decorator/UpdateOn'
  
  export class Supply {
    private milk: number
    private meat: number
    constructor(
      private opts: ScriptOptsType<IAppTriggers, ITriggers, IState, 'supply'>
    ) {
        this.milk = 100;
        this.meat = 100;
    }
  
    public async init(args: ScriptInitArgsType<IAppTriggers, 'supply','init'>) {
        console.log('Supply init')
    }

    private suplyMilk(args: unknown) {
        
        console.log('suplyMilk')

    }
    private suppyMeat(args: unknown) {
        console.log('supplyMeat')
        const value = this.meat - 10 > 0 ? 10 : 0
        this.meat -=10
        this.opts.trigger('supply', 'meat_end', value);
    }
  
    public update(args: ScriptUpdateArgsType<ITriggers, 'supply', 'meat_start'| 'milk_start'>) {
     if(args.status === 'milk_start') {
        this.suplyMilk(args)
     }
     if(args.status === 'meat_start') {
        this.suppyMeat(args)
     }
    }
  
  }
  