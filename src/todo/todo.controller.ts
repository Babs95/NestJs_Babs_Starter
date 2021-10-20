import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoEntity } from '../entities/todo.entity';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.Dto';
import { AddTodoDto } from './dto/add-todo.Dto';
import { randomUUID } from 'crypto';
import { UpdateTodoDto } from "./dto/update-todo.Dto";

@Controller('todo')
export class TodoController {
  todos: TodoEntity[];
  constructor() {
    this.todos = [];
  }
  @Get()
  getTodos(@Query() mesQueryParams: GetPaginatedTodoDto): TodoEntity[] {
    console.log('Récupération de la liste');
    console.log('mesQueryParams', mesQueryParams);
    console.log(this.todos);
    return this.todos;
  }
  @Get(':id')
  findOne(@Param() params, @Param('id') idTodo: number) {
    let result: TodoEntity[] = [];
    let element: TodoEntity;
    console.log('Find un todo de la liste');
    console.log(params.id);
    // eslint-disable-next-line prefer-const
    element = this.todos.find((el: TodoEntity) => el.id === +idTodo);
    result = this.todos.filter((el) => el.id === params.id);
    console.log('element', element);
    //return 'Find un todo de la liste';
    //return result.length == 0 ? 'Aucun élement trouvé' : result;
    return element == null ? 'Aucun élement trouvé' : element;
  }
  @Post()
  addTodo(@Body() newTodo: AddTodoDto) {
    let response: string;
    const todo = new TodoEntity();
    const { name, description } = newTodo; // on décompose notre objet
    todo.name = name;
    todo.description = description;
    todo.createdAt = new Date();
    console.log('Ajout dans la liste');
    console.log('newTodo', newTodo);
    if (this.todos.length === 0) {
      //+randomUUID()
      todo.id = 1;
      this.todos.push(todo);
      response = 'Add TODO';
    } else {
      for (const el of this.todos) {
        if (el.name === newTodo.name) {
          response = 'Ce todo existe déjà';
          break;
        } else {
          todo.id = this.todos[this.todos.length - 1].id + 1;
          this.todos.push(todo);
          response = 'Add TODO + 1';
        }
      }
    }
    return response;
  }
  @Delete(':id')
  deleteTodo(@Param('id') idTodo: number) {
    console.log('Suppression dans la liste');
    //+idTodo pour le transformer en number puisqu'on le recoit en string au nibeau des params
    const index = this.todos.findIndex(
      (todo: TodoEntity) => todo.id === +idTodo,
    );
    console.log('index', index);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Le todo d'id ${idTodo} n'existe pas`);
    }
    //this.todos = this.todos.filter((el) => el.id != idTodo);
    return {
      message: `Le todo d'id ${idTodo} a été supprimé avec succès`,
      count: 1,
    };
  }
  @Put()
  /**
   * Partial pour récupérer des parties de notre objet
   * */
  updateTodo(@Body() updateTodo: Partial<UpdateTodoDto>) {
    console.log('Modification dans la liste');
    updateTodo.updatedAt = new Date();
    console.log('Objet for update', updateTodo);
    this.todos.forEach((el) => {
      if (el.id == updateTodo.id) {
        el.id = updateTodo.id;
        el.name = updateTodo.name ? updateTodo.name : el.name;
        el.description = updateTodo.description;
        el.updatedAt = updateTodo.updatedAt;
      }
    });
    return 'Update TODO';
  }
}
