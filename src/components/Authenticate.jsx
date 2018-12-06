import React, { Component } from 'react';
import { EDIT_LINK } from '../constants/routeConstants';
import keys from '../env/clientKeys';

class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // const { history } = this.props;
    // history.push(EDIT_LINK);
    this.sendToGithub();
  }

  sendToGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${keys.CLIENT_ID}`;
  }

  render() {
    return (
      <div />
    );
  }
}

export default Authenticate;
