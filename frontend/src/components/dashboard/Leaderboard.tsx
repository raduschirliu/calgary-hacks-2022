import React from 'react';
import IUser from '../../models/User';

export default function Leaderboard({ users }: { users?: IUser[] }) {
  if (!users) {
    return null; 
  }

  return (
    <div className="w-100 bg-white rounded-md">
      <h1>Leaderboard</h1>
      <div>
        {users.map((user, index) => {
          return (
            <div key={index} className="grid grid-cols-2">
              <div>{user.name}</div>
              <div>{user.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
