import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/lib/Alert';
import ReactLoading from 'react-loading';
import { repositoriesFetchRequest } from '../../actions/repositories-fetch';
import AvatarList from '../avatar-list/AvatarList';
import NavBar from '../navbar/NavBar';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorText: '',
      loading: true,
    };
  }

  componentDidMount() {
    return this.props.repositoriesFetch()
      .then((res) => {
        if (res.message && res.message.startsWith('API')) {
          this.setState({
            loading: false,
            error: true,
            errorText: 'API rate limit exceeded for your IP address.',
          });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  render() {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
