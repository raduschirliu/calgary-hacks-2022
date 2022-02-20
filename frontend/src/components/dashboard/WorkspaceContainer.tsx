import React from 'react';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import Taskboard from './Taskboard';

// TODO: take this data from the context instead
const sampleData = {
  user: {
    id: '1',
    name: 'Tyler',
    email: 'tyler.yip@shaw.ca',
    score: 10,
  },
  users: [
    {
      id: '1',
      name: 'Alexa',
      email: 'alexa@aloxo.com',
      score: 10,
    },
    {
      id: '2',
      name: 'Radu',
      email: 'radu@raduwu.com',
      score: 12,
    },
  ],
  tasks: [
    {
      id: '1',
      name: 'Do a thing',
      completedBy: ['Radu'],
      difficulty: 5,
      category: 'hard things',
    },
    {
      id: '2',
      name: 'Do an awesome thing',
      completedBy: [],
      difficulty: 1,
      category: 'easy things',
    },
  ],
};

export default function WorkspaceContainer() {
  return (
    <div className="container mx-auto px-4 col-span-3">
      <Profile user={sampleData.user} />
      <Leaderboard users={sampleData.users} />
      <Taskboard tasks={sampleData.tasks} />
    </div>
  );
}
