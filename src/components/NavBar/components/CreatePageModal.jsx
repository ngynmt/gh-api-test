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
      section: props.section,
      title: '',
    };
  }

  createPage = () => {
    const { state: { section, title }, props } = this;
    const page = {
      title,
      route: `/docs/${title.split(' ').join('-')}`,
      components: []
    };
    props.createPage(section, page); // create page
    props.updatePageSelected(section, page); // show created page in editor
    props.closeModal();
  }

  render() {
    const { closeModal } = this.props;
    return (
      <div className="transfer-modal-container">
        <Input
          containerClass="transfer-modal-memo"
          labelTxt="Title of Page (Ex: API Initialization)"
          onChange={e => this.setState({ title: (e.target.value) })}
        />
        <div className="create-page-modal-buttons">
          <SecondaryButton
            txt="Cancel"
            onClick={closeModal}
          />
          <PrimaryButton
            txt="Create Page"
            onClick={this.createPage}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, { createPage, updatePageSelected })(CreatePageModal);
