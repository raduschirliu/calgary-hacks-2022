import React, { useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import Taskboard from './Taskboard';

export default function WorkspaceContainer() {
  const { currentWorkspace } = useContext(WorkspaceContext);

  return (
    <div className="container mx-auto px-4 col-span-3">
      <Profile />
      <Leaderboard users={currentWorkspace?.users} />
      <Taskboard
        tasks={currentWorkspace?.tasks}
        users={currentWorkspace?.users}
      />
    </div>
  );
}
