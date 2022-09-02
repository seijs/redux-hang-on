# redux-hang-on

Library for nice and scalable organizing of business logic in redux applications.

## Motivation
No more *store.dispatch* hell. Just nicely readable and configurable in one place class-definitively styled description of the business logic of your application. Good solution for large enterprise react-redux projects.

## Installation

```bash

yarn add @seijs/redux-hang-on

```

## Usage

To use it, implement *redux slice*  as follows.
First *reducer* part
```typescript

import { User } from  'src/_api/types/entities';
import { MakeReducerType } from  '@seijs/redux-hang-on/lib/types';
import { loadUserDone } from  './loadUserDone';
import { loadUserWait } from  './loadUserWait';

  

export  interface  IUserSate {
	user: User | null;
	loading: boolean;
}

export  interface  IUserTriggers {
	loadUser: {
		wait: never;
		done: User;
		fail: string;
	}
};
  
export  type  UserReducerType = MakeReducerType<IUserTriggers, IUserSate>;

export  const  userInitialState: IUserSate = {
	user:  null,
	loading:  false,
};

export  const  userReducer: UserReducerType = {
	loadUser: {
		wait:  loadUserWait,
		done:  loadUserDone,
		fail:  null,
	}
},
```
where reducers *loadUserWait* and *loadUserDone* behaves like they are mutating state

```typescript
import { UserReducerType } from  '.';

  

export  const  loadUserDone: UserReducerType['loadUser']['done'] = (
	state,
	payload
) => {
	state.user = payload;
	state.loading = false;
};

export  const  loadUserWait: UserReducerType['loadUser']['wait'] = (
	state,
	payload
) => {
	state.loading = true;
};
```
Nice. Next let's implement very interesting object, which feeds one of the key features of **redux-hang-on** library. 

The *processor* part.

First discuss the **processor configuration object**.
What is processor? This is  where all the business happens.
Something like this

```typescript
import { IState } from  'src/_redux/types';
import { MakeProcessorType } from  '@seijs/redux-hang-on/lib/types';
import { IUserTriggers} from  '../__reducers';
import { LoadUser } from  './LoadUser;

export  type  IUserProcessor = MakeProcessorType<IUserTriggers, IState>;

export  const  userProcessor: IUserProcessor = {
	loadUser: {
		saga:  LoadUser,
		instance:  'stable',
		triggerStatus:  'wait',
		updateOn: [{ loadUser:  'done' }],
		canTrigger: ['loadUser'],
	},
};

```
Here 
> loadUser: { 
triggerStatus: wait 
...
}

means that process inits when *action* with the type *loadUser/wait* is dispatched.

>saga: LoadUser

is a processor class itselves. 

>instance : ... 

 configures mode of creating of *LoadUser* class instance. There are three types of modes: **stable**, **refreshing** and **multiple**. **stable** means instance is created once when triggering action is dispatched and lives in the context until it will be manually dropped. On **refreshing** mode, instance is getting dropped and recreated every time. On **multiple**, the new instance of corresponding processor class is created (with different uid).

  

Processor class has required method **init(...)** which accepts triggered action payload and
is called when this action is dispatched.
It also has the non-required method **update(...)**, which is called every time when
actions with types specified in 
>updateOn: [....] are dispatched.

In array you can specify types of actions like ['actionOne', 'actionTwo'] or even specify more precisely [{actionOne: 'init' }] 

Let's see our example of *LoadUser* processor.
```typescript

import { ProcessorUpdateArgs } from  '@seijs/redux-hang-on/lib/types';
import { IState } from  'src/_redux/types';
import { IUserProcessor } from  '.';
import { IUserTriggers } from  '../__reducers';

  

export  class  LoadUser {
	constructor(private  opts: IUserProcessor['loadUser']['opts']) {}

	public  async  init(args: IUserTriggers['loadUser']['wait']) {
		/*
        ** Here you can call side effects, 
		** dispatch actions 
		** via this.opts.trigger('actionName', 'actionStatus',{...payload})
		** safely trigger action which does not affect updateOn watchers
		** via this.opts.triggerOnly('actionName', 'actionStatus',{...payload})
        ** get curent state via
        ** this.opts.getCurrentState()
		*/ 
		setTimeout(() => {
			this.opts.trigger('loadUser', 'fail', this.opts.uid);
		}, 5000);
	}

	public async  update(args: ProcessorUpdateArgs<IUserTriggers, IState>) {

		this.opts.hangOn()
		/* 
        ** Here you can do all the same staff and 
		** call args.hangOn() to prevent reducer call. WOW!
		** this is not all  - you can call it like args.hangOn({keepUpdate: true}) 
		** to update state but without reducer call ( and subcequent  rendering in
		** react components). 
		*/
		
	}
}
```
Inside the processor all the actions that could be triggered are specified in 
>canTrigger : [...]

Now wrap it all into *slice*

```typescript
import { createSlice } from '@seijs/redux-hang-on/createSlice';
import { eventsProcessor } from './__processors';
import { eventsInitialState, eventsReducer } from './__reducers';

export const userSlice = createSlice({
  reducer: userReducer as any,
  processor: userProcessor as any,
  initialState: userInitialState,
  sliceName: 'user',
});
```
And plug it into *redux* *store*

```typescript
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { userSlice } from 'src/user/__module';
import { IUserState } from 'src/user/__reducers';


export type IState = {
  user: IUserState;
};


const rootReducer = combineReducers({
  ...userSlice.reducer,
});

function configureStore() {
  const middlewares: Middleware[] = [userSlice.middleware];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}
const store = configureStore();

export default store;

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

  

Please make sure to update tests as appropriate.

  

## License

[MIT](https://choosealicense.com/licenses/mit/)

