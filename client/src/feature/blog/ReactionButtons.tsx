import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { IBlog, reactionEmoji, ReactionType } from '../../types';
import { useUpdateReactionMutation } from './blogApiSlice';

interface IReactionButtonsProps {
  blog: IBlog;
}

const ReactionButtons = ({ blog }: IReactionButtonsProps) => {
  const [updateReaction] = useUpdateReactionMutation();
  const reactionHandler = async (blog: IBlog, reactionType: ReactionType) => {
    try {
      await updateReaction({
        blogId: blog.blogId,
        reactionType,
      });
      toast.success('Reacted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const reactionButton = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
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
