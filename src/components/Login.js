//LOGIN
import React from 'react';


export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.login = this.login.bind(this);
  }

  login(){
    console.log(this.state);
    fetch('http://localhost:3000/login', {
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
      console.log(resp)
      if (resp.status === 200){
        alert('Success!')
        this.props.redirect('Dashboard')
      } else {
        alert('Failed!')
        this.props.redirect('Login')
      }
    })
    .catch(err => console.log(err))
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

  render(){
    return (
      <div>
        <h1>Login Page</h1>
          <input type='text'  name='username' onChange={(e) => this.onUsernameChange(e)} placeholder="Enter Username"></input>
          <input type='password'  name='password' onChange={(e) => this.onPasswordChange(e)} placeholder="Enter Password"></input>
          <button type="button" onClick={this.login}></button>
      </div>
    );
  }
}
