import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import appCreateStore from './lib/app-create-store';
import HomePage from './components/homepage/HomePage';

import './style/main.scss';

const store = appCreateStore();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' component={HomePage} />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
