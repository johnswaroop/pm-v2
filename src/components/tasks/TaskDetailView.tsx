"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskDetailHeader } from "./TaskDetailHeader";
import { TaskDetailContent } from "./TaskDetailContent";
import { TaskComments } from "./TaskComments";
import { TaskActivity } from "./TaskActivity";

// Mock data - Replace with actual data fetching
const MOCK_TASK: Task = {
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
};

interface TaskDetailViewProps {
  taskId: string;
}

export function TaskDetailView({ taskId }: TaskDetailViewProps) {
  const [task] = useState<Task>(MOCK_TASK);
  const [activeTab, setActiveTab] = useState<"comments" | "activity">(
    "comments"
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="backdrop-blur-xl bg-white/60 shadow-sm shadow-blue-100/10 hover:shadow-md hover:shadow-blue-200/20 transition-all duration-300">
            <TaskDetailHeader task={task} />
            <TaskDetailContent task={task} />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="backdrop-blur-xl bg-white/60 shadow-sm shadow-blue-100/10 hover:shadow-md hover:shadow-blue-200/20 transition-all duration-300">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as typeof activeTab)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-white/50 p-1">
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-500 data-[state=active]:shadow-sm data-[state=active]:shadow-blue-100/30"
                >
                  Comments
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-500 data-[state=active]:shadow-sm data-[state=active]:shadow-blue-100/30"
                >
                  Activity
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="m-0">
                <TaskComments taskId={taskId} />
              </TabsContent>
              <TabsContent value="activity" className="m-0">
                <TaskActivity taskId={taskId} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
