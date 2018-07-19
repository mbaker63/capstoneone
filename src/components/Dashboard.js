import React from 'react';
import Modal from './Modal.js'
export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      documents: ['doc1', 'doc2', 'doc3'],
      isNameModalOpen: false,
      isIdModalOpen: false,
      name: '',
      id: ''
    }
  }


  openModal(thing) {
    if(thing==='Name'){
    this.setState({ isNameModalOpen: true })
  } else if (thing === 'Id'){
    this.setState({ isIdModalOpen: true })
  }
  }

  closeModal(action) {
    if(action === 'Name'){
    this.setState({ isNameModalOpen: false })
    this.props.getName(this.state.name)
    this.props.redirect('Document')
  } else if(action === 'Id'){
    this.setState({ isIdModalOpen: false })
    this.props.getId(this.state.id)
    this.props.redirect('Document')
  }
  }

  render(){
    return (
      <div>
        <div>
          <button onClick={() => this.openModal('Name')}>New Document</button>
          <Modal isOpen={this.state.isNameModalOpen} onClose={() => this.closeModal()}>
            <h1>Document Name:</h1>
            <input type='text' placeholder='Name' onChange={(e)=>this.setState({name: e.target.value})}/>
            <button onClick={() => this.closeModal('Name')}>Create</button>
          </Modal>
          <button type="button" onClick={()=>this.openModal('Id')}>Join Document</button>
          <Modal isOpen={this.state.isIdModalOpen} onClose={() => this.closeModal('Create')}>
            <h1>Document ID:</h1>
            <input type='text' placeholder='ID' onChange={(e)=>this.setState({id: e.target.value})}/>
            <button onClick={() => this.closeModal('Id')}>Join</button>
          </Modal>
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
