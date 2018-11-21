import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import colorStore from './reducers/colors-reducer.js';

import App from './components/app/App';
import './style/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = colorStore();

const Root = () => {
  return (
    <main>
      <Provider store={store}>
        <App />
      </Provider>
    </main>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));