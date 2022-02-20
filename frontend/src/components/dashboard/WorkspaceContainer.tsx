import React from 'react';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import Taskboard from './Taskboard';

export default function WorkspaceContainer() {
  return (
    <div className="col-span-3">
      <Profile username="Tyler" />
      <Leaderboard users={[]} />
      <Taskboard tasks={[]} />
    </div>
  );
}
