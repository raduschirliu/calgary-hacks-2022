import React, { useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

export default function NavContainer() {
  //const { workspaces } = useContext(WorkspaceContext);

  const workspaces = [
    {
      id: '1',
      name: 'good workspace',
    },
    {
      id: '2',
      name: 'sexy workspace',
    },
  ];

  return (
    <div className="container mx-auto px-4 col-span-1">
      {/* Create workspace button */}
      <div>
        <button
          className="my-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded-full"
          onClick={() => {
            alert('Creating a workspace!');
          }}
        >
          Create Workspace
        </button>
      </div>
      {/* Workspaces */}
      <div>
        {workspaces.map((workspace) => {
          return (
            <button
              key={workspace.id}
              className="my-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-2 rounded-full"
              onClick={() => {
                alert('setting workspace!');
              }}
            >
              {workspace.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
