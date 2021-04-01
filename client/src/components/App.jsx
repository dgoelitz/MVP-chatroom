import React from 'react';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
import socketIOClient from "socket.io-client";
const PORT = 3000;
// const ENDPOINT = `http://localhost:${PORT}`;
const socket = socketIOClient();
const axios = require('axios').default;

class App extends React.Component {
  constructor() {
    super();

    let enteredName = prompt('Please enter your cat\'s name');
    if (enteredName === null) {
      enteredName = 'Anonymous kitty';
    }

    this.state = {
      username: enteredName,
      messages: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state.username);
  }

  handleSubmit(message) {
    if (message) {
      console.log('handleSubmit: ', message);
      socket.emit('chat message', {
        user: this.state.username,
        message: message
      });
      // axios.post('/mainroom', {
      //   user: this.state.username,
      //   message: message
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  }

  // refreshMessages = () => {
  //   axios.get('/chatroom')
  //     .then( (response) => {
  //       this.list = response.data;
  //       this.setState({
  //         messages: list
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  componentDidMount() {
    socket.on('chat message', (msg) => {
      this.setState({
        messages: [...this.state.messages, msg.user + ': ' + msg.message]
      })
      console.log('made it to this client:', this.state.messages);
    });
  }

  render() {
    return (
      <div>
        <p className="title">Cat Chat</p>
        <MessageList messages={this.state.messages} />
        <MessageForm newMessage={this.handleSubmit} />
      </div>
    )
  }
}

export default App;