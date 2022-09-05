import {
  ScriptInitArgsType,
  ScriptOptsType,
  ScriptUpdateArgsType,
} from 'src/_lib-redux-hang-on/types';
import { IState, ITriggers } from 'src/_redux/types';
import { IAppTriggers } from '../app.config';

export class LoadApp {
  constructor(
    private opts: ScriptOptsType<IAppTriggers, IAppTriggers, IState, 'loadApp'>
  ) {}

  public init(args: ScriptInitArgsType<IAppTriggers, 'loadApp', 'wait'>) {
    this.opts.trigger('setApp', '', { one: 's', two: 2 });
    console.log(args.bar);
  }

  public update(args: ScriptUpdateArgsType<IAppTriggers, 'loadApp', 'wait'>) {
    console.log(args.payload);
    console.log(args.status);
    console.log(args.trigger);
    //args.hangOn();
  }
}
