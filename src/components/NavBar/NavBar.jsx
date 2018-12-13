import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import _ from 'lodash';

import Modal from '../common/Modal';
import CreateSectionModal from './components/CreateSectionModal';
import CreatePageModal from './components/CreatePageModal';

import { updatePageSelected } from '../../actions/editActions';
import Logo from '../../assets/Logo';
import SecondaryButton from '../common/SecondaryButton';
import PrimaryButton from '../common/PrimaryButton';

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

  openModal = (modalType, section, pageIdx, idx) => {
    this.setState({
      modalOpen: true,
      modalType,
      section,
      pageIdx,
      idx
    });
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }

  renderModal = () => (
    <Modal
      closeModal={this.closeModal}
      modalStyle={{ height: 'fit-content', padding: '2.5rem 3rem', maxWidth: '640px', maxHeight: '23.5rem' }}
    >
      {this.renderModalContent()}
    </Modal>
  );

  renderModalContent = () => {
    const { modalType, section, pageIdx, idx } = this.state;
    switch (modalType) {
      case 'ADD_PAGE':
        return <CreatePageModal section={section} pageIdx={pageIdx} idx={idx} closeModal={() => this.closeModal()} />;
      case 'ADD_SECTION':
        return <CreateSectionModal closeModal={() => this.closeModal()} />;
      case 'ARE_YOU_SURE':
        return (
          <div style={{ width: '25.75rem' }}>
            <p style={{ marginBottom: '3rem' }}>Are you sure you want to leave the current page? Your progress will not be saved.</p>
            <div className="create-page-modal-buttons">
              <SecondaryButton
                txt="Cancel"
                onClick={() => this.closeModal()}
              />
              <PrimaryButton
                txt="Yes, discard changes"
                onClick={() => this.discardChanges()}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  discardChanges = () => {
    const { props } = this;
    const { section, pageIdx, idx } = this.state;
    props.updatePageSelected(section, section.pages[pageIdx], pageIdx, idx);
    this.setState({ modalOpen: false });
  }

  render() {
    const { activeIndex, modalOpen } = this.state;
    const { props, props: { navigation, selectedPage, editsMade } } = this;
    const accordionList = (
      navigation.map((section, idx) => { // mapping through navBarItems to display headers and sublinks
        const pages = section.pages.map((page, pageIdx) => (
          <div key={`page-${pageIdx}`}>
            <span className={page.title === selectedPage.title ? 'activeSubItem' : 'subItem'} onClick={editsMade ? () => this.openModal('ARE_YOU_SURE', section, pageIdx, idx) : () => props.updatePageSelected(section, page, pageIdx, idx)} onKeyPress={editsMade ? () => this.openModal('ARE_YOU_SURE') : () => props.updatePageSelected(section, page, pageIdx, idx)}>
              {page.title}
            </span>
            <br />
          </div>
        ));

        const newPage = (
          <div key={`page-${section.pages.length}`}>
            <span className="add-new-button" style={{ color: '#37EFBA', cursor: 'pointer' }} onClick={() => this.openModal('ADD_PAGE', section, section.pages.length, idx)} onKeyPress={() => this.openModal('ADD_PAGE', section)}>
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

    accordionList.push(
      <Accordion.Title
        style={{ color: '#37EFBA', cursor: 'pointer', pointerEvents: 'initial' }}
        content="+ Add A Section"
        index="section-x"
        onClick={() => this.openModal('ADD_SECTION')}
      />
    );

    return (
      <div className="sidebar">
        <div style={{ margin: '1rem auto 3rem', height: '1rem' }}><Logo /></div>
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
    selectedPage: state.pagesReducer.selectedPage,
    editsMade: state.pagesReducer.editsMade,
  };
}

export default connect(mapStateToProps, { updatePageSelected })(NavBar);
