import { Controller, Get, Param, Query } from '@nestjs/common';
import { TodoDTO } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService:TodoService){
  }

  @Get()
  getTodoAll(@Query("title") title ?: string): TodoDTO[] {
    if(title){
      return this.todoService.findByCondition((product) => product.title.includes(title))
    }
    return this.todoService.findTodoAll()
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): TodoDTO {
    return this.todoService.findTodoById(Number(id));
  }
}
