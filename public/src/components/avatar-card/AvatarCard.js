import React, { Component, Fragment } from 'react';
import Card from 'react-bootstrap/lib/Card';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import AvatarModal from '../avatar-modal/AvatarModal';

class AvatarCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { ownerAvatar } = this.props.repository;
    const { repository } = this.props;
    const { modalOpen } = this.state;

    return (
      <Fragment>
        {repository.followers
          ? <OverlayTrigger
              placement='bottom'
              overlay={
                <Tooltip id='tooltip'>
                  {repository.ownerLogin}'s followers:
                  <ul>
                    {repository.followers.map((follower, i) => <li key={i}>{follower}</li>)}
                  </ul>.
                </Tooltip>}>

              <Card onClick={this.handleOpen}>
                <div id='overlay' />
                <Card.Img variant='top' src={ownerAvatar} />
              </Card>
            </OverlayTrigger>
          : <Card onClick={this.handleOpen}>
              <div id='overlay' />
              <Card.Img variant='top' src={ownerAvatar} />
            </Card>}

        {modalOpen
          ? <AvatarModal
            show={modalOpen}
            repository={repository}
            onHide={this.handleClose}/>
          : null}
      </Fragment>
    );
  }
}

export default AvatarCard;
