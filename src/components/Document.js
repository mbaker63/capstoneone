import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

const styleMap = {
  'UPPERCASE': {
    textTransform: 'uppercase'
  },
  'LOWERCASE': {
    textTransform: 'lowercase'
  }
}

export default class Document extends React.Component {
  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  toggleInlineStyle(e, inlineStyle){
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle))
  }

  toggleBlockType(e, blockType){
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  render() {
     return (
       <div style={{padding: 30}}>
         <h1 style={{color:'blue'}}>Document Editor</h1><br />
         <div className='toolbar'>
         <button onMouseDown= {(e)=>this.toggleInlineStyle(e, 'BOLD')} style={{fontWeight:'bold'}}>B</button>
         <button onMouseDown= {(e)=>this.toggleInlineStyle(e, 'ITALICS')} style={{fontStyle:'italic'}}>I</button>
         <button onMouseDown= {(e)=>this.toggleInlineStyle(e, 'UNDERLINE')} style={{textDecoration:'underline'}}>U</button>
         <button onMouseDown= {(e)=>this.toggleInlineStyle(e, 'STRIKETHROUGH')} style={{textDecoration:'line-through'}}>S</button>
         <button onMouseDown= {(e)=>this.toggleInlineStyle(e, 'UPPERCASE')}>ABC</button>
         <button onMouseDown= {(e)=>this.toggleInlineStyle(e, 'LOWERCASE')}>abc</button>
         <button onMouseDown= {(e)=>this.toggleBlockType(e, 'unordered-list-item')}>Unordered List</button>
         <button onMouseDown= {(e)=>this.toggleBlockType(e, 'ordered-list-item')}>Ordered List</button>
         <button onMouseDown= {(e)=>this.toggleBlockType(e, 'header-one')}>H1</button>
         <button onMouseDown= {(e)=>this.toggleBlockType(e, 'header-two')}>H2</button>
         <button onMouseDown= {(e)=>this.toggleBlockType(e, 'header-three')}>H3</button>
         <button onMouseDown= {(e)=>this.toggleBlockType(e, 'header-four')}>H4</button>
         <button onMouseDown= {(e)=>this.toggleBlockType(e, 'header-five')}>H5</button>
         <button onMouseDown= {(e)=>this.toggleBlockType(e, 'header-six')}>H6</button>
       </div>
         <div className='editor'>
           <Editor
             editorState={this.state.editorState}
             onChange={this.onChange}
             customStyleMap={styleMap}
           />
         </div>
         </div>
     );
   }
 }
