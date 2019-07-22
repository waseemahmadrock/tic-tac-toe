import React, { Component } from 'react';

export default class Announcement extends Component {
  render = () => {
    const { winner, boardIsFilled, reset } = this.props;
    const message = !winner && boardIsFilled() ? `Game Draw !!!!` : `Player ${winner} has won!`;

    return (
      <div className="backdrop">
        <div className="modal-container">
          <div className="message-container">
            {message}
            <button onClick={reset}>reset</button>
          </div>
        </div>
      </div>
    );
  };
}
