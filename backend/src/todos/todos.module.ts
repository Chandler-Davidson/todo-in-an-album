import { Module, Body, Get, Patch, Delete, Post } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule { }
