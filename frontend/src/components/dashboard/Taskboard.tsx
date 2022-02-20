import React from 'react';
import ITask from '../../models/Task';
import IUser from '../../models/User';
import TaskItem from './TaskItem';

export default function Taskboard({
  tasks,
  users,
}: {
  tasks?: ITask[];
  users?: IUser[];
}) {
  if (!tasks || !users) {
    return <p>LOADING!</p>;
  }

  return (
    <div className="bg-red-100">
      <h1>Taskboard</h1>
      <div>
        {tasks.map((task) => {
          return <TaskItem task={task} users={users} />;
        })}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded-full"
        onClick={() => alert('Adding a task!')}
      >
        Add A Task
      </button>
    </div>
  );
}
