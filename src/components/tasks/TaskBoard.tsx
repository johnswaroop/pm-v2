import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Task } from "@/types/task";
import { useRouter } from "next/navigation";

interface TaskBoardProps {
  tasks: Task[];
  onTaskCreate: () => void;
  onTaskEdit: (id: string) => void;
  onTaskDelete: (id: string) => void;
  onTaskMove: (id: string, status: Task["status"]) => void;
}

const BOARD_COLUMNS = [
  { id: "todo" as const, label: "To Do" },
  { id: "in-progress" as const, label: "In Progress" },
  { id: "review" as const, label: "Review" },
  { id: "done" as const, label: "Done" },
];

export function TaskBoard({
  tasks,
  onTaskCreate,
  onTaskEdit,
  onTaskDelete,
  onTaskMove,
}: TaskBoardProps) {
  const router = useRouter();
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Task["status"]) => {
    if (draggingTaskId) {
      onTaskMove(draggingTaskId, status);
      setDraggingTaskId(null);
    }
  };

  const handleTaskClick = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <div className="p-6 backdrop-blur-xl bg-white/40 rounded-lg shadow-md shadow-blue-200/20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-neutral-800">Task Board</h2>
        <Button
          onClick={onTaskCreate}
          size="sm"
          className="bg-white/90 text-blue-600 hover:shadow-md hover:shadow-blue-200/30"
          variant="secondary"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BOARD_COLUMNS.map((column) => (
          <div
            key={column.id}
            className="backdrop-blur-xl bg-white/60 rounded-lg p-4 shadow-md shadow-blue-200/20 hover:shadow-lg hover:shadow-blue-200/30 transition-all duration-300"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <h3 className="font-medium mb-4 text-neutral-700">
              {column.label}
            </h3>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    onClick={() => handleTaskClick(task.id)}
                    className="transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <TaskCard
                      task={task}
                      onEdit={onTaskEdit}
                      onDelete={onTaskDelete}
                      onStatusChange={onTaskMove}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
