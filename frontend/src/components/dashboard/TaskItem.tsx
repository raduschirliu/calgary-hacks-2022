import { CheckIcon } from '@heroicons/react/solid';
import React from 'react';
import ITask from '../../models/Task';

export default function TaskItem({ task }: { task: ITask }) {
  return (
    <div className="grid grid-cols-2">
      <div>{task.name}</div>
      <div>
        {task.completedBy.map((user) => {
          return <span key={user}>{user}</span>;
        })}
      </div>
    </div>
  );
}
