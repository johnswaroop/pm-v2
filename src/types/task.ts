export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "review" | "done";

export interface TaskFormData {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
  };
  timeEstimate: number;
}

export interface Task extends TaskFormData {
  id: string;
}
