import react from 'react';

export default class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username: '',
      password: ''
    }
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(){
    fetch('http:localhost:3000/register', {
    method: "POST",
    body: {
      username: this.state.username,
      password: this.state.password
    }
  }).then(resp => {})
}

render(){
  return(
  )
}

}
