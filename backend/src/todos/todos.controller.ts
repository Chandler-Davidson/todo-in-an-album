import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService
  ) { }

  // CRUD
  @Post()
  create(
    @Body() todo: CreateTodoDto
  ) {
    return this.todosService.create(todo);
  }

  @Get()
  getAll() {
    return this.todosService.getAll();
  }

  @Patch()
  update(
    @Body() todo: UpdateTodoDto
  ) {
    return this.todosService.update(todo);
  }

  @Delete()
  delete(
    @Param() params: any[]
  ) {
    console.log(params);
    return this.todosService.delete(null)
  }
}
