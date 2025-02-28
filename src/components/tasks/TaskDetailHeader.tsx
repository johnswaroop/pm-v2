"use client";

import { Task } from "@/types/task";
import { CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, MoreVertical, User } from "lucide-react";

interface TaskDetailHeaderProps {
  task: Task;
}

export function TaskDetailHeader({ task }: TaskDetailHeaderProps) {
  const getStatusBadgeStyle = (status: Task["status"]) => {
    switch (status) {
      case "done":
        return "bg-white/70 text-green-600 hover:bg-white/80";
      case "in-progress":
        return "bg-white/70 text-blue-600 hover:bg-white/80";
      case "review":
        return "bg-white/70 text-purple-600 hover:bg-white/80";
      default:
        return "bg-white/70 text-neutral-600 hover:bg-white/80";
    }
  };

  const getPriorityBadgeStyle = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "inline-flex items-center px-3 py-1 rounded-full bg-white/50 backdrop-blur-xl border border-red-200 text-red-500";
      case "medium":
        return "inline-flex items-center px-3 py-1 rounded-full bg-white/50 backdrop-blur-xl border border-orange-200 text-orange-500";
      default:
        return "inline-flex items-center px-3 py-1 rounded-full bg-white/50 backdrop-blur-xl border border-neutral-200 text-neutral-500";
    }
  };

  const getPriorityDot = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      default:
        return "bg-neutral-500";
    }
  };

  return (
    <CardHeader className="space-y-4 bg-white/40 backdrop-blur-sm border-b border-blue-100/20">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={getStatusBadgeStyle(task.status)}
            >
              {task.status}
            </Badge>
            <span className={getPriorityBadgeStyle(task.priority)}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(
                  task.priority
                )} mr-2`}
              ></span>
              {task.priority} priority
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-neutral-800">
            {task.title}
          </h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-600 hover:text-neutral-800"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white/80 backdrop-blur-xl"
          >
            <DropdownMenuItem className="hover:bg-blue-50/50">
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50/50">
              Delete Task
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-50/50">
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4 text-sm text-neutral-600">
        {task.assignee && (
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{task.assignee.name}</span>
          </div>
        )}
        {task.timeEstimate && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{task.timeEstimate}h estimated</span>
          </div>
        )}
      </div>
    </CardHeader>
  );
}
