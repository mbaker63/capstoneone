import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  _onBoldClick() {
  this.onChange(RichUtils.toggleInlineStyle(
    this.state.editorState,
    'BOLD'
  ));
  }
  _onItalicClick() {
  this.onChange(RichUtils.toggleInlineStyle(
    this.state.editorState,
    'ITALIC'
  ));
  }

  _onUnderlineClick() {
  this.onChange(RichUtils.toggleInlineStyle(
    this.state.editorState,
    'UNDERLINE'
  ));
  }

  render() {
     return (
       <div style={{padding: 30}}>
         <h1>Welcome Fellas</h1>
         <button onClick={this._onBoldClick.bind(this)}>Bold</button>
         <button onClick={this._onItalicClick.bind(this)}>Italics</button>
         <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>

         <div style={{height: 400, width: 500, backgroundColor: 'lightblue'}}>
           <Editor
             editorState={this.state.editorState}
             onChange={this.onChange}
           />
         </div>
         </div>
     );
   }
 }
