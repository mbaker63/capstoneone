//REGISTER

import React from 'react';
import Login from './Login.js';

export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      username: '',
      password: '',
      confirmPwd: '',
    }
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(){
    if (this.state.password === this.state.confirmPwd){
      console.log(this.state.username, this.state.password, this.state.confirmPwd)
      return fetch('http://localhost:3000/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(resp => {
        if (resp.status === 200){
          this.props.redirect('Login')
        } else {
          alert('did not work');
        }
      })
      .catch(err => console.log(err))
    } else {
      alert('Passwords do not match')
    }
  }

onUsernameChange(e){
  this.setState({
    username: e.target.value
  })
}

onPasswordChange(e){
  this.setState({
    password: e.target.value
  })
}

onConPwdChange(e){
  this.setState({
    confirmPwd: e.target.value
  })
}

render(){
  return(
    <div>
      <h1>Register Your Account</h1>
      <form>
        <input onChange={(e) => this.onUsernameChange(e)} placeholder='Username'/>
        <br />
        <input onChange={(e) => this.onPasswordChange(e)} placeholder='Password'/>
        <br />
        <input onChange={(e) => this.onConPwdChange(e)} placeholder='Confirm Password'/>
        <button type='button' onClick={this.registerUser}></button>
        <button onClick={() => this.props.redirect('Login')}></button>
      </form>
    </div>
  )
}

}
