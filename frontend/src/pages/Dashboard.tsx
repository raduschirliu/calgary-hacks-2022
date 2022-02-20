import NavContainer from '../components/dashboard/NavContainer';
import WorkspaceContainer from '../components/dashboard/WorkspaceContainer';

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-4">
      <NavContainer />
      <WorkspaceContainer />
    </div>
  );
};

export default DashboardPage;
