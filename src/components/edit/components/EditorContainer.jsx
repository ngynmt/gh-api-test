import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';
import _ from 'lodash';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/github';
import { updateComponentContent, updateCodeBlock, addCodeBlockTab, removeCodeBlockTab, switchComponents } from '../../../actions/editActions';

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    const { selectedComponent } = this.props;
    this.state = {
      value: selectedComponent.type === 'MARKDOWN' ? selectedComponent.content : null,
      // value: selectedComponent.type === 'MARKDOWN' ? Plain.deserialize(selectedComponent.content) : null,
      tabs: selectedComponent.type === 'CODEBLOCK' ? selectedComponent : null
    };
  }

  componentDidMount = () => {
    const { selectedComponent } = this.props;
    selectedComponent.type === 'CODEBLOCK' ? this.setState({ tabs: selectedComponent }) : null;
  }

  componentDidUpdate = (prevProps) => {
    const { selectedComponent, lastUpdatedBy } = this.props;
    if (prevProps.selectedComponent !== selectedComponent) {
      // import selected component information only when coming from preview for markdown components
      lastUpdatedBy !== 'EDITOR' && selectedComponent.type === 'MARKDOWN' ? this.setState({ value: selectedComponent.content }) : null;
      // lastUpdatedBy !== 'EDITOR' && selectedComponent.type === 'MARKDOWN' ? this.setState({ value: Plain.deserialize(selectedComponent.content) }) : null;
      // update when tabs are added/removed/modified
      selectedComponent.type === 'CODEBLOCK' ? this.setState({ tabs: selectedComponent }) : null;
    }
  }

  closeSideBar = () => {
    document.getElementsByClassName('sidebar')[0].style.width = '0';
  };

  renderMarkdownEditor = () => {
    // <Editor className="md-editor" value={value} onChange={this.updateMarkdown} onKeyDown={this.onKeyDown} onFocus={this.closeSideBar} />
    const { value } = this.state;
    return (
      <AceEditor
        mode="markdown"
        theme="github"
        onChange={e => this.updateAceMarkdown(e)}
        name="ace-edit-div"
        width="100%"
        height="85vh"
        showPrintMargin={false}
        value={value}
        // editorProps={{ $blockScrolling: true }}
      />
    );
  }

  updateAceMarkdown = (value) => {
    const { props } = this;
    const { selectedComponent } = this.props;
    this.setState({ value });
    if (selectedComponent.content !== value) {
      // if updates were made, show the save changes button
      props.updateComponentContent(value, 'EDITOR');
    }
  }

  onKeyDown = (event, editor, next) => {
    // Return with no changes if the keypress is not '&'
    if (event.key !== '&') return next();
    // Prevent the ampersand character from being inserted.
    event.preventDefault();
    // Change the value by inserting 'and' at the cursor's position.
    editor.insertText('and');
    return true;
  }

  updateMarkdown = ({ value }) => {
    const { props } = this;
    const { selectedComponent } = this.props;
    // Plain.serialize turns the markdown dom element to a string value to store it in redux
    const plainText = Plain.serialize(value);
    this.setState({ value });
    if (selectedComponent.content !== plainText) {
      // if updates were made, show the save changes button
      props.updateComponentContent(plainText, 'EDITOR');
    }
  }

  handleLanguageChange = (e, idx) => {
    // updates language for specific tab on codeblock
    const { props } = this;
    props.updateCodeBlock(e.target.value, 'EDITOR', 'language', idx);
  }

  updateSnippet = (e, idx) => {
    // updates snippet for specific tab on codeblock
    const { props } = this;
    props.updateCodeBlock(e, 'EDITOR', 'content', idx);
  }

  addTab = () => {
    // adds a tab on codeblock
    const { props } = this;
    props.addCodeBlockTab({
      language: 'javascript',
      content: ''
    }, 'EDITOR');
  }

  removeTab = (idx) => {
    // removes tab by index on codeblock
    const { props } = this;
    props.removeCodeBlockTab(idx, 'EDITOR');
  }

  renderCodeblockEditor = () => {
    const { tabs } = this.state;
    const languages = ['javascript', 'php', 'python', 'ruby'];
    return (
      <div className="codeblock-editor">
        {tabs && tabs.content.map((tab, idx) => (
          <div className="codeblock-editor-tab" key={`tab-${idx}-${tab.language}-${tab.content}`}>
            {tabs.content.length > 1 ? <div className="codeblock-remove-tab" onClick={() => this.removeTab(idx)} onKeyPress={() => this.removeTab(idx)}>x</div> : null}
            <label htmlFor={`language-${idx}`}>
              language
              <select defaultValue={tab.language} onChange={e => this.handleLanguageChange(e, idx)}>
                {languages.map((language, langIdx) => <option key={`${idx}-lang-${langIdx}`} value={language}>{language}</option>)}
              </select>
            </label>
            <label htmlFor={`snippet-${idx}`}>
              snippet
              <textarea onChange={_.flowRight(_.debounce(e => this.updateSnippet(e, idx), 1000, { leading: false, trailing: true }), _.property('target.value'))} id={`snippet-${idx}`} rows={8} defaultValue={tab.content} />
            </label>
          </div>
        ))}
        <div className="codeblock-add-tab" onClick={this.addTab} onKeyPress={this.addTab}>+</div>
      </div>
    );
  }

  saveChanges = () => {
    // TODO
    // update page + main list + pages to add
  }

  render() {
    const { selectedComponent } = this.props;
    return (
      <div className="editor-container" style={selectedComponent.type === 'MARKDOWN' ? { border: '1px solid #EEE' } : {}}>
        {selectedComponent.type === 'MARKDOWN' ? this.renderMarkdownEditor() : this.renderCodeblockEditor()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.pagesReducer.navigation,
    selectedPage: state.pagesReducer.selectedPage,
    lastUpdatedBy: state.pagesReducer.lastUpdatedBy,
    selectedComponent: state.pagesReducer.selectedComponent
  };
}


export default withRouter(connect(mapStateToProps, { updateComponentContent, updateCodeBlock, addCodeBlockTab, removeCodeBlockTab, switchComponents })(EditorContainer));
