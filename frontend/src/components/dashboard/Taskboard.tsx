import React from 'react';
import ITask from '../../models/Task';
import IUser from '../../models/User';
import TaskItem from './TaskItem';

export default function Taskboard({
  tasks,
  users,
}: {
  tasks: ITask[];
  users: IUser[];
}) {
  return (
    <div className="bg-white p-4 shadow-sm rounded-md">
      <p className="font-medium">Taskboard</p>

      <div className="ml-2">
        {tasks.map((task) => {
          return <TaskItem task={task} users={users} />;
        })}
      </div>

      <button
        className="ml-2 p-2 hover:bg-amber-50 rounded transition-colors"
        data-mdb-ripple="true"
        onClick={() => alert('Adding a task!')}
      >
        Add a Task
      </button>
    </div>
  );
}
