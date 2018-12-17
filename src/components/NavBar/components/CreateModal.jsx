import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import Input from '../../common/Input';
import PrimaryButton from '../../common/PrimaryButton';
import SecondaryButton from '../../common/SecondaryButton';


import { createSection, createPage } from '../../../actions/createActions';
import { updatePageSelected } from '../../../actions/editActions';


class CreateSectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      renderComponents: false,
      type: 'New Section',
      selected: null,
      header: '',
      title: '',
    };
  }

  createSectionOrPage = (e) => {
    e.preventDefault();
    const { state: { type, selected, header, title }, props } = this;
    const page = {
      title,
      route: `/docs/${title.split(' ').join('-')}`,
      components: []
    };
    const section = selected ? selected.option : { header, pages: [page] };
    if (type === 'New Section') {
      props.createSection(section, page); // create section and page
      props.updatePageSelected(section, page, 0, props.navigation.length); // show created page in editor
    } else {
      props.createPage(section, page); // create page
      props.updatePageSelected(section, page, section.pages.length, selected.idx); // show created page in editor
    }

    props.closeModal();
  }

  setComponents = (type) => {
    this.setState({
      renderComponents: true,
      type,
      selected: null,
      header: '',
      title: ''
    });
  }

  handleDropdownChange = (e, value) => {
    const selected = JSON.parse(value);
    // update selected node on dropdown
    this.setState({ header: selected.option.header, selected });
  }

  renderComponents = () => {
    const { type, title, header, navigation } = this.state;
    // options for dropdown
    const options = navigation.map((option, idx) => ({
      text: option.header,
      value: `{"idx":"${idx}","option":${JSON.stringify(option)}}`
    }));

    const components = [
      <Input
        containerClass="transfer-modal-memo"
        id="page-title-input"
        placeHolder="Title of Page (Ex: API Initialization)"
        onChange={e => this.setState({ title: e.target.value })}
        onSubmit={title.replace(/\s/g, '').length === 0 || header.replace(/\s/g, '').length === 0 ? null : this.createSectionOrPage}
      />
    ];

    const icon = (
      <svg className="rotate-arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11">
        <path className="dropdown-triangle" fill="none" fillRule="evenodd" stroke="#000" d="M7 10.096L12.978.5H1.022L7 10.096z" />
      </svg>
    );

    type === 'New Section'
      ? components.unshift(
        <Input
          containerClass="transfer-modal-memo"
          placeHolder="Section Header (Ex: Resources)"
          onChange={e => this.setState({ header: (e.target.value) })}
          onSubmit={(e) => { e.preventDefault(); document.getElementById('page-title-input').focus(); }}
        />
      )
      : components.unshift(
        <Dropdown
          className="drop-down"
          selection
          text={header || 'Pick a Section'}
          placeholder="Pick a Section"
          icon={icon}
          selectOnBlur={false}
          options={options}
          onChange={(e, { value }) => this.handleDropdownChange(e, value)}
        />
      );
    return components;
  }

  render() {
    const { closeModal } = this.props;
    const { title, header, renderComponents, type } = this.state;

    return (
      <div className="transfer-modal-container">
        <button className="add-new-button" type="button" onClick={() => this.setComponents('New Section')} style={type === 'New Section' ? { fontWeight: 'bold', color: '#37EFBA' } : {}}>+ New Section</button>
        <button className="add-new-button" type="button" onClick={() => this.setComponents('New Page')} style={type === 'New Page' ? { fontWeight: 'bold', color: '#37EFBA' } : {}}>+ New Page</button>

        {this.renderComponents()}

        <div className="create-page-modal-buttons">
          <SecondaryButton
            txt="Cancel"
            type="button"
            onClick={closeModal}
          />
          <PrimaryButton
            txt="Create Page"
            disabled={title.replace(/\s/g, '').length === 0 || header.replace(/\s/g, '').length === 0}
            onClick={this.createSectionOrPage}
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

export default connect(mapStateToProps, { createSection, createPage, updatePageSelected })(CreateSectionModal);
