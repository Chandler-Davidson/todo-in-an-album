import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) { }

  // CRUD
  create(todo: CreateTodoDto) {
    return this.todoRepository.save(todo);
  }

  getAll() {
    return this.todoRepository.find({});
  }

  update(todo: UpdateTodoDto) {
    return this.todoRepository.save(todo);
  }

  async delete(id: string) {
    const { affected } = await this.todoRepository.delete({ id });
    return affected > 0;
  }
}