import Blog from './blogs';
import Reaction from './reaction';
import User from './users';
import Session from './session';
import Rating from './ratings';
import Comment from './comments';

User.hasMany(Blog, { foreignKey: 'user_id' });
Blog.belongsTo(User, { foreignKey: 'user_id' });

Blog.hasMany(Reaction, { foreignKey: 'blog_id' });
Reaction.belongsTo(Blog, { foreignKey: 'blog_id' });

Blog.hasMany(Comment, { foreignKey: 'blog_id' });
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });

Blog.hasMany(Rating, { foreignKey: 'blog_id' });
Rating.belongsTo(Blog, { foreignKey: 'blog_id' });

export { User, Blog, Reaction, Session, Rating, Comment };
