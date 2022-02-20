import React from 'react';

export default function Profile({ username }: { username: string }) {
  return <div className="text-right">Hello {username}</div>;
}
