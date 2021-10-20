import { Controller, Delete, Get, Post, Put } from "@nestjs/common";

@Controller('todo')
export class TodoController {
  @Get()
  getTodos() {
    console.log('Récupération de la liste');
    return 'Liste des TODOS';
  }
  @Post()
  addTodo() {
    console.log('Ajout dans la liste');
    return 'Add TODO';
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
