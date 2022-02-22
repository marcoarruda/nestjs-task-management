import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-tasks-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find((task) => task.id === taskId);
  }

  deleteTaskById(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    // push to array
    this.tasks.push(task);

    // return
    return task;
  }
}
