import { Blog } from './blog';

export type ReactionType = 'thumbsUp' | 'wow' | 'heart';

export const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
};

export interface Reaction {
  thumbsUp: number;
  heart: number;
  wow: number;
}

export interface UpdateReactionParams {
  blogId: Blog['blogId'];
  reactionType: ReactionType;
}
