import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';

import { followersFetchRequest } from '../../actions/repositories-fetch';
import 'react-bootstrap/lib/ModalHeader';

class AvatarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      error: false,
      errorText: '',
    };
  }

  componentDidMount() {
    const { repository, followersFetch } = this.props;

    followersFetch(repository.ownerLogin)
      .then((res) => {
        this.setState({ user: res });
      })
      .catch((err) => {
        if (err.message && err.message.startsWith('API')) {
          this.setState({
            error: true,
            errorText: 'API rate limit exceeded for your IP address.',
          });
        }
      });
  }

  render() {
    const { show, repository, onHide } = this.props;
    const { user, error, errorText } = this.state;

    return (
      <Modal show={show} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
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
                {error
                  ? <Alert variant='warning'>{errorText}</Alert>
                  : <ul>
                    {user.name ? <li><strong>Name:</strong> {user.name}</li> : null}
                    {user.company ? <li><strong>Company:</strong> {user.company}</li> : null}
                    <li><strong>Followers:</strong> {user.followers}</li>
                    <li><strong>Following:</strong> {user.following}</li>
                    {user.location ? <li><strong>Location:</strong> {user.location}</li> : null}
                    {user.public_repos
                      ? <li><strong>Public Repos:</strong> {user.public_repos}</li>
                      : null}
                  </ul>}
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
