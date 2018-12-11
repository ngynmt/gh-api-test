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

  createSection = () => {
    const { state: { header, title }, props } = this;
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
    props.updatePageSelected(section, page); // show created page in editor
    props.closeModal();
  }

  render() {
    const { closeModal } = this.props;
    return (
      <div className="transfer-modal-container">
        <Input
          containerClass="transfer-modal-memo"
          labelTxt="Section Header (Ex: Resources)"
          onChange={e => this.setState({ header: (e.target.value) })}
        />
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
            onClick={this.createSection}
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

export default connect(mapStateToProps, { createSection, updatePageSelected })(CreateSectionModal);
