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
    <div className="h-screen w-screen bg-off-white">
      <div className="py-8 px-24">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={<AuthProtected component={DashboardPage} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
