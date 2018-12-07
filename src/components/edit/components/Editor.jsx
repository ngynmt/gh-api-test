import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactMDE from 'react-mde';
// import 'react-mde/lib/styles/css/react-mde-all.css';
import _ from 'lodash';
import { updatePageComponent, updateComponentContent } from '../../../actions/editActions';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMarkdownEditor = () => {
    const { selectedComponent } = this.props;
    return (
      <ReactMDE
        onChange={_.flowRight(_.debounce(e => this.updateMarkdown(e), 1000, { leading: false, trailing: true }), _.property('target.value'))}
        value={selectedComponent.content}
      />
    );
  }

  updateMarkdown = (e) => {
    const { props } = this;
    props.updateComponentContent(e);
  }

  handleLanguageChange = (e, idx) => {
    // updates language for specific tab on codeblock
    const { props } = this;
    const { selectedComponent } = this.props;
    const newContent = selectedComponent.content;
    const snippet = selectedComponent.content[idx].snippet;
    newContent.splice(idx, 1, {
      language: e.target.value,
      snippet
    });
    props.updateComponentContent(newContent);
  }

  updateSnippet = (e, idx) => {
    // updates snippet for specific tab on codeblock
    const { props } = this;
    const { selectedComponent } = this.props;
    const newContent = selectedComponent.content;
    const language = selectedComponent.content[idx].language;
    newContent.splice(idx, 1, {
      snippet: e,
      language
    });
    props.updateComponentContent(newContent);
  }

  addTab = () => {
    // adds a tab on codeblock
    const { props } = this;
    const { selectedComponent } = this.props;
    const newContent = selectedComponent.content;
    newContent.push({
      language: 'javascript',
      snippet: ''
    });
    props.updateComponentContent(newContent);
  }

  removeTab = (idx) => {
    // removes tab by index on codeblock
    const { props } = this;
    const { selectedComponent } = this.props;
    const newContent = selectedComponent.content;
    newContent.splice(idx, 1);
    props.updateComponentContent(newContent);
  }

  renderCodeblockEditor = () => {
    const { selectedComponent } = this.props;
    const languages = ['javascript', 'php', 'python', 'ruby'];
    return (
      <div className="codeblock-editor">
        {selectedComponent.content.map((tab, idx) => (
          <div className="codeblock-editor-tab" key={`tab-${idx}-${tab.language}-${tab.snippet}`}>
            { selectedComponent.content.length > 1 ? <div className="codeblock-remove-tab" onClick={() => this.removeTab(idx)} onKeyPress={() => this.removeTab(idx)}>x</div> : null}
            <label htmlFor={`language-${idx}`}>
              language
              <select defaultValue={selectedComponent.content[idx].language} onChange={e => this.handleLanguageChange(e, idx)}>
                {languages.map((language, langIdx) => <option key={`${idx}-lang-${langIdx}`} value={language}>{language}</option>)}
              </select>
            </label>
            <label htmlFor={`snippet-${idx}`}>
              snippet
              <textarea onChange={_.flowRight(_.debounce(e => this.updateSnippet(e, idx), 1000, { leading: false, trailing: true }), _.property('target.value'))} id={`snippet-${idx}`} rows={8} defaultValue={tab.snippet} />
            </label>
          </div>
        ))}
        <div className="codeblock-add-tab" onClick={this.addTab} onKeyPress={this.addTab}>+</div>
      </div>
    );
  }

  updatePreview = (e) => {
    // TODO
  }

  render() {
    const { selectedComponent } = this.props;
    return (
      <div className="editor-container">
        {selectedComponent.type === 'MARKDOWN' ? this.renderMarkdownEditor() : this.renderCodeblockEditor()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.pagesReducer.navigation,
    selectedPage: state.pagesReducer.selectedPage,
    selectedComponent: state.pagesReducer.selectedComponent
  };
}


export default withRouter(connect(mapStateToProps, { updatePageComponent, updateComponentContent })(Editor));
