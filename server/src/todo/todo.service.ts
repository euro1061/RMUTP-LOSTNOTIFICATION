import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoDTO } from './todo.dto';

@Injectable()
export class TodoService {
    private todos: TodoDTO[] = [
        {
            id: 1,
            title: "Apple",
            subtitle: "subtitle1"
        },
        {
            id: 2,
            title: "PineApple",
            subtitle: "subtitle2"
        },
        {
            id: 3,
            title: "Banana",
            subtitle: "subtitle3"
        }
    ]

    findTodoAll(): TodoDTO[] {
        return this.todos;
    }

    findTodoById(id: number): TodoDTO {
        const todo = this.todos.find(item => item.id === id)
        if (!todo) throw new NotFoundException('ไม่พบข้อมูล')
        return todo
    }

    findByCondition(predicate: (todo: TodoDTO)=>boolean){
        return this.todos.filter(item => predicate(item))
    }
}
