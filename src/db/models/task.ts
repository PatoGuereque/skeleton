import { model, Schema } from 'mongoose';

export interface Task {
  title: string;
  description: string;
  status?: boolean;
}

const taskSchema = new Schema<Task>({
  title: String,
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = model<Task>('Tasks', taskSchema);

export default TaskModel;
