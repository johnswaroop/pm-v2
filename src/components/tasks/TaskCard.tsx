import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, status: Task["status"]) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusColors = {
  todo: "bg-white/70 text-blue-500",
  "in-progress": "bg-sky-50/70 text-sky-600",
  review: "bg-yellow-50/70 text-yellow-600",
  done: "bg-green-50/70 text-green-600",
} as const;

const priorityColors = {
  low: "bg-emerald-50/70 backdrop-blur-xl border border-emerald-200 text-emerald-600",
  medium:
    "bg-amber-50/70 backdrop-blur-xl border border-amber-200 text-amber-600",
  high: "bg-rose-50/70 backdrop-blur-xl border border-rose-200 text-rose-600",
} as const;

const priorityDotColors = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-rose-500",
} as const;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function TaskCard({
  task,
  onStatusChange,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <Card className="w-full backdrop-blur-xl bg-white/90 hover:shadow-lg hover:shadow-blue-200/30 transition-all duration-300 border-neutral-200">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <Badge variant="secondary" className={priorityColors[task.priority]}>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                priorityDotColors[task.priority]
              } mr-2`}
            ></span>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
            Priority
          </Badge>
          <h4 className="text-sm font-semibold leading-none text-neutral-800">
            {task.title}
          </h4>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/50">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white/90 backdrop-blur-xl"
          >
            <DropdownMenuItem onClick={() => onEdit?.(task.id)}>
              Edit
            </DropdownMenuItem>
            {task.status !== "todo" && (
              <DropdownMenuItem
                onClick={() => onStatusChange?.(task.id, "todo")}
              >
                Move to Todo
              </DropdownMenuItem>
            )}
            {task.status !== "in-progress" && (
              <DropdownMenuItem
                onClick={() => onStatusChange?.(task.id, "in-progress")}
              >
                Move to In Progress
              </DropdownMenuItem>
            )}
            {task.status !== "review" && (
              <DropdownMenuItem
                onClick={() => onStatusChange?.(task.id, "review")}
              >
                Move to Review
              </DropdownMenuItem>
            )}
            {task.status !== "done" && (
              <DropdownMenuItem
                onClick={() => onStatusChange?.(task.id, "done")}
              >
                Mark as Done
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete?.(task.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {task.description && (
          <p className="text-sm text-neutral-600 line-clamp-2 mb-2">
            {task.description}
          </p>
        )}
        <Badge variant="secondary" className={statusColors[task.status]}>
          {task.status
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          {task.assignee && (
            <Avatar className="h-6 w-6 ring-2 ring-white">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-sky-500 text-white">
                {task.assignee.name[0]}
              </AvatarFallback>
            </Avatar>
          )}
          {task.timeEstimate && (
            <div className="flex items-center text-sm text-neutral-500">
              <Clock className="h-3 w-3 mr-1" />
              {task.timeEstimate}h
            </div>
          )}
        </div>
        {task.dueDate && (
          <div className="flex items-center text-sm text-neutral-500">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {formatDate(task.dueDate)}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
