import React, { Component } from 'react';
import { connect } from 'react-redux';
import { repositoriesFetchRequest } from '../../actions/repositories-fetch';
import AvatarCard from '../avatar-card/AvatarCard';

class AvatarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
    };
  }

  render() {
    const { repositories } = this.props;

    return (
      <div className='avatar-list'>
        {repositories.length !== 0
          ? repositories.map((repo, i) => {
            return <AvatarCard repository={repo} key={i} />;
          })
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repositories: state,
});

const mapDispatchToProps = dispatch => ({
  repositoriesFetch: () => dispatch(repositoriesFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarList);
