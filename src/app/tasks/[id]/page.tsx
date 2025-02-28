"use client";

import { useParams } from "next/navigation";
import { TaskDetailView } from "@/components/tasks/TaskDetailView";

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params.id as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-sky-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/50 rounded-lg shadow-md shadow-blue-200/20 p-1">
          <TaskDetailView taskId={taskId} />
        </div>
      </div>
    </div>
  );
}
