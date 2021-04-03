import React from 'react';
import MessageList from './MessageList.jsx';
import MessageForm from './MessageForm.jsx';
// import ActiveGame from './ActiveGame.jsx';
import socketIOClient from "socket.io-client";
const socket = socketIOClient();
// const axios = require('axios').default;

class App extends React.Component {
  constructor() {
    super();

    let enteredName = prompt('Please enter your cat\'s name');
    if (!enteredName) {
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
    });
  }

  render() {
    return (
      <div className="top-parent">
        <div className="chat-parent">
          <h1 className="title">Cat Chat</h1>
          <MessageList messages={this.state.messages} />
          <MessageForm newMessage={this.handleSubmit} />
        </div>
        {/* <div className="game-parent">
          <ActiveGame />
        </div> */}
      </div>
    )
  }
}

export default App;