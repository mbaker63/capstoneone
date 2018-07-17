import React from 'react';
import Document from './Document.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currPage: 'Document'
    }
    this.redirect = this.redirect.bind(this);
  }

  redirect(page){
    this.setState({
      currPage: page
    })
  }

  render() {
     return (
       <div>
       {this.state.currPage === "Document" ? <Document /> : null}
       </div>
     );
   }
 }
