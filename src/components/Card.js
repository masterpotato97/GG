import './Card.css';

const Card = ({ garnish, isFlipped, onClick }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="front">
        {/* Display the garnish text if flipped, otherwise display custom content */}
        {isFlipped ? garnish : 'Click to Flip'}
      </div>
      <div className="back">
        {/* Display 'Front Content' on the back of the card */}
        {isFlipped ? 'Click to Flip' : 'GG'}
      </div>
    </div>
  );
};

export default Card;
