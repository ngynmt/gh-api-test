import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import PrivateKey from '../../env/privateKey';
import keys from '../../env/clientKeys';
import Header from '../Header';
import NavBar from '../NavBar/NavBar';
import { saveChanges } from '../../actions/editActions';
import EditorContainer from './components/EditorContainer';
import Preview from './components/Preview';
import { MAIN_LINK } from '../../constants/routeConstants';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      isOpen: true,
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

  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  submitChanges = () => {
    // todo: warning modal - does not persist changes until PR
    // save changes to main list
    const { props } = this;
    const { selectedPage } = this.props;
    props.saveChanges(selectedPage);
  }

  toggleSideBar = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      document.getElementsByClassName('sidebar')[0].style.width = '0';
      document.getElementsByClassName('main-page')[0].style.left = '0';
    } else {
      document.getElementsByClassName('sidebar')[0].style.width = '19rem';
      document.getElementsByClassName('main-page')[0].style.left = '19rem';
    }
    this.setState({ isOpen: !isOpen });
  };

  closeSideBar = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      document.getElementsByClassName('sidebar')[0].style.width = '0';
      document.getElementsByClassName('main-page')[0].style.left = '0';
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { props } = this;
    const { selectedItem, isOpen } = this.state;
    const { editsMade, selectedPage } = this.props;
    return (
      <div style={{ overflow: 'hidden' }}>
        <NavBar />
        <div className="main-page">
          <Header className="header-content" toggleSideBar={() => this.toggleSideBar()} isOpen={isOpen} />
          <div className="content-container" onClick={() => this.closeSideBar()} onKeyPress={() => this.closeSideBar()}>
            {/* <button type="button" onClick={this.submitChanges}>Test Commit and PR</button> */}
            <div className="editor-wrapper">
              <EditorContainer selectedItem={selectedItem} />
            </div>
            <div className="preview-wrapper">
              <Preview />
            </div>
          </div>
          <div className="save-changes">
            <button type="button" style={editsMade ? {} : { display: 'none' }} onClick={() => props.saveChanges(selectedPage)} onKeyPress={() => props.saveChanges(selectedPage)}>save changes</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedPage: state.pagesReducer.selectedPage,
    editsMade: state.pagesReducer.editsMade
  };
}

export default connect(mapStateToProps, { saveChanges })(Edit);
