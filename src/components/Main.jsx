import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import Navbar from './NavBar';

// this component is not yet being used.
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {/* <Navbar /> */}
        {children}
      </Fragment>
    );
  }
}

export default withRouter(connect(null, {})(Main));
