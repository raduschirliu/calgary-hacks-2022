import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ITask from '../models/Task';
import IUser from '../models/User';
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
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

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
          {
            name,
            id: res.data as string,
          },
        ]);
      })
      .catch(console.error);
  };

  // Change the current workspace and load the new one
  const changeCurrentWorkspace = (id: string) => {
    // First we need to get the new workspace's name.
    const newWorkspace = workspaces.find((w) => w.id === id);

    if (!newWorkspace) {
      // If this fails, we should abort the operation entirely.
      console.log('Selected workspace invalid?');
      return;
    }

    setCurrentWorkspace({
      id: newWorkspace.id,
      name: newWorkspace.name,
      tasks: [],
      users: [],
    });

    // Now we need to update the new workspace's task list and user list independently.
    axios
      .get(`${API_URL}/workspace/${id}/users`, getHeaders())
      .then((res) => {
        setCurrentWorkspace((prev: IWorkspace | null) =>
          prev
            ? {
                ...prev,
                users: res.data as IUser[],
              }
            : prev
        );
      })
      .catch(console.error);

    axios
      .get(`${API_URL}/workspace/${id}/tasks`, getHeaders())
      .then((res) => {
        setCurrentWorkspace((prev: IWorkspace | null) =>
          prev
            ? {
                ...prev,
                tasks: res.data as ITask[],
              }
            : prev
        );
      })
      .catch(console.error);
  };

  // Invite a user to our current workspace (if valid)
  const inviteToWorkspace = (email: string) => {
    if (!currentWorkspace) {
      return;
    }

    axios
      .post(
        `${API_URL}/workspace/${currentWorkspace.id}/invite`,
        {
          users: [email],
        },
        getHeaders()
      )
      .catch(console.error);
  };

  // Add a new task to our current workspace (if valid)
  const addTask = (task: ITask) => {
    console.log('current ws', currentWorkspace);
    axios
      .post(
        `${API_URL}/task`,
        {
          deadline: task.deadline,
          difficulty: task.difficulty,
          name: task.name,
          category: task.category,
          workspace_id: currentWorkspace?.id,
        },
        getHeaders()
      )
      .then((res) => {
        // Returns the id of the new task.
        if (!currentWorkspace) {
          return;
        }
        // Set the id of the newly created task
        const addedTask: ITask = {
          ...task,
          id: res.data,
        };

        const updatedCurrentWorkspace: IWorkspace = {
          ...currentWorkspace,
          tasks: [...currentWorkspace.tasks, addedTask],
        };
        setCurrentWorkspace(updatedCurrentWorkspace);
      })
      .catch(console.error);
  };

  // Update a task (if valid)
  const updateTask = (task: ITask) => {
    axios
      .put(
        `${API_URL}/task/${task.id}`,
        {
          deadline: task.deadline,
          difficulty: task.difficulty,
          name: task.name,
          category: task.category,
          workspace_id: currentWorkspace?.id,
        },
        getHeaders()
      )
      .then((res) => {
        // Returns an updated score for the active user
        if (!currentWorkspace || !user?.sub) {
          return;
        }

        // Update the task as complete, and update the user's score
        const updatedTask: ITask = {
          ...task,
          completedBy: [...task.completedBy, user.sub],
        };

        const currentUser = currentWorkspace.users.find(
          (u) => u.id === user.sub
        );
        // This is a sanity check for typescript:
        // Theoretically there is no way the user isn't in the current workspace's list of users.
        if (!currentUser) {
          return;
        }

        const updatedUser: IUser = {
          ...currentUser,
          score: res.data,
        };

        const updatedCurrentWorkspace: IWorkspace = {
          ...currentWorkspace,
          tasks: currentWorkspace.tasks.map((t) => {
            if (t.id === task.id) {
              return updatedTask;
            } else {
              return t;
            }
          }),
          users: currentWorkspace.users.map((u) => {
            if (u.id === user.sub) {
              return updatedUser;
            } else {
              return u;
            }
          }),
        };
        setCurrentWorkspace(updatedCurrentWorkspace);
      })
      .catch(console.error);
  };

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
