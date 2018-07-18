import React from 'react';
export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div>
        <input type='text' placeholder='Enter Document ID' />
        <button onClick={()=>this.props.redirect('Document')}>Submit</button>
      </div>
    )
  }
}
