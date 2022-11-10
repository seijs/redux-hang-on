import * as React from 'react';
import { useSelector } from 'react-redux';
import { IState } from 'src/_redux/types';
import { useTrigger } from 'src/_redux/useTrigger';

export const App = () => {
  const trigger = useTrigger();

  const forward = (e) => {
    trigger('go', 'forward_start', null as never);
  };
  const back = (e) => {
    trigger('go', 'backward_start', null as never);
  };

  const {deep} = useSelector(
    (state: IState) => ({ deep: state.app.deep.one.two}),
    () => false
  );
  console.log('render');

  React.useEffect(()=> {
    trigger('setApp', 'init', null as never);
  },[])
  

  return (
    <div>
      <div>App</div>
      <div onClick={()=> trigger('setAppDeep', '', 5)}>Deep</div>
      <div onClick={forward}>Forward</div>
      <div onClick={back}>BackWard</div>
      <div>{deep}</div>
    </div>
  );
};
