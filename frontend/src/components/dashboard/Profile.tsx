import React from 'react';
import IUser from '../../models/User';
import { UserCircleIcon } from '@heroicons/react/solid';

export default function Profile({ user }: { user: IUser }) {
  return (
    <div className="text-right">
      <span>
        Hello {user.name} <UserCircleIcon className="w-5 h-5" />
      </span>
    </div>
  );
}
