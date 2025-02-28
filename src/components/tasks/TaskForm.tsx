import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Task } from "@/types/task";

type TaskFormData = Omit<Task, "id">;

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
  initialData?: Task;
  onCancel?: () => void;
}

const statusOptions = [
  { value: "todo", label: "To Do", color: "bg-white/70 text-blue-500" },
  {
    value: "in-progress",
    label: "In Progress",
    color: "bg-sky-50/70 text-sky-600",
  },
  {
    value: "review",
    label: "Review",
    color: "bg-yellow-50/70 text-yellow-600",
  },
  { value: "done", label: "Done", color: "bg-green-50/70 text-green-600" },
] as const;

const priorityOptions = [
  {
    value: "low",
    label: "Low Priority",
    color: "bg-emerald-50/70 border-emerald-200 text-emerald-600",
    dotColor: "bg-emerald-500",
  },
  {
    value: "medium",
    label: "Medium Priority",
    color: "bg-amber-50/70 border-amber-200 text-amber-600",
    dotColor: "bg-amber-500",
  },
  {
    value: "high",
    label: "High Priority",
    color: "bg-rose-50/70 border-rose-200 text-rose-600",
    dotColor: "bg-rose-500",
  },
] as const;

export function TaskForm({ onSubmit, initialData, onCancel }: TaskFormProps) {
  const [task, setTask] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "todo",
    priority: initialData?.priority || "medium",
    dueDate: initialData?.dueDate ? new Date(initialData.dueDate) : undefined,
    timeEstimate: initialData?.timeEstimate || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...task,
      dueDate: task.dueDate?.toISOString(),
      timeEstimate: Number(task.timeEstimate) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Title</label>
        <Input
          placeholder="Task title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
          className="bg-white/70 backdrop-blur-xl border-neutral-200 focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">
          Description
        </label>
        <Textarea
          placeholder="Task description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          rows={3}
          className="bg-white/70 backdrop-blur-xl border-neutral-200 focus:border-blue-500 transition-colors resize-none"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Status</label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <Badge
                key={status.value}
                variant="secondary"
                className={`${
                  status.color
                } cursor-pointer transition-all duration-200 ${
                  task.status === status.value
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "hover:ring-2 hover:ring-blue-200 hover:ring-offset-2"
                }`}
                onClick={() => setTask({ ...task, status: status.value })}
              >
                {status.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((priority) => (
              <Badge
                key={priority.value}
                variant="secondary"
                className={`backdrop-blur-xl border ${
                  priority.color
                } cursor-pointer transition-all duration-200 ${
                  task.priority === priority.value
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "hover:ring-2 hover:ring-blue-200 hover:ring-offset-2"
                }`}
                onClick={() => setTask({ ...task, priority: priority.value })}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${priority.dotColor} mr-2`}
                ></span>
                {priority.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Due Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal bg-white/70 backdrop-blur-xl border-neutral-200 hover:bg-white/80 ${
                  !task.dueDate && "text-neutral-500"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {task.dueDate ? format(task.dueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={task.dueDate}
                onSelect={(date) => setTask({ ...task, dueDate: date })}
                initialFocus
                className="rounded-md border border-neutral-200"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Time Estimate (hours)
          </label>
          <Input
            type="number"
            placeholder="0"
            value={task.timeEstimate}
            onChange={(e) => setTask({ ...task, timeEstimate: e.target.value })}
            min="0"
            step="0.5"
            className="bg-white/70 backdrop-blur-xl border-neutral-200 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="bg-white/50 backdrop-blur-xl hover:bg-white/70 hover:shadow-sm hover:shadow-neutral-200/30"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-sky-500 hover:shadow-md hover:shadow-blue-200/40"
        >
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
