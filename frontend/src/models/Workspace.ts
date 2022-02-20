import ITask from './Task';
import IUser from './User';

export interface IWorkspacePreview {
  id: string;
  name: string;
}

export interface IWorkspace {
  id: string;
  name: string;
  users: IUser[];
  tasks: ITask[];
}
