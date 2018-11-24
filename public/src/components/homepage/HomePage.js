import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import { repositoriesFetchRequest, repositoriesBackupFetchRequest } from '../../actions/repositories-fetch';
import AvatarList from '../avatar-list/AvatarList';
import NavBar from '../navbar/NavBar';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorText: '',
    };
    this.loadBackup = this.loadBackup.bind(this);
  }

  componentDidMount() {
    return this.props.repositoriesFetch()
      .then((res) => {
        if (res.message && res.message.startsWith('API')) {
          this.setState({
            error: true,
            errorText: 'API rate limit exceeded for your IP address.',
          });
        }
      });
  }

  loadBackup() {
    return this.props.repositoriesBackupFetch()
      .then(() => this.setState({ error: false }));
  }

  render() {
    const { error, errorText } = this.state;

    return (
      <main>
        <NavBar />
        <div className='container-fluid'>
          <div className='columns'>
            {error
              ? <Fragment>
                  <Alert variant='warning'>{errorText}</Alert>
                  <Button onClick={this.loadBackup} variant='outline-primary'>Load Local Repositories</Button>
                </Fragment>
              : <AvatarList repositories={this.props.repositories}/>}
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  repositories: state,
});

const mapDispatchToProps = dispatch => ({
  repositoriesFetch: () => dispatch(repositoriesFetchRequest()),
  repositoriesBackupFetch: () => dispatch(repositoriesBackupFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
