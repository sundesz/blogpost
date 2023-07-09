import { ProgressBar } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import { BlogRatingAttributes } from '../../types';

interface RatingProps {
  displayNumber: string;
  blogRating: number;
  totalRating: number;
}

const Rating: React.FC<RatingProps> = ({
  displayNumber,
  blogRating,
  totalRating,
}) => {
  const commentPercent = blogRating ? (blogRating * 100) / totalRating : 0;

  return (
    <div className="blog-star">
      <div>
        {displayNumber} <StarFill color="#de7921" />:
      </div>
      <div className="blog-star-rating">{blogRating}</div>
      <ProgressBar
        variant="warning"
        now={commentPercent}
        label={`${commentPercent}%`}
      />
    </div>
  );
};

interface BlogRatingProps {
  blogRating: BlogRatingAttributes;
}

const BlogRating: React.FC<BlogRatingProps> = ({ blogRating }) => {
  const totalRating =
    blogRating.rating1 +
    blogRating.rating2 +
    blogRating.rating3 +
    blogRating.rating4 +
    blogRating.rating5;

  return (
    <div className="blog-review py-5">
      <div className="blog-review-title">
        Blog reviews (<small>{totalRating} rating(s)</small>)
      </div>
      <div className="blog-review-stars">
        <Rating
          displayNumber="5"
          blogRating={blogRating.rating5}
          totalRating={totalRating}
        />
        <Rating
          displayNumber="4"
          blogRating={blogRating.rating4}
          totalRating={totalRating}
        />
        <Rating
          displayNumber="3"
          blogRating={blogRating.rating3}
          totalRating={totalRating}
        />
        <Rating
          displayNumber="2"
          blogRating={blogRating.rating2}
          totalRating={totalRating}
        />
        <Rating
          displayNumber="1"
          blogRating={blogRating.rating1}
          totalRating={totalRating}
        />
      </div>
    </div>
  );
};

export default BlogRating;
