import { IBlog, IComment } from '../../types';
import BlogRating from './BlogRating';
import SingleComment from './SingleComment';

interface ICommentListProps {
  blog: IBlog;
}

const CommentList: React.FC<ICommentListProps> = ({ blog }) => {
  const comments = blog.comments;

  return (
    <div className="comment-list py-4">
      <BlogRating blogRating={blog.blogRating} />

      <div className="comment-heading">
        {comments.length ? 'Comments' : 'No comments yet.'}
      </div>

      {comments &&
        comments.map((comment) => (
          <SingleComment key={comment.commentId} comment={comment} />
        ))}
    </div>
  );
};

export default CommentList;
