import React, { Component } from 'react';
import { connect } from 'react-redux';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponent: 'MARKDOWN' // or 'CODEBLOCK'
    };
  }

  componentDidMount = () => {
    // get  selected page + component
  }

  renderMarkdownEditor = () => {
    // TODO
  }

  renderCodeblockEditor = () => {
    // TODO
  }

  render() {
    const { selectedComponent } = this.state;
    return (
      <div className="editor-container">
        {selectedComponent === 'MARKDOWN' ? this.renderMarkdownEditor() : this.renderCodeblockEditor()}
        <h1>Insert Editor Here!</h1>
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


export default connect(mapStateToProps, {})(Editor);
