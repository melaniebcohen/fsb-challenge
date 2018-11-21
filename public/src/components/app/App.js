import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import HomePage from '../../pages/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path='*' component={NavBar} />
        <Route path='/' component={HomePage} />
      </div>
    </BrowserRouter>
  );
};

export default App;