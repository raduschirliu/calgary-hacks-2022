import { Dialog, DialogTitle, Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UiContext } from '../../contexts/UiContext';
import ITask from '../../models/Task';
import IUser from '../../models/User';
import TaskItem from './TaskItem';

const inputClass = `
  form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
`;

interface IAddTaskForm {
  name: string;
  description?: string;
}

export default function Taskboard({
  tasks,
  users,
}: {
  tasks: ITask[];
  users: IUser[];
}) {
  const { showSnackbar } = useContext(UiContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddTaskForm>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const submitForm = (data: IAddTaskForm) => {
    console.log('submitted');
    console.log(data);

    showSnackbar({
      autoHideDuration: 2500,
      children: (
        <div
          className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
          role="alert"
        >
          Created a new task: '{data.name}'!
        </div>
      ),
    });

    setModalOpen(false);
    reset();
  };

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

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth={true}
      >
        <div className="py-6 px-16 w-full bg-white rounded">
          <p className="font-medium font-lg mb-4">Add a Task</p>

          <form onSubmit={handleSubmit(submitForm)}>
            <input
              className={inputClass}
              type="text"
              placeholder="Name"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className="text-sm font-light text-red-400">
                Name is required
              </span>
            )}

            <textarea
              className={`${inputClass} mt-4`}
              placeholder="Description"
              {...register('description')}
            />

            <button
              type="submit"
              data-mdb-ripple="true"
              className="mt-4 w-full py-2 rounded hover:bg-amber-50 transition duration-150 ease-in-out"
              value="Create"
            >
              Create
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
