// src/components/HelpModal.js

import React from 'react';
import './HelpModal.css';

const HelpModal = ({ onClose, garnishes, drinks, onSelectLevel }) => {
  return (
    <div className="help-modal">
      <div className="help-content">
        <h2>Help & Instructions</h2>
        <p>The objective of the game is to match each garnish with its corresponding drink. Click on the cards to flip them and find the pairs.</p>
        <h3>Garnishes and Drinks</h3>
        <div className="garnish-drink-list">
          <ol className="garnishes">
            {garnishes.map((garnish, index) => (
              <li key={index}>{garnish}</li>
            ))}
          </ol>
          <ol className="drinks">
            {drinks.map((drink, index) => (
              <li key={index}>{drink}</li>
            ))}
          </ol>
        </div>
        <h3>Select Level</h3>
        <div className="level-buttons">
          <button onClick={() => onSelectLevel(2)}>tutorial</button>
          <button onClick={() => onSelectLevel(3)}>Easy</button>
          <button onClick={() => onSelectLevel(4)}>Advanced</button>
          <button onClick={() => onSelectLevel(5)}>Expert</button>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HelpModal;
