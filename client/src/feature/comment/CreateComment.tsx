import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageTitle from '../../components/PageTitle';
import { Blog, CreateUpdateCommentParams } from '../../types';
import { capitalize } from '../../utils';
import ErrorNotification from '../../utils/ErrorNotification';
import { message } from '../../utils/notificationMessage';
import { useCreateCommentMutation } from './commentApiSlice';
import CommentForm from './CommentForm';

const CreateComment = () => {
  const navigate = useNavigate();
  const [createComment] = useCreateCommentMutation();
  let { state } = useLocation() as { state: { blog: Blog } };

  const onSubmit = async (commentData: CreateUpdateCommentParams) => {
    try {
      await createComment(commentData).unwrap();
      toast.success(message.SUCCESS.CREATE_COMMENT);
      navigate(`/blogs/${state.blog.slug}`);
    } catch (error) {
      ErrorNotification(error, message.FAILED.CREATE_COMMENT);
    }
  };

  return (
    <Container className="content-container py-5">
      <PageTitle
        title={`Add new comment for: ${capitalize(state.blog.title)}`}
      />
      <CommentForm blogId={state.blog.blogId} onSubmit={onSubmit} />
    </Container>
  );
};

export default CreateComment;
