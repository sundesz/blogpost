import { formatDistanceToNow, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Comment } from '../../types';
import Rating from './Rating';

interface SingleCommentProps {
  comment: Comment;
}

const SingleComment: React.FC<SingleCommentProps> = ({ comment }) => {
  const commenter = comment.user ? (
    <Link to={`/users/${comment.user.userId}`} state={{ user: comment.user }}>
      {comment.user.name}
    </Link>
  ) : (
    'Anonymous user'
  );

  return (
    <div className="comment py-2">
      <div>
        <div>
          <span className="commenter">{commenter}</span>&nbsp;&nbsp;
          <span className="comment-date">
            commented on {formatDistanceToNow(parseISO(comment.updatedAt!))} ago
          </span>
        </div>
        <div className="comment-heading">
          <Rating rating={comment.rating?.rating} />
          <div className="comment-title">{comment.title}</div>
        </div>
      </div>

      <div className="comment-content">{parse(comment.content)}</div>
    </div>
  );
};

export default SingleComment;
