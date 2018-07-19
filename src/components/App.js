//application

import React from 'react';
import Document from './Document.js';
import Login from './Login.js';
import Register from './Register.js';
import Dashboard from './Dashboard.js';
import Join from './Join.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currPage: 'Register',
      name: '',
      id: ''
    }
    this.redirect = this.redirect.bind(this);
    this.renderFunc = this.renderFunc.bind(this);
  }

  redirect(page){
    this.setState({
      currPage: page
    });
    console.log(this.state.currPage)
  }

  getName(name){
    this.setState({
      name: name
    })
  }
  getId(id){
    this.setState({
      id: id
    })
  }

  renderFunc(){
    switch(this.state.currPage){
      case 'Document':
        return (<Document redirect={this.redirect} name={this.state.name}/>);
        break;

      case 'Login':
        return (<Login redirect={this.redirect}/>);
        break;

      case 'Register':
        return (<Register redirect={this.redirect}/>);
        break;

      case 'Join':
        return (<Join redirect={this.redirect}/>);
        break;

      case 'Dashboard':
        return (<Dashboard redirect={this.redirect} getId={this.getId.bind(this)} getName={this.getName.bind(this)}/>)
    }
  }


  render(){
    return (
      <div>
        {this.renderFunc()}
      </div>
    )
  }
 }
