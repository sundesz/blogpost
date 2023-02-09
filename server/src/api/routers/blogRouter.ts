import { Router } from 'express';
import { blogFinder, isAdminOrAuthor } from '../../middleware/helper';
import blogController from '../controllers/blogController';

const blogRouter = Router();

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.get('/:id', blogController.getBlog);
blogRouter.post('/', isAdminOrAuthor, blogController.create);
blogRouter.put('/toggle/:id', blogFinder, blogController.toggle);
blogRouter.put('/:id', isAdminOrAuthor, blogFinder, blogController.update);

export default blogRouter;
