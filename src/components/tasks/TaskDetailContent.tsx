"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, Pencil, X } from "lucide-react";

interface TaskDetailContentProps {
  task: Task;
}

export function TaskDetailContent({ task }: TaskDetailContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );

  const handleSave = () => {
    // TODO: Save changes
    setIsEditing(false);
  };

  return (
    <CardContent className="space-y-6">
      {/* Description Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Description</h3>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          )}
        </div>
        {isEditing ? (
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
            className="min-h-[100px]"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            {description || "No description provided."}
          </p>
        )}
      </div>

      {/* Due Date Section */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Due Date</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={!dueDate ? "text-muted-foreground" : ""}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "PPP") : "Set due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Subtasks Section - Placeholder */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Subtasks</h3>
        <p className="text-sm text-muted-foreground">No subtasks yet.</p>
      </div>

      {/* Attachments Section - Placeholder */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Attachments</h3>
        <p className="text-sm text-muted-foreground">No attachments yet.</p>
      </div>
    </CardContent>
  );
}
