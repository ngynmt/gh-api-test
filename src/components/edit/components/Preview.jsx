import React, { Component } from 'react';
import Markdown from 'react-markdown';
import _ from 'lodash';
import { connect } from 'react-redux';
import CodeBlock from './CodeBlock';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateCodeBlock = (content, idx) => <CodeBlock tabs={content} key={idx} />;

  generateMarkdown = (content, idx) => <Markdown className="md-content" source={content} escapeHtml={false} key={idx} />;

  renderContent = page => page.components.map((component, idx) => {
    // grabs selected page and renders content in component array
    if (component.type === 'CODEBLOCK') {
      return this.generateCodeBlock(component.content, idx);
    }
    if (component.type === 'MARKDOWN') {
      return this.generateMarkdown(component.content, idx);
    }
    return null;
  })


  render() {
    const { selectedPage } = this.props;
    return (
      <div className="preview-container">
        {this.renderContent(selectedPage)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.pagesReducer.navigation,
    selectedPage: state.pagesReducer.selectedPage
  };
}

export default connect(mapStateToProps, {})(Preview);
