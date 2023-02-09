import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(-1)} className="go-back">
      &#8249; go back
    </div>
  );
};

export default GoBack;
