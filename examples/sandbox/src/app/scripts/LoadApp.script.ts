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
    private opts: ScriptOptsType<IAppTriggers, ITriggers, IState, 'setApp'>
  ) {}

  public async init(args: ScriptInitArgsType<IAppTriggers, 'setApp','init'>) {
      console.log('LoadApp init');
      this.opts.trigger('go', 'init', null as never);
      this.opts.trigger('supply', 'init', null as never);
  }

  public update(args: ScriptUpdateArgsType<ITriggers, 'setApp', 'drop'>) {
    console.log('LoadApp update')
    this.opts.drop();
  }

}
