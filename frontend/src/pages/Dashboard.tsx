import NavContainer from '../components/dashboard/NavContainer';
import Header from '../components/dashboard/Header';
import WorkspaceContainer from '../components/dashboard/WorkspaceContainer';
import Logo from '../assets/logo.png';
import HorizontalPeter from '../assets/horizontal_peter.png';

const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-4">
        <div className="flex-1 flex flex-row">
          <img src={HorizontalPeter} alt="Logo" className="h-12"/>
          <p className="font-['Permanent_Marker'] ml-5 mt-2">Homework Homies</p>
        </div>
        <Header />
      </div>

      <div className="flex flex-row">
        <NavContainer />
        <WorkspaceContainer />
      </div>
    </div>
  );
};

export default DashboardPage;
