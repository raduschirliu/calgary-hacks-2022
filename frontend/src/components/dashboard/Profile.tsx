import React from 'react';
import IUser from '../../models/User';

export default function Profile({ user }: { user: IUser }) {
  return <div className="text-right">Hello {user.name}</div>;
}
