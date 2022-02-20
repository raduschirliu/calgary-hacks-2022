import React, { useContext } from 'react';
import { WorkspaceContext } from '../../contexts/WorkspaceContext';

export default function NavContainer() {
  const { workspaces, changeCurrentWorkspace, createWorkspace } =
    useContext(WorkspaceContext);

  return (
    <div className="container max-w-xs mr-6 p-2 flex flex-col bg-white rounded-md">
      {/* Create workspace button */}
      <button
        className="my-1 mb-6 py-0.5 rounded hover:bg-amber-50 transition-colors"
        data-mdb-ripple="true"
        onClick={() => {
          alert('todo: create workspace');
        }}
      >
        Create Workspace
      </button>

      {/* Workspaces */}
      {workspaces.map((workspace) => {
        return (
          <button
            key={workspace.id}
            className="w-full my-1 py-0.5 rounded hover:bg-amber-50 transition-colors"
            data-mdb-ripple="true"
            onClick={() => {
              changeCurrentWorkspace(workspace.id);
            }}
          >
            {workspace.name}
          </button>
        );
      })}
    </div>
  );
}
