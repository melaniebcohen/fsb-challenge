import React, { Component } from 'react';
import { connect } from 'react-redux';
import AvatarCard from '../avatar-card/AvatarCard';
import { repositoriesFetchRequest } from '../../actions/repositories-fetch';

class AvatarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
    };
    this.eliminateDuplicates = this.eliminateDuplicates.bind(this);
  }

  // componentDidMount() {
  //   return this.props.repositoriesFetch();
  // }

  // componentDidUpdate(prevProps) {
  //   this.props.repositories !== prevProps.repositories
  //     ? this.setState({ repositories: this.props.repositories })
  //     : null;
  // }

  eliminateDuplicates() {
    // const { repositories } = this.state;

    // repositories.forEach((repo) => {
    //   console.log(repo.id)
    // })


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
