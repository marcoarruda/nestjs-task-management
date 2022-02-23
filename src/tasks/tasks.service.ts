import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(taskId: string): Task {
    const found = this.tasks.find((task) => task.id === taskId);

    if (!found) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return found;
  }

  deleteTaskById(taskId: string): void {
    this.getTaskById(taskId);
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  updateTaskStatus(taskId: string, status: TaskStatus) {
    const task = this.getTaskById(taskId);
    task.status = status;
    return task;
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
