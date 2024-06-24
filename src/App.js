import React, { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import './App.css';
import Confetti from 'react-confetti';
import HelpModal from './components/HelpModal';

const garnishes = [
  "Orange Peel (Old Fashioned)", "Amarena Cherry (Hunt Box)", "Cinnamon, Mint Spring, Crystal Cube Ice", "Half Orange Wheel (Guarana)", 
  "One fourth pineapple wheel", "Pineapple Leaf (Paradise Spritz)", "Lime wedge (Brazilian Limonada)",
  "Pineapple wedge and red cherry", "Mint Spring (Mojito)", "Lime wedge (Margarita)", "Orange Peel (Cosmopolitan)",
  "Half Orange Slice (Aperol Spritz)", "Pineapple Leaf (Yellow Bird)", "Basil Spring", "Mint Spring",
  "Three Blueberries", "Thyme Spring", "Lemon Twist", "Three Angostura Bitters", "Three Olives skewered",
  "Amarena Cherry and Caramelized Pineapple Skewered", "Dehydrated Blood Orange Slices", "Three Thin Orange Slices", "Lime wedge (Corona)", "Half Orange Wheel (Blue Moon)"
];

const drinks = [
  "Old Fashioned", "Hunt Box", "Carajillo", "Guarana", "Pineapple Mint Lemonade", "Paradise Spritz", "Brazilian Limonada",
  "Pina Colada", "Mojito", "Margarita", "Clean Cosmopolitan", "Aperol Spritz", "Yellow Bird", "Tequila Thyme", 
  "Super Fruit Lemonade", "Samba Squeeze", "Gold Rush", "Clean Cucumber Martini", "Clean Sour",
  "Classic Martini", "Caramelized Pineapple Old Fashion", "Blood Orange Manhattan", "Strawberry Hibiscus Caipirinha", "Corona", "Blue Moon"
];

const levels = {
  1: 4,  // Tutorial level with 4 cards
  2: 8,
  3: 12,
  4: 24,
  5: garnishes.length * 2  // All pairs
};

const App = () => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [level, setLevel] = useState(1);  // Start with tutorial level
  const [cards, setCards] = useState([]);
  const [flipAllUsed, setFlipAllUsed] = useState(0); // Track number of times flip all button has been used

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const initializeCards = useCallback(() => {
    const pairs = garnishes.map((garnish, index) => [garnish, drinks[index]]);
    shuffleArray(pairs);

    let selectedPairs;
    if (level === 5) {
      selectedPairs = pairs;
    } else {
      selectedPairs = pairs.slice(0, levels[level] / 2);
    }

    const initialCards = selectedPairs.flat();
    shuffleArray(initialCards);
    
    return initialCards;
  }, [level]);

  useEffect(() => {
    setCards(initializeCards());
  }, [initializeCards]);

  useEffect(() => {
    let timer;
    if (isGameActive) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (isMatch(firstCard, secondCard)) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const isMatch = (card1, card2) => {
    const garnish = garnishes.includes(card1) ? card1 : card2;
    const drink = drinks.includes(card1) ? card1 : card2;
    return garnishes.indexOf(garnish) === drinks.indexOf(drink);
  };

  const handleRestart = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setTime(0);
    setIsGameActive(true);
    setFlipAllUsed(0); // Reset the flip all button usage
  };

  const hasWon = matchedCards.length === cards.length;

  useEffect(() => {
    if (hasWon) {
      setIsGameActive(false);
    }
  }, [hasWon]);

  const handleLevelSelect = (level) => {
    setLevel(level);
    setIsHelpOpen(false);
    handleRestart();
  };

  const handleFlipAll = () => {
    setFlippedCards(cards.map((_, index) => index));
    setTimeout(() => {
      setFlippedCards([]);
      setFlipAllUsed(flipAllUsed + 1);
    }, 10000);
  };

  return (
    <div className="App">
      <h1>Garnish Game</h1>
      <div className="timer">Time: {time}s</div>
      {level === 5 && flipAllUsed < 2 && (
        <button className="flip-all-button" onClick={handleFlipAll}>Flip All Cards</button>
      )}
      {level === 4 && flipAllUsed < 3 && (
        <button className="flip-all-button" onClick={handleFlipAll}>Flip All Cards</button>
      )}
      <button className="restart-button" onClick={handleRestart}>Restart</button>
      {hasWon && <Confetti />}
      <button className="help-button" onClick={() => setIsHelpOpen(true)}>Help</button>
      {isHelpOpen && (
        <HelpModal
          onClose={() => setIsHelpOpen(false)}
          garnishes={garnishes}
          drinks={drinks}
          onSelectLevel={handleLevelSelect}
        />
      )}
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={index}
            garnish={card}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
