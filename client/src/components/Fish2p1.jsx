import React from 'react';
import fishr from '../../dist/sprites/fishr.png';

class Fish extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: props.y }

    this.moveInterval = this.moveInterval.bind(this);
  }

  componentDidMount() {
    if (!this.intervalSet) {
      this.timer = setInterval(this.moveInterval, 25);
      this.intervalSet = true;
    }
  }

  moveInterval() {
    const fish = document.getElementById(`one-fish${this.props.index}`);
    if (this.state.x > 395) {
      this.props.collide();
    }
    this.setState({
      x: this.state.x += 4
    });
    fish.style.left = `${this.state.x}px`;
  }

  render () {
    return <img id={`one-fish${this.props.index}`} className="one-fish" src={fishr}></img>;
  }
}

export default Fish;