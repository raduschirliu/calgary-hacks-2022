import React from 'react';

export default function NavContainer() {
  return (
    <div className="container mx-auto px-4 col-span-1">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded-full"
        onClick={() => {
          alert('Creating a workspace!');
        }}
      >
        Create Workspace
      </button>
    </div>
  );
}
