import { useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import Leaderboard from './Leaderboard';
import Taskboard from './Taskboard';

export default function WorkspaceContainer() {
  const { currentWorkspace } = useContext(WorkspaceContext);

  return currentWorkspace ? (
    <div className="container mx-auto">
      <Leaderboard users={currentWorkspace.users} />
      <Taskboard
        tasks={currentWorkspace.tasks}
        users={currentWorkspace.users}
      />
    </div>
  ) : (
    <div className="w-full mx-auto p-4 bg-white rounded-md">
      <p className="text-center">Please select or create a new workspace</p>
    </div>
  );
}
