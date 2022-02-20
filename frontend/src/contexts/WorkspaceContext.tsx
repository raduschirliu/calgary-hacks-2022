import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ITask from '../models/Task';
import { IWorkspace } from '../models/Workspace';

interface IWorkspaceContext {
  currentWorkspace: number;
  workspaces: IWorkspace[];
  isLoading: boolean;

  // Maybe return a success status promise instead of void?
  createWorkspace: (name: string) => void;
  changeCurrentWorkspace: (id: number) => void;
  inviteToWorkspace: (email: string) => void;
  updateWorkspaces: () => void;

  addTask: (task: ITask) => void;
  updateTask: (task: ITask) => void;
}

const API_URL = process.env['REACT_APP_API_URL'] || 'localhost:8000';
const WorkspaceContext = React.createContext<IWorkspaceContext>(null as any);

export default function WorkspaceProvider({ children }: { children: any }) {
  /**
   * State
   */
  const [currentWorkspace, setCurrentWorkspace] = useState<number>(-1);
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Functions
   */
  const createWorkspace = (name: string) => {};

  const changeCurrentWorkspace = (id: number) => {};
  const inviteToWorkspace = (email: string) => {};
  const updateWorkspaces = () => {};

  const addTask = (task: ITask) => {};
  const updateTask = (task: ITask) => {};

  /**
   * Effects
   */
  
  // Fetch workspaces on initial load
  useEffect(() => {
    updateWorkspaces();
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        isLoading,
        createWorkspace,
        changeCurrentWorkspace,
        inviteToWorkspace,
        updateWorkspaces,
        addTask,
        updateTask,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
