import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appCreateStore from './lib/app-create-store';

import App from './components/app/App';
import './style/main.scss';

const store = appCreateStore();

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));