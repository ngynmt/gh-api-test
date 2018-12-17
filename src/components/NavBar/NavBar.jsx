import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Icon } from 'semantic-ui-react';
import _ from 'lodash';

import Modal from '../common/Modal';
import CreateModal from './components/CreateModal';
import EditDeleteModal from './components/EditDeleteModal';

import { updatePageSelected, switchSections, switchPages } from '../../actions/editActions';
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
      next: false
    };
  }

  handleClick = (e, titleProps) => {
    // const { props } = this;
    const { index, subItem, section } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
    // props.updatePageSelected(section, subItem, 0, 0);
  }

  collapseNav = () => {
    document.getElementsByClassName('sidebar')[0].style.width = '0';
  }

  openModal = (modalType, section, idx, pageIdx, next) => {
    this.setState({
      modalOpen: true,
      modalType,
      section,
      pageIdx,
      idx,
      next
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
      modalStyle={{ padding: '3rem' }}
    >
      {this.renderModalContent()}
    </Modal>
  );

  renderModalContent = () => {
    const { modalType, section, idx } = this.state;
    const { navigation } = this.props;
    switch (modalType) {
      case 'EDIT_DELETE_MODAL':
        return <EditDeleteModal section={section} idx={idx} closeModal={() => this.closeModal()} />;
      case 'CREATE_MODAL':
        return <CreateModal navigation={navigation} closeModal={() => this.closeModal()} />;
      case 'ARE_YOU_SURE':
        return (
          <div style={{ width: '25.75rem' }}>
            <p style={{ marginBottom: '3rem' }}>Are you sure you want to leave the current page? Your progress will not be saved.</p>
            <div className="create-page-modal-buttons">
              <SecondaryButton
                txt="Cancel"
                type="button"
                onClick={() => this.closeModal()}
              />
              <PrimaryButton
                txt="Yes, discard changes"
                onClick={e => this.discardChanges(e)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  discardChanges = (e) => {
    // overwrites existing changes on current page and pushes next page selection
    const { props } = this;
    const { section, idx, pageIdx, next } = this.state;
    e.preventDefault();
    next ? this.openModal(next, section, idx, pageIdx, false) : this.setState({ modalOpen: false }, () => props.updatePageSelected(section, section.pages[pageIdx], pageIdx, idx));
  }

  render() {
    const { activeIndex, modalOpen } = this.state;
    const { props, props: { navigation, selectedPage, editsMade } } = this;
    const accordionList = (
      navigation.map((section, idx) => { // mapping through navBarItems to display headers and sublinks
        const pages = section.pages.map((page, pageIdx) => (
          <div className="page" key={`page-${pageIdx}`}>
            <span className={page.title === selectedPage.title ? 'activeSubItem' : 'subItem'} onClick={editsMade ? () => this.openModal('ARE_YOU_SURE', section, idx, pageIdx) : () => props.updatePageSelected(section, page, pageIdx, idx)} onKeyPress={editsMade ? () => this.openModal('ARE_YOU_SURE') : () => props.updatePageSelected(section, page, pageIdx, idx)}>
              {page.title}
            </span>
            <div className="component-buttons">
              {pageIdx !== 0 ? <button className="action-arrow" type="button" onClick={() => props.switchPages(idx, pageIdx, pageIdx - 1)}>&#8593;</button> : null}
              {pageIdx !== section.pages.length - 1 ? <button className="action-arrow" type="button" onClick={() => props.switchPages(idx, pageIdx, pageIdx + 1)}>&#8595;</button> : null}
            </div>
          </div>
        ));

        return (
          <div className="section" key={`section${idx}`}>
            <Accordion.Title
              active={activeIndex === idx}
              // content={section.header}
              subItem={section.pages[0]}
              index={idx}
              onClick={this.handleClick}
            >
              <span style={{ display: 'flex' }}>
                <Icon style={{ paddingTop: '5px' }} name="dropdown" />
                <span>{section.header}</span>
              </span>
              <span className="component-buttons">
                {idx !== 0 ? <button className="action-arrow" type="button" onClick={() => props.switchSections(idx, idx - 1)}>&#8593;</button> : null}
                {idx !== section.pages.length - 1 ? <button className="action-arrow" type="button" onClick={() => props.switchSections(idx, idx + 1)}>&#8595;</button> : null}
                <button type="button" style={{ paddingLeft: '5px' }} className="action-arrow" onClick={() => this.openModal('EDIT_DELETE_MODAL', section, idx)}> <i className="fa fa-edit" /></button>
              </span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === idx} content={pages} />
          </div>
        );
      })
    );

    accordionList.push(
      <Accordion.Title
        key="section-x"
        className="add-section-button"
        // content="+ New Section/Page"
        index="section-x"
        onClick={editsMade ? () => this.openModal('ARE_YOU_SURE', null, null, null, 'CREATE_MODAL') : () => this.openModal('CREATE_MODAL')}
      >
        <Icon name="blind" />
        New Section/Page
      </Accordion.Title>
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

export default connect(mapStateToProps, { updatePageSelected, switchSections, switchPages })(NavBar);
