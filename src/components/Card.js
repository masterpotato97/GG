import React from 'react';
import './Card.css';

const Card = ({ garnish, isFlipped, onClick, listIndex }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="front">
        {isFlipped ? `${garnish} (${listIndex + 1})` : 'boo'}
      </div>
      <div className="back">
        {isFlipped ? ' ' : 'GG'}
      </div>
    </div>
  );
};

export default Card;
