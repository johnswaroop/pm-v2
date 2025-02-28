"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  MessageCircle,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  type:
    | "status_change"
    | "comment"
    | "edit"
    | "due_date"
    | "assignee"
    | "time_estimate";
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  data: {
    from?: string;
    to?: string;
    message?: string;
  };
}

// Mock data - Replace with actual data fetching
const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "status_change",
    user: {
      name: "Alex Kim",
      avatar: "",
    },
    timestamp: "2024-02-28T10:00:00Z",
    data: {
      from: "todo",
      to: "in-progress",
    },
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Sarah Chen",
      avatar: "",
    },
    timestamp: "2024-02-28T11:30:00Z",
    data: {
      message: "Added a comment",
    },
  },
  {
    id: "3",
    type: "assignee",
    user: {
      name: "John Doe",
      avatar: "",
    },
    timestamp: "2024-02-28T12:00:00Z",
    data: {
      to: "Alex Kim",
    },
  },
];

interface TaskActivityProps {
  taskId: string;
}

export function TaskActivity({ taskId }: TaskActivityProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "status_change":
        return <CheckCircle2 className="h-4 w-4" />;
      case "comment":
        return <MessageCircle className="h-4 w-4" />;
      case "edit":
        return <Edit className="h-4 w-4" />;
      case "due_date":
        return <Calendar className="h-4 w-4" />;
      case "assignee":
        return <User className="h-4 w-4" />;
      case "time_estimate":
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getActivityMessage = (activity: Activity) => {
    switch (activity.type) {
      case "status_change":
        return (
          <span className="flex items-center gap-2">
            changed status from{" "}
            <Badge variant="outline" className="bg-white/50">
              {activity.data.from}
            </Badge>{" "}
            to{" "}
            <Badge variant="secondary" className="bg-white/70 text-blue-500">
              {activity.data.to}
            </Badge>
          </span>
        );
      case "comment":
        return "commented on this task";
      case "edit":
        return "edited this task";
      case "due_date":
        return (
          <span className="flex items-center gap-2">
            set due date to{" "}
            <Badge variant="outline" className="bg-white/50">
              {format(new Date(activity.data.to!), "MMM d, yyyy")}
            </Badge>
          </span>
        );
      case "assignee":
        return (
          <span className="flex items-center gap-2">
            assigned this task to{" "}
            <Badge variant="secondary" className="bg-white/70 text-blue-500">
              {activity.data.to}
            </Badge>
          </span>
        );
      case "time_estimate":
        return (
          <span className="flex items-center gap-2">
            updated time estimate to{" "}
            <Badge variant="outline" className="bg-white/50">
              {activity.data.to}h
            </Badge>
          </span>
        );
      default:
        return "performed an action";
    }
  };

  return (
    <div className="space-y-4 p-4">
      {MOCK_ACTIVITIES.map((activity) => (
        <div
          key={activity.id}
          className="p-4 backdrop-blur-xl bg-white/60 rounded-lg shadow-sm shadow-blue-100/10 hover:shadow-md hover:shadow-blue-200/20 transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-white/60 shadow-sm">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-500 text-white">
                {activity.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-800">
                  {activity.user.name}
                </span>
                <span className="text-xs text-neutral-500">
                  {format(
                    new Date(activity.timestamp),
                    "MMM d, yyyy 'at' h:mm a"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                <span className="p-1 rounded-full bg-white/70 shadow-sm">
                  {getActivityIcon(activity.type)}
                </span>
                {getActivityMessage(activity)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
