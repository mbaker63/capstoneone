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
    fetch('http://localhost:3000/login', {
      method: "POST",
      body: {
        username: this.state.username,
        password: this.state.password
      }
    })
    .then(resp => {
      if (resp.status === 200){
        alert('Success!')
      } else {
        alert('Failed!')
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
        <form action='http://localhost:3000/login' method="post">
          <input type='text' val='' name='username' onChange={(e) => this.onUsernameChange(e)} placeholder="Enter Username"></input>
          <input type='password' val='' name='password' onChange={(e) => this.onPasswordChange(e)} placeholder="Enter Password"></input>
          <input type='submit' value='submit' onClick={this.login}></input>
        </form>
      </div>
    );
  }
}
