import React, { Component, Fragment } from 'react';
import AvatarList from '../components/avatar-list/AvatarList';

export default class HomePage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='columns is-centered'>
          <div className='column is-half'>
            <AvatarList />
          </div>
        </div>
      </div>
    );
  }
}