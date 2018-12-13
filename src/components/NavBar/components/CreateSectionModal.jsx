import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../common/Input';
import PrimaryButton from '../../common/PrimaryButton';
import SecondaryButton from '../../common/SecondaryButton';


import { createSection } from '../../../actions/createActions';
import { updatePageSelected } from '../../../actions/editActions';


class CreateSectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: '',
      title: '',
    };
  }

  createSection = (e) => {
    const { state: { header, title }, props } = this;
    e.preventDefault();
    const page = {
      title,
      route: `/docs/${title.split(' ').join('-')}`,
      components: []
    };
    const section = {
      header,
      pages: [page]
    };

    props.createSection(section, page); // create section and page
    props.updatePageSelected(section, page, 0, props.navigation.length); // show created page in editor
    props.closeModal();
  }

  render() {
    const { closeModal } = this.props;
    const { title, header } = this.state;
    return (
      <div className="transfer-modal-container">
        <Input
          containerClass="transfer-modal-memo"
          placeHolder="Section Header (Ex: Resources)"
          onChange={e => this.setState({ header: (e.target.value) })}
          onSubmit={(e) => { e.preventDefault(); document.getElementById('page-title-input').focus(); }}
        />
        <Input
          containerClass="transfer-modal-memo"
          id="page-title-input"
          placeHolder="Title of Page (Ex: API Initialization)"
          onChange={e => this.setState({ title: e.target.value })}
          onSubmit={title.replace(/\s/g, '').length === 0 || header.replace(/\s/g, '').length === 0 ? null : this.createSection}
        />
        <div className="create-page-modal-buttons">
          <SecondaryButton
            txt="Cancel"
            type="button"
            onClick={closeModal}
          />
          <PrimaryButton
            txt="Create Page"
            disabled={title.replace(/\s/g, '').length === 0 || header.replace(/\s/g, '').length === 0}
            onClick={this.createSection}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.pagesReducer.navigation,
  };
}

export default connect(mapStateToProps, { createSection, updatePageSelected })(CreateSectionModal);
