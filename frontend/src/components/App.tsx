import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/Landing';
import DashboardPage from '../pages/Dashboard';
import { useEffect } from 'react';

const AuthProtected = ({ component, ...rest }: any) => {
  const Page = withAuthenticationRequired(component, { returnTo: '/' });
  return <Page {...rest} />;
};

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return;

    getAccessTokenSilently().then((res) => {
      console.log(res);
    });
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="my-8 mx-24">
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
