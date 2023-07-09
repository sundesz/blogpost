import { apiSlice } from '../../app/api/apiSlice';
import { Comment, CreateUpdateCommentParams } from '../../types';

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, CreateUpdateCommentParams>({
      query: (newComment) => ({
        url: `/comments/${newComment.blogId}`,
        method: 'POST',
        body: {
          title: newComment.title,
          content: newComment.content,
          published: newComment.published,
          rating: newComment.rating,
        },
      }),
      invalidatesTags: ['Blog'],
    }),

    updateComment: builder.mutation<Comment, CreateUpdateCommentParams>({
      query: (updateComment) => ({
        url: `/comments/${updateComment.commentId}`,
        method: 'PUT',
        body: {
          title: updateComment.title,
          content: updateComment.content,
          published: updateComment.published,
        },
      }),
      invalidatesTags: ['Comments'],
    }),

    toggleComment: builder.mutation<Comment, CreateUpdateCommentParams>({
      query: (updateComment) => ({
        url: `/comments/${updateComment.commentId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useToggleCommentMutation,
} = commentApiSlice;
