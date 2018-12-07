import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
// import fs from 'fs';
import axios from 'axios';
import Markdown from 'react-markdown';
import PrivateKey from '../../env/privateKey';
import keys from '../../env/clientKeys';
// import keys from '../env/synapsefi-api-docs-3-2-editor.2018-12-05.private-key.pem';

import NavBar from '../NavBar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { MAIN_LINK } from '../../constants/routeConstants';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      content: null,
      token: null
    };
  }

  componentDidMount = () => {
    this.checkIfAuthenticated();
    // this.getContent();
    this.generateJWT();
  }

  generateJWT = () => {
    const payload = {
      iat: parseInt(Date.now(), 10),
      exp: parseInt(Date.now(), 10),
      iss: 21907
    };
    const cert = PrivateKey.PRIVATE_KEY; // fs.readFileSync(keys);
    const token = jwt.sign(payload, cert, { algorithm: 'RS256' });
    // this.setState({ token }, () => this.getContent());
  }

  getContent = () => {
    const { token } = this.state;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.machine-man-preview+json'
      }
    };
    axios.get('https://api.github.com/user/repos?type=all')
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  }

  checkIfAuthenticated = () => {
    const { history } = this.props;
    const githubCode = this.getParameterByName('code');
    githubCode ? this.oAuthUser(githubCode) : null;
  }

  oAuthUser = (code) => {
    const config = {
      headers: {
        Origin: 'http://localhost:8080',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Request-Headers': 'Content-Type, Authorization',
        // 'Access-Control-Expose-Headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval'
      }
    };
    axios.get(`https://github.com/login/oauth/access_token?client_id=${keys.CLIENT_ID}&client_secret=${keys.CLIENT_SECRET}&code=${code}`, config)
      .then(res => console.log(res, 'r'))
      .catch(err => console.log(err, err.message, err.config, err.code, err.request, err.response, 'err'));
  }


  createNewPage = () => {
    // todo
  }

  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  submitChanges = () => { }

  render() {
    const { selectedItem, content } = this.state;
    return (
      <div>
        <NavBar createNewPage={this.createNewPage} />
        <div className="content-container">
          {/* <button type="button" onClick={this.submitChanges}>Test Commit and PR</button> */}
          <Editor />
          <Preview />
        </div>
      </div>
    );
  }
}

export default Edit;
