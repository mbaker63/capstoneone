import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import ColorPicker, {colorPickerPlugin} from 'draft-js-color-picker'

const styleMap = {
  'UPPERCASE': {
    textTransform: 'uppercase'
  },
  'LOWERCASE': {
    textTransform: 'lowercase'
  },
}
const presetColors = [
  '#ff00aa',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];
function rgbaToHex (rgba) {
  var parts = rgba.substring(rgba.indexOf("(")).split(","),
  r = parseInt(parts[0].substring(1).trim(), 10),
  g = parseInt(parts[1].trim(), 10),
  b = parseInt(parts[2].trim(), 10),
  a = parseFloat(parts[3].substring(0, parts[3].length - 1).trim()).toFixed(2);

  return ('#' + r.toString(16) + g.toString(16) + b.toString(16) + (a * 255).toString(16).substring(0,2));
}

function myBlockStyleFn(contentBlock){
  const type = contentBlock.getType();
  if(type === 'right'){
    return 'align-right';
  } else if(type === 'left'){
    return 'align-left';
  } else if(type === 'center'){
    return 'align-center';
  }
}

export default class Document extends React.Component {
  constructor(props){
    super(props);
    let editorState = EditorState.createEmpty();

    this.updateEditorState = editorState => this.setState({editorState});
    this.getEditorState = () => this.state.editorState;
    this.onChange = (editorState) => this.setState({editorState});
    this.picker = colorPickerPlugin(this.updateEditorState, this.getEditorState);

    this.state = {
      editorState: editorState,
      color: 'black',
      name: ''
    };

  }


  // componentDidMount(){
  //   fetch()
  //   .theN(responseJSON)
  //   .then(response){
  //   this.setState({
  //     editorState: response.editorState
  //   })
  // }
  // }


  toggleInlineStyle(e, inlineStyle){
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle))
  }

  toggleBlockType(e, blockType){
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }

  applyColor() {
    let hex = rgbaToHex(String(this.state.color)).slice(1)
    if(!styleMap[hex]){
      styleMap[hex] = {'color': this.state.color}
    }
    console.log(styleMap);
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, hex))
  }

  render() {
    return (
      <div style={{padding: 30}}>
        <h1 style={{color:'blue'}}>Document Editor</h1>
        <h2>Document Name: {this.state.name}</h2>
        <h3>Document ID: {}</h3>
        <button>Save Document</button><br /><br />
        <div className='toolbar'>
          <button onMouseDown= {(e)=>this.toggleInlineStyle(e, 'BOLD')} style={{fontWeight:'bold'}}>B</button>
          <button onMouseDown= {(e)=>this.toggleInlineStyle(e, 'ITALIC')} style={{fontStyle:'italic'}}>I</button>
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
          <button onMouseDown= {(e)=>this.toggleBlockType(e, 'left')}>Left</button>
          <button onMouseDown= {(e)=>this.toggleBlockType(e, 'center')}>Center</button>
          <button onMouseDown= {(e)=>this.toggleBlockType(e, 'right')}>Right</button>
          <button className="btn"> Color Picker
            <ColorPicker
              toggleColor={color => {
                this.setState({
                  color: color
                })
                this.picker.addColor(color)
                this.applyColor()
              }}
              presetColors = {presetColors}
              color={this.state.color}
            />
          </button>
        </div>
        <div className='editor'>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            customStyleMap={styleMap}
            blockStyleFn={myBlockStyleFn}
          />
        </div>
        <button onClick={()=>this.props.redirect('Dashboard')}>Home</button>
      </div>
    );
  }
}
