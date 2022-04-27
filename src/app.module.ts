import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      database: 'nestjs_task_management',
      username: 'nestjs_task_management',
      password: 'Abc.1234',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
