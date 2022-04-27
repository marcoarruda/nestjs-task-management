import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
}
