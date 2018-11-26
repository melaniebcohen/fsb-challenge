import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/lib/Alert';
import ReactLoading from 'react-loading';
import { repositoriesFetchRequest } from '../../actions/repositories-fetch';
import AvatarList from '../avatar-list/AvatarList';
import NavBar from '../navbar/NavBar';
// this._isMounted taken from example here:
// https://medium.freecodecamp.org/how-to-work-with-react-the-right-way-to-avoid-some-common-pitfalls-fc9eb5e34d9e

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorText: '',
      loading: true,
    };
    this._isMounted = false;
    this.fetchRepositories = this.fetchRepositories.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchRepositories();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchRepositories() {
    return this.props.repositoriesFetch()
      .then((res) => {
        if (this._isMounted && res.message && res.message.startsWith('API')) {
          this.setState({
            loading: false,
            error: true,
            errorText: 'API rate limit exceeded for your IP address.',
          });
        } else if (this._isMounted) {
          this.setState({ loading: false });
        }
      });
  }

  render() {
    const { repositories } = this.props;
    const { error, errorText, loading } = this.state;

    if (loading) {
      return (
        <main>
          <NavBar />
          <div className='container-fluid'>
            <ReactLoading className='spinner' type={'spin'} color={'#33006f'} height={'10%'} />
          </div>
        </main>
      );
    }

    return (
      <main>
        <NavBar />
        <div className='container-fluid'>
          <div className='columns'>
            {error
              ? <Alert variant='warning'>{errorText}</Alert>
              : <AvatarList repositories={repositories}/>}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
