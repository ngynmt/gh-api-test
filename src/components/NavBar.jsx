import React, { Component } from 'react';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, selectPage, createNewPage, selectedPage } = this.props;
    return (
      <div className="sidebar">
        {navigation.map((section, idx) => {
          const pages = section.pages.map((page, pageIdx) => <p key={`page-${pageIdx}`} style={selectedPage.title === page.title ? { fontWeight: 'bold' } : {}}>{page.title}</p>);
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
    navigation: state.pagesReducer.navigation,
    selectedPage: state.pagesReducer.selectedPage
  };
}

export default connect(mapStateToProps, {})(NavBar);
