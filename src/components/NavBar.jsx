import React, { Component } from 'react';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, selectPage, createNewPage } = this.props;
    return (
      <div className="navbar">
        {navigation.map((section, idx) => {
          const pages = section.pages.map((page, pageIdx) => <p key={`page-${pageIdx}`}>{page.title}</p>);
          return (
            <div key={`section-${idx}`}>
              <div className="header-container">
                <p>{section.header}</p>
                <div className="add-new-button" onClick={() => createNewPage(section.header)} onKeyPress={() => createNewPage(section.header)}>+</div>
              </div>
              <div onClick={() => selectPage(section.header)} onKeyPress={() => selectPage(section.header)}>{pages}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.pagesReducer.navigation
  };
}

export default connect(mapStateToProps, {})(NavBar);
