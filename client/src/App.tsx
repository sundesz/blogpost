import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import Page404 from './components/Page404';
import Login from './feature/auth/Login';
import Logout from './feature/auth/Logout';
import RequireAuth from './feature/auth/RequireAuth';
import BlogList from './feature/blog/BlogList';
import CreateBlog from './feature/blog/CreateBlog';
import SingleBlog from './feature/blog/SingleBlog';
import UpdateBlog from './feature/blog/UpdateBlog';
import Home from './feature/home/Home';
import SignUp from './feature/signup/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import RequireNoAuth from './feature/auth/RequireNoAuth';
import AuthorList from './feature/author/AuthorList';
import SingleAuthor from './feature/author/SingleAuthor';
import CreateComment from './feature/comment/CreateComment';
import SingleUser from './feature/user/SingleUser';
import SingleComment from './feature/comment/SingleComment';

const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        style={{ width: '600px' }}
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs">
            <Route index element={<BlogList />} />
            <Route path=":blogSlug" element={<SingleBlog />} />
          </Route>

          <Route path="authors">
            <Route index element={<AuthorList />} />
            <Route path=":authorId" element={<SingleAuthor />} />
          </Route>
          <Route path="users/:userId" element={<SingleUser />} />

          <Route path="comments">
            <Route path="new" element={<CreateComment />} />
            {/* <Route path=":commentId" element={<SingleComment />} /> */}
          </Route>

          <Route element={<RequireNoAuth />}>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="blogs">
              <Route path="new" element={<CreateBlog />} />
              <Route path="update/:blogSlug" element={<UpdateBlog />} />
            </Route>
            <Route path="/signout" element={<Logout />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
