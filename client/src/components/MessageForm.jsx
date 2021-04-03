import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.getElementById("textBox").focus();
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
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          id="textBox"
          type="text"
          className="text-box"
          placeholder="Your meowssage here..."
          autoComplete="off"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" value="Send" className="button" />
      </form>
    );
  }
}

export default MessageForm;