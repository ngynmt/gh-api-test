import React, { Component } from 'react';
import Markdown from 'react-markdown';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import { updatePageComponent } from '../../../actions/editActions';
import CodeBlock from './CodeBlock';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate = (prevProps) => {
    const { selectedComponent, lastUpdatedBy } = this.props;
    if (lastUpdatedBy === 'EDITOR' && selectedComponent.type === 'CODEBLOCK' && prevProps.selectedComponent.content !== selectedComponent.content) {
      this.forceUpdate();
      // const current = document.getElementById(`codeblock-${selectedComponent.content[0].language}-${selectedComponent.content[0].content}`); // eslint-disable-line
      // this.initializeHighlightJS(current);
    //   selectedComponent.type === 'MARKDOWN' ? this.setState({ value: Plain.deserialize(selectedComponent.content) }) : this.setState({ tabs: selectedComponent });
    }
  }

  initializeHighlightJS = (node) => {
    // add highlightjs to codeblock component
    // const current = ReactDOM.findDOMNode(this.refs.codeblock); // eslint-disable-line
    hljs.initHighlightingOnLoad();
    // register languages - feel free to add languages from here if missing:
    // https://github.com/highlightjs/highlight.js/tree/master/src/languages (REMEMBER TO IMPORT ON TOP AS WELL)
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('php', php);
    hljs.highlightBlock(node);
    // window.hljs.initLineNumbersOnLoad();
  }

  generateCodeBlock = (content, idx) => <CodeBlock tabs={content} key={`${idx}-cb`} initializeHighlightJS={this.initializeHighlightJS} />;

  generateMarkdown = (content, idx) => <Markdown className="md-content" source={content} escapeHtml={false} key={`${idx}-md`} />;

  renderContent = page => page.components.map((component, idx) => {
    const { selectedComponent } = this.props;
    // grabs selected page and renders content in component array
    return (
      <div className="component-wrapper" key={`${idx}-component`}>
        <div className="component-buttons">
          <button type="button" onClick={() => this.updateComponentToEdit(idx, component)}>edit</button>
          <button type="button">delete</button>
        </div>
        {component.type === 'CODEBLOCK' ? this.generateCodeBlock(idx === selectedComponent.index ? selectedComponent.content : component.content, idx) : this.generateMarkdown(idx === selectedComponent.index ? selectedComponent.content : component.content, idx)}
      </div>
    );
  })

  updateComponentToEdit = (idx, component) => {
    const { props } = this;
    const componentToEdit = component;
    componentToEdit.index = idx;
    props.updatePageComponent(componentToEdit, 'PREVIEW');
  }

  render() {
    const { selectedPage } = this.props;
    return (
      <div className="preview-container">
        {this.renderContent(selectedPage)}
        <div className="add-component">+</div>
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

export default connect(mapStateToProps, { updatePageComponent })(Preview);
