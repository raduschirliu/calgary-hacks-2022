import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Link, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/Landing';
import DashboardPage from '../pages/Dashboard';
import { useContext, useEffect } from 'react';
import { UiContext } from '../contexts/UiContext';
import WorkspaceContext from '../contexts/WorkspaceContext';

const AuthProtected = ({ component, ...rest }: any) => {
  const Page = withAuthenticationRequired(component, { returnTo: '/' });
  return <Page {...rest} />;
};

function App() {
  const { logout, loginWithPopup, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const { showSnackbar } = useContext(UiContext);

  useEffect(() => {
    if (!isAuthenticated) return;

    getAccessTokenSilently().then((res) => {
      console.log(res);
    });
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div>
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
