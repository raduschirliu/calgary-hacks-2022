import { Dialog } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UiContext } from '../../contexts/UiContext';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

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

interface INewWorkspaceForm {
  name: string;
}

export default function NavContainer() {
  const { showSnackbar } = useContext(UiContext);
  const {
    workspaces,
    currentWorkspace,
    changeCurrentWorkspace,
    createWorkspace,
  } = useContext(WorkspaceContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewWorkspaceForm>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const submitForm = (data: INewWorkspaceForm) => {
    createWorkspace(data.name);
    showSnackbar({
      autoHideDuration: 2500,
      children: (
        <div
          className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
          role="alert"
        >
          Created new workspace '{data.name}'!
        </div>
      ),
    });
    setModalOpen(false);
    reset();
  };

  return (
    <div className="container max-w-xs mr-6 p-2 flex flex-col bg-white shadow-sm rounded-md">
      {/* Create workspace button */}
      <button
        className="my-1 mb-6 py-0.5 rounded hover:bg-peach transition duration-150 ease-in-out"
        data-mdb-ripple="true"
        onClick={() => setModalOpen(true)}
      >
        Create Workspace
      </button>

      {/* Workspaces */}
      {workspaces.map((workspace) => {
        return (
          <button
            key={`nav-${workspace.id}`}
            className={`
              w-full my-1 py-0.5 rounded hover:bg-peach transition duration-150 ease-in-out
              ${
                // This breaks everything wtf
                // currentWorkspace?.id === workspace.id
                //   ? 'underline decoration-peach'
                //   : ''
                ''
              }
            `}
            data-mdb-ripple="true"
            onClick={() => {
              changeCurrentWorkspace(workspace.id);
            }}
          >
            {workspace.name}
          </button>
        );
      })}

      {/* Create workspace dialog */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth={true}
      >
        <div className="py-6 px-16 w-full bg-white rounded">
          <p className="font-medium font-lg mb-4">Create a New Workspace</p>

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
