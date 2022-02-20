import { Dialog, DialogTitle, Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UiContext } from '../../contexts/UiContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';
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
  difficulty: number;
  category?: string;
}

export default function Taskboard({
  tasks,
  users,
}: {
  tasks: ITask[];
  users: IUser[];
}) {
  const { showSnackbar } = useContext(UiContext);
  const { addTask } = useContext(WorkspaceContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IAddTaskForm>({
    defaultValues: {
      name: '',
      difficulty: 3,
    },
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const formDifficulty = watch(['difficulty']);

  const submitForm = (data: IAddTaskForm) => {
    addTask({
      id: '',
      name: data.name,
      category: data.category || '',
      difficulty: data.difficulty,
      deadline: '',
      completedBy: [],
    });

    showSnackbar({
      autoHideDuration: 2500,
      children: (
        <div
          className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
          role="alert"
        >
          Created a new task: '{data.name}'
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
        className="ml-2 p-2 hover:bg-peach rounded transition-colors"
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
          <p className="font-normal font-lg mb-6">Add a Task</p>

          <form onSubmit={handleSubmit(submitForm)}>
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label text-gray-600">
                Name
              </label>
              <input
                className={inputClass}
                id="name"
                type="text"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="text-sm font-light text-red-400">
                  Name is required
                </span>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="form-label text-gray-600">
                Category{' '}
                <span className="text-light text-gray-300">- optional</span>
              </label>
              <input
                className={inputClass}
                id="category"
                type="text"
                {...register('category')}
              />
            </div>

            {/* Difficulty */}
            <div className="relative pt-1">
              <label htmlFor="difficulty" className="form-label">
                Difficulty: {formDifficulty} / 5
              </label>
              <input
                type="range"
                className="
                  form-range
                  appearance-none
                  w-full
                  h-6
                  p-0
                  bg-transparent
                  focus:outline-none focus:ring-0 focus:shadow-none
                "
                min={0}
                max={5}
                step="1"
                id="difficulty"
                {...register('difficulty', { required: true })}
              />
            </div>

            <button
              type="submit"
              data-mdb-ripple="true"
              className="mt-4 w-full py-2 rounded hover:bg-peach transition duration-150 ease-in-out"
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
