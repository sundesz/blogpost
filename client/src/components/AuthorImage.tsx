import { Author } from '../types';

interface AuthorImageProps {
  author: Author;
}

const AuthorImage = ({ author }: AuthorImageProps) => {
  if (!author.profilePic) return null;

  return (
    <img
      src={author.profilePic}
      alt={author.name}
      title={author.name}
      className="author-image"
    />
  );
};

export default AuthorImage;
