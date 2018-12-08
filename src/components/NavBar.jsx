import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, List } from 'semantic-ui-react';
import _ from 'lodash';

import { updatePageSelected } from '../actions/editActions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      navButtonTxt: 'Close'
    };
  }

  handleClick = ({ index }) => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  toggleNav = () => {
    const { navButtonTxt } = this.state;
    if (navButtonTxt === 'Close') {
      this.setState({ navButtonTxt: 'Open' });
      document.getElementsByClassName('sidebar')[0].style.width = '2.5rem';
    } else {
      this.setState({ navButtonTxt: 'Close' });
      document.getElementsByClassName('sidebar')[0].style.width = '14rem';
    }
  }

  render() {
    const { activeIndex, navButtonTxt } = this.state;
    const { props, props: { navigation, selectedPage, createNewPage } } = this;
    return (
      <div className="sidebar">
        <button type="button" onClick={this.toggleNav}>{navButtonTxt}</button>
        {
          navigation.map((section, idx) => { // mapping through navBarItems to display headers and sublinks
            const pages = section.pages.map((page, pageIdx) => (
              <div key={`page-${pageIdx}`}>
                <span className={page.title === selectedPage.title ? 'activeSubItem' : 'subItem'} onClick={() => props.updatePageSelected(section, page)} onKeyPress={() => props.updatePageSelected(section, page)}>
                  {page.title}
                </span>
                <br />
              </div>
            ));

            const newPage = (
              <div key={`page-${section.pages.length}`}>
                <span className="add-new-button" style={{ color: 'green' }} onClick={() => createNewPage(section.header)} onKeyPress={() => createNewPage(section.header)}>
                  + Add A Page
                </span>
                <br />
              </div>
            );

            pages.push(newPage);
            return (
              <Accordion key={`section-${idx}`}>
                <List.Item>
                  <Accordion.Title
                    active={activeIndex === idx}
                    content={section.header}
                    route={section.route}
                    subItem={section.pages[0]}
                    index={idx}
                    onClick={this.handleClick}
                    icon="dropdown"
                  />
                  <Accordion.Content active={activeIndex === idx} content={pages} />
                </List.Item>
              </Accordion>
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

export default connect(mapStateToProps, { updatePageSelected })(NavBar);
