import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';

/* eslint-disable */
// some function to add line numbers to codeblock component
(function (w) {
	'use strict';
	if (typeof w.hljs === 'undefined') {
   console.error('highlight.js not detected!');
	} else {
    w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
    w.hljs.lineNumbersBlock = lineNumbersBlock;
    // w.hljs.documentReady = documentReady;
	}
	function initLineNumbersOnLoad() { // 1
   if (document.readyState === 'complete') {
   	documentReady();
   } else {
   	w.addEventListener('DOMContentLoaded', documentReady);
   }
  }

	function documentReady() { // 2
   try {
   	let blocks = document.querySelectorAll('code.hljs');
   	for (let i in blocks) {
   if (blocks.hasOwnProperty(i)) {
   	lineNumbersBlock(blocks[i], true);
   }
   	}
      $(window).resize(function() {
        for (let i in blocks) {
          if (blocks.hasOwnProperty(i)) {
            lineNumbersBlock(blocks[i], false);
          }
        }
      });
   } catch (e) {
     // console.error('LineNumbers error: ', e);
   }
	}

	//Add a second parameter to know if triggered by resizing
	function lineNumbersBlock (element, resize) { // 3
   if (typeof element !== 'object') return;
   let parent = element.parentNode;
   let lines = getCountLines(element, resize);
   if (lines > 1) {
   	let l = '';
      $('.hljs-line').each(function(i) {
          l += (i + 1) + '\n';
          //add a empty line if word wrap is detected (if div's height if > than the line-height)
          let height = Math.round(parseInt($(this).height())/parseInt($(this).css('line-height')));
          if( height > 1){
            l += '\n'.repeat(height-1);
          }
      });
   	$('.hljs-line-numbers').remove();
   	let linesPanel = document.createElement('code');
   	linesPanel.className = 'hljs hljs-line-numbers';
   	linesPanel.style.float = 'left';
     linesPanel.textContent = l;
   	parent.insertBefore(linesPanel, element);
   }
	}

	function getCountLines(el, resize) { // 4
    let text = el.innerHTML;
    if (text.length === 0) return 0;
    let regExp = /\r\n|\r|\n/g;
    let lines = text.match(regExp);
    lines = lines ? lines.length : 0;
    if (!text[text.length - 1].match(regExp)) {
    	lines += 1;
    }
    // Don't wrap in div if resize, we have already it
    if (resize === true) {
      // wrap each line in a div
      let textLines = text.split(regExp);
      let textResult = "";
      textLines.forEach(function(element) {
        textResult += "<div class='hljs-line'>"+element+"</div>\n";
      });
      el.innerHTML = textResult;
    }
   return lines;
	}
}(window));

$(document).ready(function() {
  $('pre code').each(function(i, e) {
  	hljs.highlightBlock(e); 
    window.hljs.initLineNumbersOnLoad();
    ;
  });
});
/* eslint-enable */

class CodeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.tabs[0]
    };
  }

  componentDidMount = () => {
    this.initializeHighlightJS();
  }

  componentDidUpdate = () => {
    this.initializeHighlightJS();
  }

  initializeHighlightJS = () => {
    // add highlightjs to codeblock component
    const current = ReactDOM.findDOMNode(this.refs.codeblock); // eslint-disable-line
    hljs.initHighlightingOnLoad();
    // register languages - feel free to add languages from here if missing:
    // https://github.com/highlightjs/highlight.js/tree/master/src/languages (REMEMBER TO IMPORT ON TOP AS WELL)
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('php', php);
    hljs.highlightBlock(current);
    window.hljs.initLineNumbersOnLoad();
  }

  updateSelectedTab = (tab) => {
    const { selectedTab } = this.state;
    selectedTab === tab ? null : this.setState({ selectedTab: tab }, window.hljs.initLineNumbersOnLoad);
  }

  render() {
    const { selectedTab } = this.state;
    const { tabs } = this.props;
    let tabIdx = 0;
    return (
      <div className="codeblock-component">
        <div className="codeblock-tab-container">
          {tabs.map((tab) => {
            tabIdx++;
            return <div className={`codeblock-tab ${selectedTab.language === tab.language ? 'codeblock-tab-selected' : null}`} key={tabIdx} onClick={() => this.updateSelectedTab(tab)} onKeyPress={() => this.updateSelectedTab(tab)}>{tab.language}</div>;
          })}
        </div>
        <div className="codeblock-content">
          <pre>
            <code ref="codeblock" className={selectedTab.language}>
              {selectedTab.content}
            </code>
          </pre>
        </div>
      </div>
    );
  }
}

export default CodeBlock;
