import React from 'react';
import { UserCircleIcon } from '@heroicons/react/solid';
import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
  const { user } = useAuth0();

  return !!user ? (
    <div className="flex flex-row-reverse">
      <UserCircleIcon className="w-5 h-5" />
      <div>Hello {user.name}</div>
    </div>
  ) : (
    <p>loading!!</p>
  );
}
