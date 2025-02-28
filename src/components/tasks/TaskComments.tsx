"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Send } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

// Mock data - Replace with actual data fetching
const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    content:
      "Let's focus on the core features first before adding any extensions.",
    author: {
      name: "Alex Kim",
      avatar: "",
    },
    createdAt: "2024-02-28T10:00:00Z",
  },
  {
    id: "2",
    content:
      "I've started working on the design system implementation. Will update once the first draft is ready.",
    author: {
      name: "Sarah Chen",
      avatar: "",
    },
    createdAt: "2024-02-28T11:30:00Z",
  },
];

interface TaskCommentsProps {
  taskId: string;
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // This will be used to fetch comments when we implement the API
    console.log("Fetching comments for task:", taskId);
  }, [taskId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      author: {
        name: "John Doe", // Replace with actual user
        avatar: "",
      },
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      {/* Comment Input */}
      <div className="p-4 space-y-4 backdrop-blur-sm bg-white/40 border-b border-blue-100/20">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[100px] bg-white/70 backdrop-blur-xl border-blue-100/30 focus:border-blue-200/50 hover:border-blue-200/40 transition-colors"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:shadow-md hover:shadow-blue-200/40 transition-all duration-300"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      {/* Comment Thread */}
      <div className="space-y-4 px-4 pb-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 backdrop-blur-xl bg-white/60 rounded-lg shadow-sm shadow-blue-100/10 hover:shadow-md hover:shadow-blue-200/20 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-white/60 shadow-sm">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-sky-500 text-white">
                  {comment.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-800">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {format(
                      new Date(comment.createdAt),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
