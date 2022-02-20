import React from 'react';
import IUser from '../../models/User';
import { AcademicCapIcon } from '@heroicons/react/solid';

export default function Leaderboard({ users }: { users: IUser[] }) {
  const sortedUsers = [...users].sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });

  const maxScore = sortedUsers.length > 0 ? sortedUsers[0].score : 0;

  return (
    <div className="mb-4 p-4 bg-white shadow-sm rounded-md">
      <p className="font-medium mb-2">Leaderboard</p>

      <div className="ml-2">
        {sortedUsers.map((user, index) => {
          const width = (user.score / maxScore) * 100;

          return (
            <div key={user.id} className="grid grid-cols-2">
              <div className="flex flex-row">
                {user.name}
                {index === 0 ? <AcademicCapIcon className="ml-2 m-auto text-peach w-5 h-5" /> : <></>}
              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full">
                <div
                  className="bg-peach text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full"
                  style={{ width: `${width}%` }}
                >
                  {user.score} / {maxScore}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
