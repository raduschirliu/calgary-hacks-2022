import React, { useContext } from 'react';
import ITask from '../../models/Task';
import IUser from '../../models/User';
import { CheckIcon } from '@heroicons/react/solid';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
import { useAuth0 } from '@auth0/auth0-react';

export default function TaskItem({
  task,
  users,
}: {
  task: ITask;
  users: IUser[];
}) {
  const { user } = useAuth0();
  const { updateTask } = useContext(WorkspaceContext);

  let completedByMe = false;
  let completed: IUser[] = [];

  task.completedBy.map((completedUserId) => {
    const cur = users.find((user) => user.id === completedUserId);
    if (cur && !completed.includes(cur)) {
      if (cur.id === user?.sub) {
        completedByMe = true;
      }

      completed.push(cur);
    }
    return null;
  });

  const taskClicked = () => {
    updateTask(task);
  };

  return (
    <div className="grid grid-cols-[1fr_1fr_120px]">
      <span className="">{task.name}</span>
      <div className="mr-4">
        {users.length > 0 ? (
          <span>completed by: {completed.map((u) => u.name).join(', ')}</span>
        ) : (
          <span></span>
        )}
      </div>

      {completedByMe ? (
        <></>
      ) : (
        <button
          type="button"
          className="inline-block px-4 py-1 border-2 border-peach text-peach font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          onClick={taskClicked}
        >
          Mark Done
        </button>
      )}
    </div>
  );
}
