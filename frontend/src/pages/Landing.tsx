import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();

  return (
    <div>
      <p>hi this is a landing page</p>
      {isAuthenticated ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        <button
          onClick={() => {
            loginWithPopup();
          }}
        >
          login!!
        </button>
      )}
    </div>
  );
};

export default LandingPage;
