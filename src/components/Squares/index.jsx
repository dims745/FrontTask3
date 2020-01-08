import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Squares(props) {
  const { initialWidth, initialHeight, cellSize } = props;
  const allSquares = [];
  const sizeStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
  };
  for (let i = 0; i < initialHeight; i += 1) {
    const squaresInColumn = [];
    for (let j = 0; j < initialWidth; j += 1) {
      squaresInColumn.push(
        <div
          key={`x${j}-${i}`}
          className={`square x${j}`}
          style={sizeStyle}
        />,
      );
    }
    allSquares.push(
      <div key={`y${i}`} className="y">
        {
          squaresInColumn
        }
      </div>,
    );
  }
  return (
    <div>
      <div className="root">
        <button type="button" className="modSquare sub column" style={sizeStyle}>-</button>
        <div className="medium">
          <button type="button" className="modSquare sub row" style={sizeStyle}>-</button>
          <div className="squareBox">
            {
              allSquares
            }
          </div>
          <button type="button" className="modSquare add column" style={sizeStyle}>+</button>
        </div>
        <button
          type="button"
          className="modSquare add row"
          style={
            {
              ...sizeStyle,
              marginLeft: `${cellSize + 4}px`,
            }
          }
        >
          +
        </button>
      </div>
    </div>
  );
}

Squares.defaultProps = {
  initialHeight: 4,
  initialWidth: 4,
  cellSize: 50,
};

Squares.propTypes = {
  initialHeight: PropTypes.number,
  initialWidth: PropTypes.number,
  cellSize: PropTypes.number,
};

export default Squares;
