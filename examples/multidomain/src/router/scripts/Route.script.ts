import { IState, ITriggers } from "src/_redux/types";
import { ScriptInitArgsType, ScriptOptsType, ScriptUpdateArgsType } from "../../../../../dist/lib/types";
import { IRouterTriggers } from "../router.config";



export class RouteScript {
    constructor(private opts: ScriptOptsType<IRouterTriggers,ITriggers,IState, 'route'>) {}

    public init(args: ScriptInitArgsType<IRouterTriggers, 'route', 'init'>) {
        
       // here we can implement popup queue
    }

    public update(args: ScriptUpdateArgsType<IRouterTriggers, 'route', 'goBack' | 'goTo'>) {
        
    }

}