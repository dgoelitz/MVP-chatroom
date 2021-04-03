import React from 'react';
import ReactDOM from 'react-dom';
import Fish1p1 from './Fish1p1.jsx';
import blackCat from '../../dist/sprites/blackCat.png';

class ActiveGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moving: 0,
      y: 0,
      allFish: []
    }

    this.intervalSet = false;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.checkMovingState = this.checkMovingState.bind(this);
    this.moveInterval = this.moveInterval.bind(this);
    this.handleCollision = this.handleCollision.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('keyup', this.handleKeyUp);
    if (!this.intervalSet) {
      this.timer = setInterval(this.moveInterval, 25);
      this.intervalSet = true;
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
    document.body.removeEventListener('keyup', this.handleKeyUp);
    clearInterval(this.timer);
  }

  moveInterval() {
    const player = document.getElementById('player-one');
    this.setState({
      y: this.state.y += this.state.moving
    });
    if (this.state.y < 0) {
      this.setState({
        y: 0
      });
    }
    if (this.state.y > 209) {
      this.setState({
        y: 209
      });
    }
    player.style.top = `${this.state.y}px`;
  }

  handleKeyDown(e) {
    if (e.keyCode === 38 || e.keyCode === 87) {
      if (this.state.moving > -1) {
        this.setState({
          moving: this.state.moving - 1
        });
      }
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      if (this.state.moving < 1) {
        this.setState({
          moving: this.state.moving + 1
        });
      }
    } else if (e.keyCode === 32) {
      const fishCount = document.getElementsByClassName('one-fish').length;
      if (fishCount < 4) {
        const newFishArray = this.state.allFish.concat(<Fish1p1 y={this.state.y} className={`one-fish-${fishCount}`} index={fishCount} key={fishCount} collide={this.handleCollision} />);
        this.setState({
          allFish: newFishArray
        })
      }
    }
    this.checkMovingState();
  }

  handleKeyUp(e) {
    if (e.keyCode === 38 || e.keyCode === 87) {
      if (this.state.moving < 1) {
        this.setState({
          moving: this.state.moving + 1
        });
      }
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      if (this.state.moving > - 1) {
        this.setState({
          moving: this.state.moving - 1
        });
      }
    }
    this.checkMovingState();
  }

  handleCollision(y) {
    if (y === undefined) {
      let newFishArray = this.state.allFish;
      newFishArray.shift();
      this.setState({
        allFish: [...newFishArray]
      })
    }
  }

  checkMovingState() {
    if (this.state.moving > 1) {
      this.setState({
        moving: 1
      })
    }
    if (this.state.moving < -1) {
      this.setState({
        moving: -1
      })
    }
  }

  render() {
    return (
      <div id="game-window" className="game-window">
        <img id="player-one" className="player-one" src={blackCat}>
        </img>
        {this.state.allFish}
      </div>
    )
  }
}

export default ActiveGame;