import { Star, StarFill } from 'react-bootstrap-icons';

interface RatingProps {
  rating: number | undefined;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  if (!rating) {
    return null;
  }

  const stars: number[] = new Array(5).fill(0).fill(1, 0, rating);
  return (
    <div className="rating">
      {stars.map((star, index) =>
        star ? <StarFill key={index} color="#de7921" /> : <Star key={index} />
      )}
    </div>
  );
};

export default Rating;
