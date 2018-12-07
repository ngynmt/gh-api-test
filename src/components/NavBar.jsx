import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, List } from 'semantic-ui-react';
import _ from 'lodash';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  handleClick = ({ index }) => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { navigation, selectPage, createNewPage, selectedItem } = this.props;
    console.log('props', this);
    return (
      <div className="sidebar">
        {
          navigation.map((section, idx) => { // mapping through navBarItems to display headers and sublinks
            const pages = section.pages.map((page, pageIdx) => (
              <div key={`page-${pageIdx}`}>
                <span className={page.title === selectedItem ? 'activeSubItem' : 'subItem'} onClick={() => selectPage(section, page)} onKeyPress={() => selectPage(section, page)}>
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

export default connect(mapStateToProps, {})(NavBar);
