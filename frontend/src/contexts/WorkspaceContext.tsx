import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ITask from '../models/Task';
import IUser from '../models/User';
import { IWorkspace, IWorkspacePreview } from '../models/Workspace';

interface IWorkspaceContext {
  currentWorkspace: IWorkspace | null;
  workspaces: IWorkspacePreview[];
  isLoading: boolean;

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
  const [jwt, setJwt] = useState<string | null>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState<IWorkspace | null>(
    null
  );
  const [workspaces, setWorkspaces] = useState<IWorkspacePreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const baseHeader = {
    Bearer: `Token ${jwt}`,
  };

  /**
   * Functions
   */

  // Update the list of workspace previews
  const updateWorkspaceList = () => {
    if (isLoading) return;
    setIsLoading(true);

    axios
      .get(`${API_URL}/workspace`, { headers: baseHeader })
      .then((res) => {
        setWorkspaces(res.data as IWorkspacePreview[]);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Create a new workspace
  const createWorkspace = (name: string) => {
    if (isLoading) return;
    setIsLoading(true);

    axios
      .post(
        `${API_URL}/workspace`,
        {
          name,
        },
        { headers: baseHeader }
      )
      .then((res) => {
        setWorkspaces((cur: IWorkspacePreview[]) => [
          ...cur,
          res.data as IWorkspacePreview,
        ]);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Change the current workspace and load the new one
  const changeCurrentWorkspace = (id: string) => {
    if (isLoading) return;
    setIsLoading(true);

    axios
      .get(`${API_URL}/workspace/${id}`, { headers: baseHeader })
      .then((res) => {
        setCurrentWorkspace(res.data as IWorkspace);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Invite a user to our current workspace (if valid)
  const inviteToWorkspace = (email: string) => {};

  // Add a new task to our current workspace (if valid)
  const addTask = (task: ITask) => {
    if (isLoading) return;
    setIsLoading(true);

    axios
      .post(
        `${API_URL}/task`,
        {
          deadline: task.deadline,
          difficulty: task.difficulty,
          name: task.name,
          category: task.category,
          workspaces_id: currentWorkspace?.id,
        },
        { headers: baseHeader }
      )
      .then((res) => {
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
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // Update a task (if valid)
  const updateTask = (task: ITask) => {
    if (isLoading || !isAuthenticated) return;
    setIsLoading(true);

    axios
      .put(`${API_URL}/task/${task.id}`, {}, { headers: baseHeader })
      .then((res) => {
        // returns an updated score for the active user
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
        // This is a sanity check for typescript, theoretically there is no way the user isn't in the current workspace's list of users.
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
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  /**
   * Effects
   */

  // Fetch workspaces on initial load
  useEffect(() => {
    updateWorkspaceList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch JWT when it's updated
  useEffect(() => {
    if (!isAuthenticated) return;

    getAccessTokenSilently()
      .then((token: string) => {
        setJwt(token);
      })
      .catch((err: any) => {
        console.error('Failed to get JWT:');
        console.error(err);
      });
  }, [isAuthenticated, getAccessTokenSilently, setJwt]);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        workspaces,
        isLoading,
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
