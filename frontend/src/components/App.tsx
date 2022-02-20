import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Link, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/Landing';
import DashboardPage from '../pages/Dashboard';

const AuthProtected = ({ component, ...rest }: any) => {
  const Page = withAuthenticationRequired(component, { returnTo: '/' });
  return <Page {...rest} />;
};

function App() {
  const { logout, loginWithPopup, isAuthenticated } = useAuth0();

  console.log(isAuthenticated);

  return (
    <div>
      <button
        onClick={() => {
          loginWithPopup();
        }}
      >
        login
      </button>
      <br />
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <br />
      <Link to="/dashboard">dash link</Link>
      <br />
      <br />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={<AuthProtected component={DashboardPage} />}
        />
      </Routes>
    </div>
  );
}

export default App;
