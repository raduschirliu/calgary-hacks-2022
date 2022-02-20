import { useAuth0 } from '@auth0/auth0-react';

const LandingPage = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <div>
      <p>hi this is a landing page</p>
      <button
        onClick={() => {
          loginWithPopup();
        }}
      >
        login!!
      </button>
    </div>
  );
};

export default LandingPage;
