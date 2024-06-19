// src/components/HelpModal.js

import React from 'react';
import './HelpModal.css';

const HelpModal = ({ onClose, garnishes, drinks }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>How to Play</h2>
        <p>The objective of the game is to match each garnish with its corresponding drink.</p>
        <div className="lists-container">
          <div className="list">
            <h3>Garnishes</h3>
            <ul>
              {garnishes.map((garnish, index) => (
                <li key={index}>{garnish}</li>
              ))}
            </ul>
          </div>
          <div className="list">
            <h3>Drinks</h3>
            <ul>
              {drinks.map((drink, index) => (
                <li key={index}>{drink}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
