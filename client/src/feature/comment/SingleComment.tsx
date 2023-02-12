import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { IComment } from '../../types';
import Rating from './Rating';

interface ISingleCommentProps {
  comment: IComment;
}

const SingleComment: React.FC<ISingleCommentProps> = ({ comment }) => {
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
        <div className="commenter">{commenter}</div>
        <div className="comment-heading">
          <Rating rating={comment.rating?.rating} />
          <div className="comment-title">
            {comment.title}
            {/* <Link to={`/comments/${comment.commentId}`} state={{ comment }}>
              {comment.title}
            </Link> */}
          </div>
        </div>
        <div className="comment-date">
          commented on {format(new Date(comment.updatedAt!), 'dd LLLL yyyy')}
        </div>
      </div>

      <div className="comment-content">{comment.content}</div>
    </div>
  );
};

export default SingleComment;
