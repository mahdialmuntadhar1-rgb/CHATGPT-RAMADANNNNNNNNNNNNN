export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
}

export interface Goal {
  id: number;
  title: string;
  progress: number;
  category: string;
  created_at?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
