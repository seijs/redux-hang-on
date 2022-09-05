import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTrigger } from 'src/_redux/useTrigger';

export const App = () => {
  const trigger = useTrigger();

  const handleClickInit = (e) => {
    trigger('loadApp', 'wait', {
      foo: '1',
      bar: 2,
    });
  };
  const handleClickUpdate = (e) => {
    trigger('loadApp', 'done', 1);
  };

  const app = useSelector(
    (state: any) => state.app,
    () => false
  );
  console.log('render');

  return (
    <div>
      <div>App</div>
      <div onClick={handleClickInit}>Init</div>
      <div onClick={handleClickUpdate}>Update</div>
      <div>{app.app}</div>
    </div>
  );
};
