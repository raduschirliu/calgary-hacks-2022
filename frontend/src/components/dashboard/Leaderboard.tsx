import React, { useContext, useState } from 'react';
import IUser from '../../models/User';
import { AcademicCapIcon } from '@heroicons/react/solid';
import { Dialog } from '@mui/material';
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

interface IInviteForm {
  email: string;
}

export default function Leaderboard({ users }: { users: IUser[] }) {
  const { showSnackbar } = useContext(UiContext);
  const { inviteToWorkspace } = useContext(WorkspaceContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInviteForm>({
    defaultValues: {
      email: '',
    },
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const sortedUsers = [...users].sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });

  const maxScore = sortedUsers.length > 0 ? sortedUsers[0].score : 0;

  const submit = (data: IInviteForm) => {
    showSnackbar({
      autoHideDuration: 2500,
      children: (
        <div
          className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
          role="alert"
        >
          Invited to your workspace: '{data.email}'
        </div>
      ),
    });

    inviteToWorkspace(data.email);
    setShowModal(false);
    reset();
  };

  return (
    <div className="mb-4 p-4 bg-white shadow-sm rounded-md">
      <p className="font-medium mb-2">Leaderboard</p>

      <div className="ml-2 mb-4">
        {sortedUsers.map((user, index) => {
          const width = (user.score / maxScore) * 100;

          return (
            <div key={user.id} className="grid grid-cols-[250px_1fr]">
              <div className="flex flex-row">
                {user.name}
                {index === 0 ? (
                  <AcademicCapIcon className="ml-4 m-auto text-peach w-5 h-5" />
                ) : (
                  <></>
                )}
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full">
                {user.score > 0 ? (
                  <div
                    className="bg-peach text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${width}%` }}
                  >
                    {user.score} / {maxScore}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="inline-block px-4 py-1 border-2 border-peach text-peach font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        data-mdb-ripple="true"
        onClick={() => setShowModal(true)}
      >
        Invite a Homie
      </button>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        fullWidth={true}
      >
        <div className="py-6 px-16 w-full bg-white rounded">
          <p className="font-normal font-lg mb-6">Invite a Homie</p>

          <form onSubmit={handleSubmit(submit)}>
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label text-gray-600">
                Email
              </label>
              <input
                className={inputClass}
                id="name"
                type="text"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span className="text-sm font-light text-red-400">
                  Email is required
                </span>
              )}
            </div>

            <button
              type="submit"
              data-mdb-ripple="true"
              className="mt-4 w-full py-2 rounded hover:bg-peach transition duration-150 ease-in-out"
              value="Invite"
            >
              Invite
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
