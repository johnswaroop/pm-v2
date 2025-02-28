"use client";

import { useState } from "react";
import { Task, TaskFormData } from "@/types/task";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { TaskForm } from "@/components/tasks/TaskForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - Replace with actual data fetching
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Design System Implementation",
    description: "Create a consistent design system for the project",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-04-01",
    assignee: {
      name: "Alex Kim",
      avatar: "",
    },
    timeEstimate: 8,
  },
  {
    id: "2",
    title: "User Authentication",
    description: "Implement user authentication flow",
    status: "todo",
    priority: "medium",
    dueDate: "2024-04-15",
    assignee: {
      name: "Sarah Chen",
      avatar: "",
    },
    timeEstimate: 16,
  },
  {
    id: "3",
    title: "API Integration",
    description: "Connect frontend with backend services",
    status: "review",
    priority: "high",
    dueDate: "2024-04-10",
    assignee: {
      name: "John Doe",
      avatar: "",
    },
    timeEstimate: 12,
  },
];

type Priority = Task["priority"] | "all";

export default function TaskManagementPage() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<Priority>("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority =
      filterPriority === "all" ? true : task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const handleCreateTask = (data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
    setIsCreateModalOpen(false);
  };

  const handleEditTask = (data: TaskFormData) => {
    if (!editingTask) return;
    const updatedTask: Task = {
      ...data,
      id: editingTask.id,
    };
    setTasks(tasks.map((t) => (t.id === editingTask.id ? updatedTask : t)));
    setIsCreateModalOpen(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleMoveTask = (taskId: string, status: Task["status"]) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-sky-200 p-8">
      {/* Header with Search and Filters */}
      <div className="max-w-7xl mx-auto mb-12">
        {/* Unified Header Container */}
        <div className="backdrop-blur-xl bg-white/40 rounded-lg shadow-md shadow-blue-200/20 overflow-hidden">
          {/* Title Bar */}
          <div className="px-8 py-6 border-b border-blue-100/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-800">
                  Task Management
                </h1>
                <p className="text-neutral-600 text-sm mt-1">
                  Organize, track, and manage your team{"'"}s tasks efficiently
                </p>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-sky-600 hover:shadow-lg hover:shadow-blue-200/50 font-medium"
              >
                Create Task
              </Button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="px-8 py-6">
            <div className="flex items-center gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-xl border-neutral-200 focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>
              <Select
                value={filterPriority}
                onValueChange={(value: Priority) => setFilterPriority(value)}
              >
                <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-xl border-neutral-200 shadow-sm">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border-neutral-200 shadow-md">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              <div className="h-6 pl-6 border-l border-blue-100/20">
                <span className="text-neutral-600 text-sm">
                  {filteredTasks.length}{" "}
                  {filteredTasks.length === 1 ? "task" : "tasks"} total
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="max-w-7xl mx-auto">
        <TaskBoard
          tasks={filteredTasks}
          onTaskCreate={() => setIsCreateModalOpen(true)}
          onTaskEdit={(id) => {
            const task = tasks.find((t) => t.id === id);
            if (task) {
              setEditingTask(task);
              setIsCreateModalOpen(true);
            }
          }}
          onTaskDelete={handleDeleteTask}
          onTaskMove={handleMoveTask}
        />
      </div>

      {/* Create/Edit Task Modal */}
      <Dialog
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open);
          if (!open) setEditingTask(undefined);
        }}
      >
        <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-xl border-neutral-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-neutral-800">
              {editingTask ? "Edit Task" : "Create New Task"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={editingTask ? handleEditTask : handleCreateTask}
            initialData={editingTask}
            onCancel={() => {
              setIsCreateModalOpen(false);
              setEditingTask(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
