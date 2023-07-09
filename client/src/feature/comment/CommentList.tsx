import { Blog, Comment } from '../../types';
import BlogRating from './BlogRating';
import SingleComment from './SingleComment';

interface CommentListProps {
  blog: Blog;
}

const CommentList: React.FC<CommentListProps> = ({ blog }) => {
  const comments = blog.Comments;

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
