import React from 'react';
import IUser from '../../models/User';

export default function Leaderboard({ users }: { users: IUser[] }) {
  return (
    <div className="mb-4 p-4 bg-white shadow-sm rounded-md">
      <p className="font-medium mb-2">Leaderboard</p>

      <div className="ml-2">
        {users.map((user, index) => {
          return (
            <div key={user.id} className="grid grid-cols-2">
              <div>{user.name}</div>
              <div>{user.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
