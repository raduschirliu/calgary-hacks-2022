import React from 'react';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import Taskboard from './Taskboard';

export default function WorkspaceContainer() {
  return (
    <div className="col-span-3">
      <Profile
        user={{
          id: '1',
          name: 'Tyler',
          email: 'tyler.yip@shaw.ca',
          score: 10,
        }}
      />
      <Leaderboard users={[]} />
      <Taskboard tasks={[]} />
    </div>
  );
}
