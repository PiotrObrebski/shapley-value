import './App.css';
import 'antd/dist/antd.css';

import React from 'react';
import { Provider } from 'react-redux';

import AppBody from '../components/layout/body/app-body/app-body';
import AppHeader from '../components/layout/header/app-header';
import AppMenu from '../components/layout/menu/app-menu';
import store from '../redux/store';

const App = (): JSX.Element => {

  return (
    <Provider store={store}>
    <div className="App">
      <AppHeader/>
      <AppMenu/>
      <AppBody/>
    </div>
    </Provider>
  );
}

export default App;
