import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Person, PersonPlus, PersonDash } from 'react-bootstrap-icons';
import { useAppSelector } from '../../hooks/reduxToolkit';
import { selectCurrentUser } from '../../feature/auth/authSlice';

const Navigation: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectCurrentUser);

  const userInfo = (
    <>
      {user.profilePic && (
        <img
          src={user.profilePic}
          alt={`Welcome ${user.email}`}
          title={`Welcome ${user.email}`}
          className="welcome-image"
        />
      )}
      <div>
        <div>Welcome</div>
        <div className="font-weight-bold">{user.email}</div>
      </div>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand id="app-name" as={Link} to="/">
          Blog post
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end right-side-link">
          <Nav className="me-auto">
            <Nav.Link id="blog-link" as={Link} to="/blogs" title="Blogs">
              Blogs
            </Nav.Link>
            <Nav.Link id="author-link" as={Link} to="/authors" title="Author">
              Authors
            </Nav.Link>
            {user.role === 'author' && (
              <Nav.Link
                id="new-blog-link"
                as={Link}
                to="/blogs/new"
                title="Create blog"
              >
                Create blog
              </Nav.Link>
            )}
          </Nav>
          {user.isAuthenticate ? (
            <>
              <Nav>
                <Navbar.Text className="px-3 username">{userInfo}</Navbar.Text>
                <Nav.Link
                  id="signout-link"
                  as={Link}
                  to="/signout"
                  title="Sign out"
                >
                  <PersonDash size={32} />
                  <div className="link-description">Sign out</div>
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav>
                <Nav.Link
                  className="px-3"
                  id="signin-link"
                  as={Link}
                  to="/signin"
                  title="Sign in"
                >
                  <Person size={32} />
                  <div className="link-description">Sign in</div>
                </Nav.Link>
                <Nav.Link
                  id="signup-link"
                  as={Link}
                  to="/signup"
                  title="Sign up"
                >
                  <PersonPlus size={32} />
                  <div className="link-description">Sign up</div>
                </Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
