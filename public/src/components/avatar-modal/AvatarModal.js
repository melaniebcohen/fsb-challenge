import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import { followersFetchRequest } from '../../actions/repositories-fetch';

class AvatarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: '',
    };
  }

  componentDidMount() {
    const { repository, followersFetch } = this.props;

    followersFetch(repository.ownerLogin)
      .then((res) => {
        console.log(res);
        this.setState({ followers: res.body.length });
      });
  }

  render() {
    const { show, repository, onHide } = this.props;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{repository.ownerLogin}</Modal.Title>
          <Modal.Body>
            {repository.ownerId}
            {this.state.followers}
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  followersFetch: userLogin => dispatch(followersFetchRequest(userLogin)),
});

export default connect(null, mapDispatchToProps)(AvatarModal);
