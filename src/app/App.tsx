import React from 'react'
import './App.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';

import AppBody from "../components/layout/body/app-body/app-body";
import AppHeader from "../components/layout/header/app-header";
import store from "../redux/store";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div className="app">
        <AppHeader />
        <AppBody />
      </div>
    </Provider>
  );
};

export default App;
