import { Dialog, DialogTitle, Modal } from '@mui/material';
import React, { useState } from 'react';
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-white p-4 shadow-sm rounded-md">
      <p className="font-medium">Taskboard</p>

      <div className="ml-2 my-2">
        {tasks.map((task) => {
          return <TaskItem key={task.id} task={task} users={users} />;
        })}
      </div>

      <button
        className="ml-2 p-2 hover:bg-amber-50 rounded transition-colors"
        data-mdb-ripple="true"
        onClick={() => setModalOpen(true)}
      >
        Add a Task
      </button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-20 bg-white rounded">
          <p className="font-medium font-lg mb-2">Add a Task</p>
        </div>
      </Dialog>
    </div>
  );
}
