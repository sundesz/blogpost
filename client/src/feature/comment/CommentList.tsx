import { IComment } from '../../types';
import SingleComment from './SingleComment';

interface ICommentListProps {
  comments: IComment[];
}

const CommentList: React.FC<ICommentListProps> = ({ comments }) => {
  return (
    <div className="comment-list py-4">
      <div className="comment-heading">
        {comments.length ? 'Comments' : 'No comments yet'}
      </div>

      {comments &&
        comments.map((comment) => (
          <SingleComment key={comment.commentId} comment={comment} />
        ))}
    </div>
  );
};

export default CommentList;
