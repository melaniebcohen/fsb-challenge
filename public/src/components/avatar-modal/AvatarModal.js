import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { followersFetchRequest } from '../../actions/repositories-fetch';
import 'react-bootstrap/lib/ModalHeader';

class AvatarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    const { repository, followersFetch } = this.props;

    followersFetch(repository.ownerLogin)
      .then((res) => {
        console.log(res);
        this.setState({ user: res });
      });
  }

  render() {
    const { show, repository, onHide } = this.props;
    const { user } = this.state;

    return (
      <Modal 
        show={show} 
        onHide={onHide} 
        size='lg' 
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {repository.ownerLogin}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className='show-grid'>
              <Col xs={3} md={3}>
                <img src={repository.ownerAvatar} style={{ width: '100%' }}/>
              </Col>
              <Col xs={9} md={9}>
                <ul>
                  <li>Name: {user.name}</li>
                  <li>Company: {user.company}</li>
                  <li>Followers: {user.followers}</li>
                  <li>Following: {user.following}</li>
                  <li>Location: {user.location}</li>
                  <li>Public Repos: {user.public_repos}</li>

                </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  followersFetch: userLogin => dispatch(followersFetchRequest(userLogin)),
});

export default connect(null, mapDispatchToProps)(AvatarModal);
