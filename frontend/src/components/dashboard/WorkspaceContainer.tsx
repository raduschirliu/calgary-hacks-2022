import { useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import Leaderboard from './Leaderboard';
import Taskboard from './Taskboard';

export default function WorkspaceContainer() {
  const { currentWorkspace } = useContext(WorkspaceContext);

  return currentWorkspace ? (
    <div className="container mx-auto px-4 col-span-3">
      <Leaderboard users={currentWorkspace.users} />
      <Taskboard
        tasks={currentWorkspace.tasks}
        users={currentWorkspace.users}
      />
    </div>
  ) : (
    <div className="w-full mx-auto bg-white rounded-md">
      <p>Please select or create a new workspace</p>
    </div>
  );
}
