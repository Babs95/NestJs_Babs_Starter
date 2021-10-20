import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoEntity } from '../entities/todo.entity';

@Controller('todo')
export class TodoController {
  todos: TodoEntity[];
  constructor() {
    this.todos = [];
  }
  @Get()
  getTodos(): TodoEntity[] {
    console.log('Récupération de la liste');
    console.log(this.todos);
    return this.todos;
  }
  @Get(':id')
  findOne(@Param() params, @Param('id') idTodo: number) {
    let result: TodoEntity[] = [];
    let element: TodoEntity;
    console.log('Find un todo de la liste');
    console.log(params.id);
    console.log('element', element);
    this.todos.filter((el) => {
      if (el.id == idTodo) element = el;
    });
    result = this.todos.filter((el) => el.id == params.id);
    //return 'Find un todo de la liste';
    //return result.length == 0 ? 'Aucun élement trouvé' : result;
    return element == null ? 'Aucun élement trouvé' : element;
  }
  @Post()
  addTodo(@Body() newTodo: TodoEntity) {
    let response: string;
    console.log('Ajout dans la liste');
    console.log('newTodo', newTodo);
    if (this.todos.length === 0) {
      this.todos.push(newTodo);
      response = 'Add TODO';
    } else {
      for (const el of this.todos) {
        if (el.name === newTodo.name) {
          response = 'Ce todo existe déjà';
          break;
        } else {
          newTodo.id = this.todos[this.todos.length - 1].id + 1;
          this.todos.push(newTodo);
          response = 'Add TODO + 1';
        }
      }
    }
    return response;
  }
  @Delete()
  deleteTodo() {
    console.log('Suppression dans la liste');
    return 'Delete TODO';
  }
  @Put()
  updateTodo() {
    console.log('Modification dans la liste');
    return 'Update TODO';
  }
}
