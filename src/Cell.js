import React, { Component } from 'react';

class Cell extends Component {
  state = {
    hovered: false
  };

  // disable clicking on cell after player has moved
  handleClick = cell => {
    const { disabled, movePlayer } = this.props;
    this.setState({ disabled: true }, () => {
      const coords = cell.split('-').map(num => parseInt(num));
      !disabled && movePlayer(coords);
    });
  };

  addClassNames = () => {
    const { cell, disabled } = this.props;
    return `cell cell-${cell} ${disabled ? 'disabled' : ''}`;
  };

  handleMouseEnter = () => {
    this.setState({ hovered: true })
  };

  handleMouseLeave = () => {
    this.setState({ hovered: false })
  };

  render = () => {
    const { cell, children, player, disabled } = this.props;
    return (
      <button
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={this.addClassNames()}
        onClick={() => this.handleClick(cell)}>
        {this.state.hovered ? <div className={`hoverP${!disabled && player}`} />  : ''}
        {children}
      </button>
    );
  };
}

export default Cell;
