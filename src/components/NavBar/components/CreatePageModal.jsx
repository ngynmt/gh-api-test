import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../common/Input';
import PrimaryButton from '../../common/PrimaryButton';
import SecondaryButton from '../../common/SecondaryButton';


import { createPage } from '../../../actions/createActions';
import { updatePageSelected } from '../../../actions/editActions';


class CreatePageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIdx: props.pageIdx,
      idx: props.idx,
      section: props.section,
      title: '',
    };
  }

  createPage = (e) => {
    e.preventDefault();
    const { state: { section, title, pageIdx, idx }, props } = this;
    const page = {
      title,
      route: `/docs/${title.split(' ').join('-')}`,
      components: []
    };
    props.createPage(section, page); // create page
    props.updatePageSelected(section, page, pageIdx, idx); // show created page in editor
    props.closeModal();
  }

  render() {
    const { closeModal } = this.props;
    const { title } = this.state;
    return (
      <div className="transfer-modal-container">
        <Input
          containerClass="transfer-modal-memo"
          placeHolder="Title of Page (Ex: API Initialization)"
          onChange={e => this.setState({ title: e.target.value })}
          onSubmit={title.replace(/\s/g, '').length === 0 ? null : this.createPage}
        />
        <div className="create-page-modal-buttons">
          <SecondaryButton
            type="button"
            txt="Cancel"
            onClick={closeModal}
          />
          <PrimaryButton
            txt="Create Page"
            disabled={title.replace(/\s/g, '').length === 0}
            onClick={this.createPage}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { createPage, updatePageSelected })(CreatePageModal);
