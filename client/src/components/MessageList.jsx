import React from 'react';

class MessageList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ul className="msg-list">
        {this.props.messages.map((data, index) => {
          return (
            <li key={index}>
              {data}
            </li>
          )
        })}
      </ul>
    );
  };
}

export default MessageList;