import React from 'react';
import Document from './Document.js';
var app = require('express');

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currPage: 'Document'
    }
    this.redirect = this.redirect.bind(this);
    this.saveDoc = this.saveDoc.bind(this);
  }

  redirect(page){
    this.setState({
      currPage: page
    })
  }

  saveDoc(){
    app.get('/', function(req, res){
      res.send('Fuck');
    })
  }

  render() {
     return (
       <div>
       <button onClick={this.saveDoc}>SAVE</button>
       {this.state.currPage === "Document" ? <Document /> : null}
       </div>
     );
   }
 }
