import { Bite, Slice } from '../../../../dist/lib';
import { IState, ITriggers } from 'src/_redux/types';
import { TriggerPhaseWrapper } from '../../../../dist/lib/types';
import { RouteScript } from './scripts/Route.script';

export interface IRouterState {
    currentRoute: string
    historyMaxLen: number
    history: Array<string>
    routes: Array<string>
}

export interface IRouterTriggers {
    route: TriggerPhaseWrapper<{
        init: null
        goTo: string
        goBack: null 
    }>
}

export const routerInitialState: IRouterState = {
    'currentRoute': '',
    'history': [],
    'historyMaxLen': 1,
    'routes': []
};

const routeBite = Bite<IRouterTriggers, ITriggers, IRouterState, IState, 'route'>({
    'goBack': null,
    'goTo': null,
    'init': null
}, {
    'triggerStatus': 'init',
    'instance': 'stable',
    'updateOn': ['route'],
    'canTrigger': [],
    script: RouteScript
})

   

export const routerSlice = Slice<IRouterTriggers, ITriggers, IRouterState, IState>(
  'router',
    {
     'route': routeBite,
    },
    routerInitialState
);
