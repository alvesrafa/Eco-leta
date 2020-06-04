import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Main from './Views/Pages/Main';
import CreatePoint from './Views/Pages/CreatePoint';

const Routes = () => {
  return (
    <BrowserRouter>
    <Route component={Main} path="/" exact/>
    <Route component={CreatePoint} path="/register" />
  </BrowserRouter>
  )
}
export default Routes;