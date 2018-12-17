import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../common/Input';
import PrimaryButton from '../../common/PrimaryButton';
import SecondaryButton from '../../common/SecondaryButton';


import { updatePageSelected, updateSectionHeader } from '../../../actions/editActions';


class EditDeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: props.idx,
      section: props.section,
      header: props.section.header,
    };
  }

  updateSectionHeader = () => {
    const { state: { header, idx }, props } = this;
    props.updateSectionHeader(header, idx);
    props.closeModal();
  }

  deleteSection = () => {
    const { state: { section }, props } = this;
    // TODO
  }

  render() {
    const { header } = this.state;
    const { closeModal } = this.props;

    return (
      <div className="transfer-modal-container">
        <Input
          containerClass="transfer-modal-memo"
          labelTxt="Page Title"
          defaultValue={header}
          onChange={e => this.setState({ header: e.target.value })}
          onSubmit={header.replace(/\s/g, '').length === 0 ? null : this.updateSectionHeader}
        />
        <div className="create-page-modal-buttons">
          <SecondaryButton
            txt="Cancel"
            type="button"
            onClick={closeModal}
          />
          <PrimaryButton
            txt="Save Changes"
            disabled={header.replace(/\s/g, '').length === 0}
            onClick={this.updateSectionHeader}
          />
        </div>
        <PrimaryButton
          txt="Delete Page"
          className="delete-button"
          type="button"
          style={{
            backgroundColor: '#ff5757',
            border: '1px solid #ff5757',
            width: '100%'
          }}
          onClick={this.deleteSection}
        />
      </div>
    );
  }
}

export default connect(null, { updateSectionHeader, updatePageSelected })(EditDeleteModal);
