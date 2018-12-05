import React, { Component } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';

import NavBar from './NavBar';
import { MAIN_LINK } from '../constants/routeConstants';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      content: null
    };
  }

  componentDidMount = () => {
    this.checkIfAuthenticated();
    // this.getContent();
  }

  getContent = () => {
    axios.get('https://api.github.com/repos/ngynmt/api-docs-2.0/contents')
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  }

  checkIfAuthenticated = () => {
    const { history } = this.props;
    const githubCode = this.getParameterByName('code');
    githubCode ? this.oAuthUser(githubCode) : history.push(MAIN_LINK);
  }

  oAuthUser = (code) => {
    const config = {
      headers: {
        Origin: 'http://localhost:8080',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Request-Headers': 'Content-Type, Authorization',
        // 'Access-Control-Expose-Headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval'
      }
    };
    // axios.get(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`, config)
    //   .then(res => console.log(res, 'r'))
    //   .catch(err => console.log(err, err.message, err.config, err.code, err.request, err.response, 'err'));
  }

  selectPage = (page) => {
    this.setState({ selectedItem: page });
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

  submitChanges = () => {}

  render() {
    const { selectedItem, content } = this.state;
    return (
      <div>
        <NavBar selectPage={this.selectPage} createNewPage={this.createNewPage} />
        <div className="editor-container">
          <button type="button" onClick={this.submitChanges}>Test Commit and PR</button>
          <div className="editor-here" />
          <div className="preview-here" />
        </div>
      </div>
    );
  }
}

export default Edit;
