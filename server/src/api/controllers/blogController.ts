import { NextFunction, RequestHandler } from 'express';
// import { Op, Sequelize } from 'sequelize';
import { sequelize } from '../../db';
import { Blog, Comment, Rating, User } from '../../db/models';
import { NewBlogType, UpdateBlogType, ReactionType } from '../../types';

/**
 * Reaction count subquery
 * @param reactionType
 * @returns
 */
const reactionCountSubQuery = (reactionType: ReactionType) => {
  return sequelize.literal(`(
    SELECT COUNT(*)
    FROM reaction AS reaction
    WHERE
        reaction.blog_id = "blog".blog_id
        AND
        reaction.reaction_type ='${reactionType}'
)`);
};

/**
 * Rating count subquery
 * @param reactionType
 * @returns
 */
const ratingCountSubQuery = (star: number) => {
  return sequelize.literal(`(
    SELECT COUNT(*)
    FROM ratings AS ratings
    WHERE
        ratings.blog_id = "blog".blog_id
        AND
        ratings.star ='${star}'
)`);
};

/**
 * Get a blog
 */
const getBlog: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { id: blogId } = req.params as { id: string };

    const blog = await Blog.findOne({
      attributes: [
        'blogId',
        'title',
        'content',
        'slug',
        'updatedAt',
        [reactionCountSubQuery('thumbsUp'), 'thumbsUp'],
        [reactionCountSubQuery('wow'), 'wow'],
        [reactionCountSubQuery('heart'), 'heart'],
        [ratingCountSubQuery(1), 'rating_1'],
        [ratingCountSubQuery(2), 'rating_2'],
        [ratingCountSubQuery(3), 'rating_3'],
        [ratingCountSubQuery(4), 'rating_4'],
        [ratingCountSubQuery(5), 'rating_5'],
      ],
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'userId'],
          where: { isActive: true },
        },
        {
          model: Rating,
          attributes: ['star'],
          where: { published: true, passive: false },
          required: false,
        },
        {
          model: Comment,
          attributes: [
            'commentId',
            'blogId',
            'userId',
            'title',
            'content',
            'updatedAt',
          ],
          where: { published: true, passive: false },
          required: false,
        },
      ],
      where: { blogId, published: true, passive: false },
      order: [['updatedAt', 'DESC']],
    });

    if (!blog) {
      return res.sendStatus(404).end();
    }

    res.json(blog);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Get all blogs
 */
const getAllBlogs: RequestHandler = async (_req, res, next: NextFunction) => {
  try {
    const blogs = await Blog.findAll({
      attributes: [
        'blogId',
        'title',
        [sequelize.fn('LEFT', sequelize.col('content'), 50), 'content'], // Return first n characters in the string
        'slug',
        [
          sequelize.literal(`(SELECT COUNT(*)
          FROM ratings AS rating
          WHERE
              rating.blog_id = "blog".blog_id
              AND
              rating.passive = false
              AND
              rating.published = true)`),
          'rating',
        ],
      ],
      include: { model: User, attributes: ['name', 'email', 'userId'] },
      where: { published: true },
      order: [['updatedAt', 'DESC']],
    });
    res.json(blogs);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Create new Blog
 * only admin and authors can create blog (checked through isAdminOrAuthor middleware)
 */
const create: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.session.data!.userId;

    const { title, content, published, slug } = req.body as NewBlogType;
    const newBlog = await Blog.create(
      {
        userId,
        title,
        content,
        slug,
        published,
        passive: false,
      },
      { returning: false }
    );

    res.json(newBlog);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Update Blog
 * only admin and authors can update blog (checked through isAdminOrAuthor middleware)
 */
const update: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const sessionData = req.session.data;

    const blog = req.blog as Blog;
    const { title, content, slug, published, userId } =
      req.body as UpdateBlogType;

    // only admin can change the user
    const updateUserId = sessionData?.role === 'admin' ? userId : blog.userId;

    blog.title = title ? title : blog.title;
    blog.content = content ? content : blog.content;
    blog.slug = slug ? slug : blog.slug;
    blog.userId = updateUserId ? updateUserId : blog.userId;
    blog.published = published === undefined ? blog.published : published;

    await blog.save();

    res.json(blog);
  } catch (error: unknown) {
    next(error);
  }
};

/**
 * Deactivate/Activate Blog
 */
const toggle: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const sessionData = req.session.data;
    const blog = req.blog as Blog;

    // only admin and blog creator can deactivate /activate the blog
    const hasAccess =
      sessionData?.role === 'admin' || sessionData?.userId === blog.userId;

    if (!hasAccess) {
      return res.status(401).end();
    }

    blog.passive = !blog.passive;
    await blog.save();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default {
  getBlog,
  getAllBlogs,
  create,
  update,
  toggle,
};
