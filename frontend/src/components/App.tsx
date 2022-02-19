import React from 'react';
import ITask from '../models/Task';
import IUser from '../models/User';
import Leaderboard from './Leaderboard';
import Taskboard from './Taskboard';

const sampleUsers: IUser[] = [
  {
    name: 'Alexa',
    score: 100,
  },
  {
    name: 'Radu',
    score: 150,
  },
  {
    name: 'Tyler',
    score: 300,
  },
  {
    name: 'Jordan',
    score: 20,
  },
];

const sampleTasks: ITask[] = [
  {
    name: 'The first task!',
    usersCompleted: ['Jordan'],
  },
  {
    name: 'The second task!',
    usersCompleted: ['Alexa', 'Radu'],
  },
  {
    name: 'The third task!',
    usersCompleted: ['Tyler'],
  },
];

function App() {
  return (
    <>
      <Leaderboard users={sampleUsers} />
      <Taskboard tasks={sampleTasks} />
    </>
  );
}

export default App;
