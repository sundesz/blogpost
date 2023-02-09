import { format } from 'date-fns';
import { IComment } from '../../types';

interface ISingleCommentProps {
  comment: IComment;
}

const SingleComment: React.FC<ISingleCommentProps> = ({ comment }) => {
  return (
    <div className="comment py-2">
      <div>
        <div className="comment-title">{comment.title}</div>
        <div className="">
          commented on {format(new Date(comment.updatedAt!), 'dd LLLL yyyy')}
        </div>
      </div>

      <div className="comment-content">{comment.content}</div>
    </div>
  );
};

export default SingleComment;
