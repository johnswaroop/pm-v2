export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  timeEstimate?: number;
}
