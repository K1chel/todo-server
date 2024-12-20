export interface CreateTaskBody {
  title: string;
  color?: string;
}

export interface UpdateTaskParams {
  id: string;
}

export interface UpdateTaskBody {
  title: string;
  color?: string;
  completed?: boolean;
}
