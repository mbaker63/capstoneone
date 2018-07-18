import React from 'react';
import Document from './Document.js';
import Login from './Login.js'
import { View, TextInput } from 'react-elements'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currPage: 'Login'
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
       <View>
       {this.state.currPage === "Login" ? <Login /> : null}
     </View>
     );
   }
 }
