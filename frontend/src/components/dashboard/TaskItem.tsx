import React from 'react';
import ITask from '../../models/Task';
import IUser from '../../models/User';

export default function TaskItem({
  task,
  users,
}: {
  task: ITask;
  users: IUser[];
}) {
  function getCompletedByList() {
    let names: string[] = [];
    task.completedBy.map((completedUserId) => {
      const userName = users.find((user) => user.id === completedUserId)?.name;
      if (userName) {
        names.push(userName);
      }
      return null;
    });
    return names.join(', ');
  }

  return (
    <div className="grid grid-cols-2">
      <div>{task.name}</div>
      <div>completed by: {getCompletedByList()}</div>
    </div>
  );
}
