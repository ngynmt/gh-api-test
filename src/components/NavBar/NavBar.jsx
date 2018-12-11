import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, List } from 'semantic-ui-react';
import _ from 'lodash';

import Modal from '../common/Modal';
import CreatePageModal from './components/CreatePageModal';

import { updatePageSelected } from '../../actions/editActions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalType: null,
      section: null,
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

  openModal = (modalType, section) => {
    this.setState({
      modalOpen: true,
      modalType,
      section
    });
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }

  renderModal = () => {
    const { modalType, section } = this.state;
    return (
      <Modal
        closeModal={this.closeModal}
        modalStyle={{ height: 'fit-content', paddingTop: '4rem', maxWidth: '640px', width: '100vw', maxHeight: '23.5rem' }}
      >
        {modalType === 'add page'
          ? <CreatePageModal section={section} closeModal={this.closeModal} />
          : null
        }
      </Modal>
    );
  }


  render() {
    const { activeIndex, navButtonTxt, modalOpen } = this.state;
    const { props, props: { navigation, selectedPage } } = this;

    const accordionList = (
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
            <span className="add-new-button" style={{ color: 'green', cursor: 'pointer' }} onClick={() => this.openModal('add page', section)} onKeyPress={() => this.openModal('add page', section)}>
              + Add A Page
            </span>
            <br />
          </div>
        );

        pages.push(newPage);
        return (
          <List.Item key={`section-${idx}`}>
            <Accordion.Title
              active={activeIndex === idx}
              content={section.header}
              subItem={section.pages[0]}
              index={idx}
              onClick={this.handleClick}
              icon="dropdown"
            />
            <Accordion.Content active={activeIndex === idx} content={pages} />
          </List.Item>
        );
      })
    );

    return (
      <div className="sidebar">
        <button type="button" onClick={this.toggleNav}>{navButtonTxt}</button>
        <span className="add-new-button" style={{ color: 'green', cursor: 'pointer' }} onClick={() => this.openModal('add section')} onKeyPress={() => this.openModal('add section')}>
          + Add A Section
        </span>
        <Accordion>
          {accordionList}
        </Accordion>
        {modalOpen && this.renderModal()}
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
