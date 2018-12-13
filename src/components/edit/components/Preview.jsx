import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import _ from 'lodash';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import { updatePageComponent, isEdited, addComponent, deleteComponent, switchComponents } from '../../../actions/editActions';
import CodeBlock from './CodeBlock';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate = (prevProps) => {
    const { selectedComponent, lastUpdatedBy } = this.props;
    if (lastUpdatedBy === 'EDITOR' && selectedComponent.type === 'CODEBLOCK' && prevProps.selectedComponent.content !== selectedComponent.content) {
      // this.forceUpdate();
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

  generateCodeBlock = (content, idx) => <CodeBlock tabs={content} key={`${idx}-cb-${content[0].content}`} initializeHighlightJS={this.initializeHighlightJS} />;

  generateMarkdown = (content, idx) => <Markdown className="md-content" source={content} escapeHtml={false} key={`${idx}-md-${content}`} />;

  renderContent = page => page.components.map((component, idx) => {
    const { props } = this;
    const { selectedComponent } = this.props;
    // grabs selected page and renders content in component array
    return (
      <div className="component-wrapper" key={`${idx}-component-${Math.random() * 100}`}>
        <div className="component-buttons">
          {idx !== 0 ? <button type="button" onClick={() => props.switchComponents(idx, idx - 1)}>&#8593;</button> : null}
          {idx !== page.components.length - 1 ? <button type="button" onClick={() => props.switchComponents(idx, idx + 1)}>&#8595;</button> : null}
          <button type="button" onClick={() => this.updateComponentToEdit(idx, component)}>edit</button>
          <button type="button" onClick={() => this.deleteComponent(idx)}>delete</button>
        </div>
        {component.type === 'CODEBLOCK' ? this.generateCodeBlock(component.content[0] === selectedComponent.content[0] && selectedComponent.index === component.index ? selectedComponent.content : component.content, idx) : this.generateMarkdown(component.content === selectedComponent.content && selectedComponent.index === component.index ? selectedComponent.content : component.content, idx)}
      </div>
    );
  })

  updateComponentToEdit = (idx, component) => {
    const { props } = this;
    const componentToEdit = component;
    componentToEdit.index = idx;
    props.updatePageComponent(componentToEdit, 'PREVIEW');
  }

  deleteComponent = (idx) => {
    const { selectedPage, selectedComponent } = this.props;
    const { props } = this;
    const currentComponents = _.map(selectedPage.components, _.clone);
    currentComponents.splice(idx, 1);
    // TODO: Prompt are you sure?
    if (selectedComponent) {
      currentComponents.forEach((component, index) => {
        component.content === selectedComponent.content ? this.updateComponentToEdit(index, component) : null;
      });
    }
    props.deleteComponent(idx);
  }

  addComponent = (type) => {
    const { props } = this;
    const { selectedPage } = this.props;
    const component = { type };
    if (type === 'MARKDOWN') {
      component.content = '# Type some markdown';
    } else if (type === 'CODEBLOCK') {
      component.content = [{ language: 'javascript', content: '' }];
    }
    props.addComponent(component);
    this.updateComponentToEdit(selectedPage.components.length, component);
  }

  render() {
    const { selectedPage, editsMade } = this.props;
    return (
      <div className="preview-container" style={editsMade ? { maxHeight: '85vh' } : { maxHeight: '90vh' }}>
        {this.renderContent(selectedPage)}
        <div className="add-component">
          <div onClick={() => this.addComponent('MARKDOWN')} onKeyPress={() => this.addComponent('MARKDOWN')}>
            <i className="fas fa-file-alt fa-2x" style={{ color: '#18C6DB' }} />
            <p>add markdown</p>
          </div>
          <div onClick={() => this.addComponent('CODEBLOCK')} onKeyPress={() => this.addComponent('CODEBLOCK')}>
            <i className="fas fa-file-code fa-2x" style={{ color: '#18C6DB' }} />
            <p>add codeblock</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.pagesReducer.navigation,
    selectedPage: state.pagesReducer.selectedPage,
    lastUpdatedBy: state.pagesReducer.lastUpdatedBy,
    editsMade: state.pagesReducer.editsMade,
    selectedComponent: state.pagesReducer.selectedComponent
  };
}

export default connect(mapStateToProps, { updatePageComponent, isEdited, addComponent, deleteComponent, switchComponents })(Preview);
