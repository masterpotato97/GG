import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';
import Confetti from 'react-confetti';
import HelpModal from './components/HelpModal'; // Import the HelpModal component

const garnishes = [
  "Orange Peel(old fashion)", "Amarena cherrie(hunt box)","Cinnamon, Mint spring, Crystal Cube Ice","Half orange Wheel","One fourth pineapple wheel, cut small X then stick a mint spring","Pineapple Leaf(Paradise Spritz)","Lime wedge(margarita)","Pineapple wedge placed on the rim of the glass","Mint Spring(mojito)","Lime wedge(margarita)","Orange Peel (Cosmopolitan)","Half Orange Slice (Aperol Spritz)","Pineapple Leaf (yellow bird)","Basil Spring","Mint Spring(super fuirt lemonade)","Three Blueberries","Orange Burst","Thyme Spring","Lemon Twist","Three Angostura Bitters","three bleu Olives skewred","Amarena Cherry and Caramelized Pineapple Skewered","Dehidrated blood orange slices","Three thin orange slices",
];

const drinks = [
  "Old Fashioned","Hunt Box","Carajillo","Guarana","Pineapple Mint Lemonade","Paraise Spritz","Brazilian Limonada","Pina Colada","Mojito","Margarita","Clean Cosmopolitan","Aperol Spritz","YellowBird","Tequila Thyme","Super Fruit Lemonade","Samba Squeeze","Passion Fruit Mimso","Gold Rush","Clean Cucummber Martini","Clean Sour","Classic Martini","Caramelized Pineapple Old Fashion","Blood Orange Manhattan","Strawberry Hibiscus Caipirinha"
];

const cards = [...garnishes, ...drinks];

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

shuffleArray(cards);

const App = () => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false); // State for help modal

  useEffect(() => {
    let timer;
    if (isGameActive) {
      timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
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
    shuffleArray(cards);
    setFlippedCards([]);
    setMatchedCards([]);
    setTime(0);
    setIsGameActive(true);
  };

  const hasWon = matchedCards.length === cards.length;

  useEffect(() => {
    if (hasWon) {
      setIsGameActive(false);
    }
  }, [hasWon]);

  return (
    <div className="App">
      <h1>Garnish Game</h1>
      <div className="timer">Time: {time}s</div>
      <button className="restart-button" onClick={handleRestart}>Restart</button>
      {hasWon && <Confetti />}
      <button className="help-button" onClick={() => setIsHelpOpen(true)}>Help</button>
      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} garnishes={garnishes} drinks={drinks} />}
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
