import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Blog, reactionEmoji, ReactionType } from '../../types';
import ErrorNotification from '../../utils/ErrorNotification';
import { message } from '../../utils/notificationMessage';
import { useUpdateReactionMutation } from './blogApiSlice';

interface ReactionButtonsProps {
  blog: Blog;
  isOwnBlog: boolean;
}

const ReactionButtons = ({ blog, isOwnBlog }: ReactionButtonsProps) => {
  const [updateReaction] = useUpdateReactionMutation();
  const reactionHandler = async (blog: Blog, reactionType: ReactionType) => {
    if (isOwnBlog) {
      return false;
    }

    try {
      await updateReaction({
        blogId: blog.blogId,
        reactionType,
      }).unwrap();

      toast.success(`${reactionEmoji[reactionType]} reacted successfully.`);
    } catch (error) {
      ErrorNotification(error, message.FAILED.REACTION);
    }
  };

  const reactionButton = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        id={`${name}-btn`}
        variant="outline-dark"
        key={name}
        onClick={() => reactionHandler(blog, name as ReactionType)}
      >
        {emoji} {blog.reaction![name as ReactionType]}
      </Button>
    );
  });

  return <div className="reaction-buttons">{reactionButton}</div>;
};

export default ReactionButtons;
