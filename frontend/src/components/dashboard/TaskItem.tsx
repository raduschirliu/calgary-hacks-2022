import React from 'react';
import ITask from '../../models/Task';

export default function TaskItem({ task }: { task: ITask }) {
  return (
    <>
      <div>{task.name}</div>
      <div>
        {task.completedBy.map((user) => {
          return <div key={user}>{user}</div>;
        })}
      </div>
    </>
  );
}
