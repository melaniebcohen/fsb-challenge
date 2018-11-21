import React, { Component } from 'react';
import AvatarCard from '../avatar-card/AvatarCard';

export default class AvatarList extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    for (let i = 0; i < 10; i++) {
      console.log('yo')
      return <AvatarCard />;
    }
  }

  render() {
    return (
      this.renderList()
    );
  }
}