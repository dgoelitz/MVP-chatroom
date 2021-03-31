import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({value: ''});
    document.getElementById("textBox").focus();
    this.props.newMessage(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="textBox"
          type="text"
          placeholder="Your message here..."
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default MessageForm;