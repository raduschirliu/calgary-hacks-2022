import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ITask from '../models/Task';
import { IWorkspace, IWorkspacePreview } from '../models/Workspace';

interface IWorkspaceContext {
  currentWorkspace: IWorkspace | null;
  workspaces: IWorkspacePreview[];

  // Maybe return a success status promise instead of void?
  createWorkspace: (name: string) => void;
  changeCurrentWorkspace: (id: string) => void;
  inviteToWorkspace: (email: string) => void;
  updateWorkspaceList: () => void;

  addTask: (task: ITask) => void;
  updateTask: (task: ITask) => void;
}

const API_URL = process.env['REACT_APP_API_URL'] || 'localhost:8000';
export const WorkspaceContext = React.createContext<IWorkspaceContext>(
  null as any
);

export default function WorkspaceProvider({ children }: { children: any }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  /**
   * State
   */
  const [authToken, setAuthToken] = useState<string>('');
  const [currentWorkspace, setCurrentWorkspace] = useState<IWorkspace | null>(
    null
  );
  const [workspaces, setWorkspaces] = useState<IWorkspacePreview[]>([]);

  const getHeaders = useCallback(() => {
    return { headers: { Authorization: `Bearer ${authToken}` } };
  }, [authToken]);

  /**
   * Functions
   */

  // Update the list of workspace previews
  const updateWorkspaceList = useCallback(() => {
    axios
      .get(`${API_URL}/workspace`, getHeaders())
      .then((res) => {
        setWorkspaces(res.data as IWorkspacePreview[]);
      })
      .catch(console.error);
  }, [setWorkspaces, getHeaders]);

  // Create a new workspace
  const createWorkspace = (name: string) => {
    axios
      .post(
        `${API_URL}/workspace`,
        {
          name,
        },
        getHeaders()
      )
      .then((res) => {
        setWorkspaces((cur: IWorkspacePreview[]) => [
          ...cur,
          res.data as IWorkspacePreview,
        ]);
      })
      .catch(console.error);
  };

  // Change the current workspace and load the new one
  const changeCurrentWorkspace = (id: string) => {
    axios
      .get(`${API_URL}/workspace/${id}`, getHeaders())
      .then((res) => {
        setCurrentWorkspace(res.data as IWorkspace);
      })
      .catch(console.error);
  };

  // Invite a user to our current workspace (if valid)
  const inviteToWorkspace = (email: string) => {};

  // Add a new task to our current workspace (if valid)
  const addTask = (task: ITask) => {};

  // Update a task (if valid)
  const updateTask = (task: ITask) => {};

  /**
   * Effects
   */

  // Fetch workspaces on initial load
  useEffect(() => {
    if (authToken.length === 0) return;
    console.log('update workspace list');
    updateWorkspaceList();
  }, [authToken, updateWorkspaceList]);

  // Fetch JWT when it's updated
  useEffect(() => {
    if (!isAuthenticated) return;

    getAccessTokenSilently()
      .then((token: string) => {
        setAuthToken(token);
      })
      .catch((err: any) => {
        console.error('Failed to get auth token:');
        console.error(err);
      });
  }, [isAuthenticated, getAccessTokenSilently, setAuthToken]);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        createWorkspace,
        changeCurrentWorkspace,
        inviteToWorkspace,
        updateWorkspaceList,
        addTask,
        updateTask,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
