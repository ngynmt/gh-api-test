import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import _ from 'lodash';

import Modal from '../common/Modal';
import CreateSectionModal from './components/CreateSectionModal';
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
    };
  }

  handleClick = ({ index }) => {
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  }

  collapseNav = () => {
    document.getElementsByClassName('sidebar')[0].style.width = '0';
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
          : <CreateSectionModal closeModal={this.closeModal} />
        }
      </Modal>
    );
  }


  render() {
    const { activeIndex, modalOpen } = this.state;
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
        return [
          <Accordion.Title
            active={activeIndex === idx}
            content={section.header}
            subItem={section.pages[0]}
            index={idx}
            onClick={this.handleClick}
            icon="dropdown"
          />,
          <Accordion.Content active={activeIndex === idx} content={pages} />
        ];
      })
    );

    accordionList.unshift(
      <Accordion.Title
        style={{ color: 'green', cursor: 'pointer' }}
        content="+ Add A Section"
        index="section-x"
        onClick={() => this.openModal('add section')}
      />
    );

    return (
      <div className="sidebar">
        <div className="close" onClick={this.collapseNav} onKeyPress={this.collapseNav} style={{ top: '0', right: '15px' }} />
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
