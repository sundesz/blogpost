import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageTitle from '../../components/PageTitle';
import { IBlog, ICreateUpdateCommentParams } from '../../types';
import { capitalize, isFetchBaseQueryError } from '../../utils';
import { useCreateCommentMutation } from './commentApiSlice';
import CommentForm from './CommentForm';

const CreateComment = () => {
  const navigate = useNavigate();
  const [createComment] = useCreateCommentMutation();
  let { state } = useLocation() as { state: { blog: IBlog } };

  const onSubmit = async (commentData: ICreateUpdateCommentParams) => {
    try {
      await createComment(commentData).unwrap();
      toast.success(`Comment added successfully.`);
      navigate(`/blogs/${state.blog.slug}`);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        const errorCodes = [400, 401];
        let errMessage;
        if (!error?.status) {
          errMessage = 'No Server Response';
        } else if (errorCodes.includes(error.status as number)) {
          errMessage = error.data as string;
        } else {
          errMessage = 'Failed adding comment.';
        }
        toast.error(errMessage);
      }
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
