import { Router } from 'express';
import { blogFinder, isAdminOrAuthor } from '../../middleware/helper';
import blogController from '../controllers/blogController';

const blogRouter = Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:slug', blogController.getBlog);
blogRouter.post('/', blogController.create);
blogRouter.put('/toggle/:slug', blogFinder, blogController.toggle);
blogRouter.put('/:slug', isAdminOrAuthor, blogFinder, blogController.update);

export default blogRouter;
