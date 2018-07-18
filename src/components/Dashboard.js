import React from 'react';
export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      documents: ['doc1', 'doc2', 'doc3'],
      show: false
    }
  }

  render(){
    return (
      <div>
        <div>
          <button onClick={(e)=>this.props.redirect('Document')}>New Document</button>
           <button type="button" onClick={()=>this.props.redirect('Join')}>Join Document</button>

          <div className="oldDocs">
           {this.state.documents.map((thing)=><div  className='doc'>{thing}</div>)}
          </div>
          <button onClick={()=>this.props.redirect('Login')}>Logout</button>
          {/*
            newDocument: needs to add new doc to mongoDB, this.props.redirect to 'document'
            oldDocument: needs to show that Document
            logout: needs to this.props.redirect to 'login'
            joinDocument: needs to ask for the documentID and show that document
            */}
        </div>
      </div>
    )
  }
}
