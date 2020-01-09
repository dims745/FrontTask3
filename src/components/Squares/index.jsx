import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Squares(props) {
  const { initialWidth, initialHeight, cellSize } = props;
  let component = React.createRef();
  const sizeStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    fontSize: `${cellSize / 2}px`,
  };
  const componentInfo = {
    currentPositionX: 0,
    currentPositionY: 0,
  };

  function createSquares(width, height, style) {
    const result = [];
    for (let i = 0; i < width; i += 1) {
      const squaresInColumn = [];
      for (let j = 0; j < height; j += 1) {
        squaresInColumn.push(
          <div
            key={`x${j}-${i}`}
            className={`square x${j}`}
            style={style}
          />,
        );
      }
      result.push(
        <div key={`y${i}`} className="y">
          {
            squaresInColumn
          }
        </div>,
      );
    }
    return result;
  }

  function setPosition(...coords) {
    const x = coords[0] === -1 ? 0 : coords[0];
    const y = coords[1] === -1 ? 0 : coords[1];
    const square = component.querySelector('.square');
    const margin = parseInt(getComputedStyle(square).margin, 10);
    const subRow = component.querySelector('.sub.row');
    const subColumn = component.querySelector('.sub.column');
    subColumn.style.marginLeft = `${(x + 1) * (square.offsetWidth + margin * 2) + 2}px`;
    subRow.style.marginTop = `${y * (square.offsetHeight + margin)}px`;
    subColumn.style.marginLeft = `${(x + 1) * (square.offsetWidth + margin * 2) + 2}px`;
  }

  function calculatePosition(event) {
    const square = event.target;
    const parent = square.parentElement;
    const gParent = parent.parentElement;
    let y = 0;
    let x = 0;
    for (let i = 0; i < parent.children.length; i += 1) {
      if (parent.children[i] === square) y = i;
    }
    for (let j = 0; j < gParent.children.length; j += 1) {
      if (gParent.children[j] === parent) x = j;
    }
    setPosition(x, y);
  }

  function setVisibility(value) {
    const squareBox = component.querySelector('.squareBox');
    const valueRow = squareBox.children[0].children.length === 1 ? 'hidden' : value;
    const valueColumn = squareBox.children.length === 1 ? 'hidden' : value;
    const subRow = component.querySelector('.sub.row');
    const subColumn = component.querySelector('.sub.column');
    subRow.style.transition = valueRow === 'hidden' ? 'none' : 'margin 0.5s';
    subColumn.style.transition = valueColumn === 'hidden' ? 'none' : 'margin 0.5s';
    subColumn.style.visibility = valueColumn;
    subRow.style.visibility = valueRow;
  }

  function changeButtonPosition(event) {
    const previous = event.relatedTarget ? event.relatedTarget.classList[0] : '';
    switch (event.target.classList[0]) {
    case 'square': calculatePosition(event);
      setVisibility('visible'); break;
    case 'squareBox': break;
    case 'y': break;
    case 'modSquare':
      if (previous === 'squareBox' || previous === 'square' || previous === 'y') {
        setVisibility('visible');
      } else setVisibility('hidden');
      break;
    default: setVisibility('hidden'); break;
    }
  }

  function addColumn(squareBox) {
    componentInfo.y += 1;
    const column = document.createElement('div');
    column.classList.add('y');
    for (let j = 0; j < squareBox.children[0].children.length; j += 1) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.width = sizeStyle.width;
      square.style.height = sizeStyle.height;
      column.append(square);
    }
    squareBox.append(column);
  }

  function modifyRow(squareBox, action) {
    for (let i = 0; i < squareBox.children.length; i += 1) {
      if (action === 'add') {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = sizeStyle.width;
        square.style.height = sizeStyle.height;
        squareBox.children[i].append(square);
      } else {
        squareBox.children[i]
          .removeChild(
            squareBox.children[i].children[componentInfo.currentPositionY],
          );
        componentInfo.x -= 1;
        if (componentInfo.currentPositionY === i) {
          setPosition(i - 1, componentInfo.currentPositionX);
        }
      }
    }
  }

  function modifyBox(action, target) {
    const squareBox = component.querySelector('.squareBox');
    if (target === 'column') {
      if (action === 'add') {
        addColumn(squareBox);
      } else {
        squareBox.removeChild(squareBox.children[componentInfo.currentPositionX]);
      }
    } else {
      modifyRow(squareBox, action);
    }
    setVisibility('hidden');
  }

  const allSquares = createSquares(initialWidth, initialHeight, sizeStyle);
  setTimeout(() => { component = component.current; });

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className="squareCustomComponent"
      onMouseOver={changeButtonPosition}
      ref={component}
    >
      <button
        type="button"
        className="modSquare sub column"
        style={sizeStyle}
        onClick={() => modifyBox('sub', 'column')}
      >
        -
      </button>
      <div className="medium">
        <button
          type="button"
          className="modSquare sub row"
          style={sizeStyle}
          onClick={() => modifyBox('sub', 'row')}
        >
          -
        </button>
        <div className="squareBox">
          {
            allSquares
          }
        </div>
        <button
          type="button"
          className="modSquare add column"
          style={sizeStyle}
          onClick={() => modifyBox('add', 'column')}
        >
          +
        </button>
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
        onClick={() => modifyBox('add', 'row')}
      >
        +
      </button>
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
