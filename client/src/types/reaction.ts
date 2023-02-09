import { IBlog } from './blog';

export type ReactionType = 'thumbsUp' | 'wow' | 'heart';

export const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
};

export interface IReaction {
  thumbsUp: number;
  heart: number;
  wow: number;
}

export interface IUpdateReactionParams {
  blogId: IBlog['blogId'];
  reactionType: ReactionType;
}
