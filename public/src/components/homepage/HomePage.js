import React, { Component } from 'react';
import { connect } from 'react-redux';
import AvatarList from '../avatar-list/AvatarList';
import { repositoriesFetchRequest } from '../../actions/repositories-fetch';
import NavBar from '../navbar/NavBar';

class HomePage extends Component {
  componentDidMount() {
    return this.props.repositoriesFetch();
  }

  render() {
    return (
      <main>
        <NavBar />
      <div className='container-fluid'>
        <div className='columns'>
          <AvatarList repositories={this.props.repositories}/>
        </div>
      </div></main>
    );
  }
}

const mapStateToProps = state => ({
  repositories: state,
});

const mapDispatchToProps = dispatch => ({
  repositoriesFetch: () => dispatch(repositoriesFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
