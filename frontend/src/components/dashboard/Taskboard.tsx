import React from 'react';
import ITask from '../../models/Task';
import TaskItem from './TaskItem';

export default function Taskboard({ tasks }: { tasks: ITask[] }) {
  return (
    <div className="bg-red-100">
      <h1>Taskboard</h1>
      <div>
        {tasks.map((task) => {
          return <TaskItem task={task} />;
        })}
      </div>
    </div>
  );
}
