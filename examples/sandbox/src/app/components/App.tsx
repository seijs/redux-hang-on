import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const handleClickInit = (e) => {
    dispatch({ type: 'loadApp/wait' });
  };
  const handleClickUpdate = (e) => {
    dispatch({ type: 'loadApp/done', payload: 1 });
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
