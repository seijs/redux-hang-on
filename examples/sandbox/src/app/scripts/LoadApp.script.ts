import {
  ScriptInitArgsType,
  ScriptOptsType,
  ScriptUpdateArgsType,
} from '@seijs/redux-hang-on/lib/types';
import { IState, ITriggers } from 'src/_redux/types';
import { IAppTriggers } from '../app.config';
import {UpdateOn} from '../../../../../dist/lib/processor/decorator/UpdateOn'

export class LoadApp {
  constructor(
    private opts: ScriptOptsType<IAppTriggers, ITriggers, IState, 'loadApp'>
  ) {}

  public init(args: ScriptInitArgsType<IAppTriggers, 'loadApp','wait'>) {
    //this.opts.trigger('setApp', '', { one: 's', two: 2 });
    console.log(args.foo);

    
  }

  public update(args: ScriptUpdateArgsType<ITriggers, 'loadApp', 'done'>) {
    console.log('UPDATE')
    //args.hangOn({keepUpdate: true})
    //args.hangOn();
  }

    //@ts-ignore
    @UpdateOn('loadApp', 'wait')
    foo() {
        console.log('foo!');
    }
    //@ts-ignore
    @UpdateOn('loadApp', 'done')
    bar() {
      console.log('bar!');
    }
}
