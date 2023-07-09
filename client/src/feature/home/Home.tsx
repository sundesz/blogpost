import { selectCurrentUser } from '../../feature/auth/authSlice';
import { useAppSelector } from '../../hooks/reduxToolkit';
import homepageImage from '../../assets/homepage.webp';

const Home = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <section className="py-5 text-center">
      <img src={homepageImage} alt="Welcome to Blog post App" />
    </section>
  );
};

export default Home;
