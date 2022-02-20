export default interface ITask {
  id: string;
  name: string;
  completedBy: string[];
  difficulty: number;
  category: string;
  deadline: string;
}
