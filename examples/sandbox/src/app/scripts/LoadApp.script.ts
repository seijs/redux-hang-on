import {
  ScriptInitArgsType,
  ScriptOptsType,
  ScriptUpdateArgsType,
} from '../../../../../dist/lib/types';
import { IState, ITriggers } from 'src/_redux/types';
import { IAppTriggers } from '../app.config';
import {UpdateOn} from '../../../../../dist/lib/processor/decorator/UpdateOn'

export class LoadApp {
  constructor(
    private opts: ScriptOptsType<IAppTriggers, ITriggers, IState, 'loadApp'>
  ) {}

  public async init(args: ScriptInitArgsType<IAppTriggers, 'loadApp','wait'>) {
    //this.opts.trigger('setApp', '', { one: 's', two: 2 });
    const tes = await this.opts.wait('loadApp', 'done');
    console.log(`tes ${tes}`)
    
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
