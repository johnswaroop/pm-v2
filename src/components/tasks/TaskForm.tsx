"use client";

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
import { Task, TaskFormData } from "@/types/task";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
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

export function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "todo",
    priority: initialData?.priority || "medium",
    dueDate: initialData?.dueDate || new Date().toISOString(),
    assignee: initialData?.assignee || { name: "", avatar: "" },
    timeEstimate: initialData?.timeEstimate || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData({
      ...formData,
      dueDate: date ? date.toISOString() : new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="bg-white/70 backdrop-blur-xl border-neutral-200 focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="bg-white/70 backdrop-blur-xl border-neutral-200 focus:border-blue-500 transition-colors resize-none"
          rows={3}
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
                  formData.status === status.value
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "hover:ring-2 hover:ring-blue-200 hover:ring-offset-2"
                }`}
                onClick={() =>
                  setFormData({ ...formData, status: status.value })
                }
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
                  formData.priority === priority.value
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "hover:ring-2 hover:ring-blue-200 hover:ring-offset-2"
                }`}
                onClick={() =>
                  setFormData({ ...formData, priority: priority.value })
                }
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Due Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white/70 backdrop-blur-xl border-neutral-200 hover:bg-white/80"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dueDate
                ? format(new Date(formData.dueDate), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={new Date(formData.dueDate)}
              onSelect={handleDateSelect}
              initialFocus
              className="rounded-md border border-neutral-200"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label htmlFor="timeEstimate" className="text-sm font-medium">
          Time Estimate (hours)
        </label>
        <Input
          id="timeEstimate"
          type="number"
          value={formData.timeEstimate}
          onChange={(e) =>
            setFormData({
              ...formData,
              timeEstimate: Number(e.target.value) || 0,
            })
          }
          min="0"
          step="0.5"
          className="bg-white/70 backdrop-blur-xl border-neutral-200 focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-white/70 hover:bg-white/80"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:shadow-md hover:shadow-blue-200/40"
        >
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
