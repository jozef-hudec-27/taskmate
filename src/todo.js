import * as dateFns from 'date-fns';
import { LocalStorageTodoService } from './local_storage';

export class Todo {
  constructor(title, description = '', dueDate = new Date(), priority = 1, isFinished = false) { 
                                                             // 1 - Low, 2 - Medium, 3 - High
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.isFinished = isFinished
    this.id = TodoService.randomId()
  }

  toggleFinished() {
    LocalStorageTodoService.toggleFinishedFor(this)
    
    this.isFinished = !this.isFinished
  }

  delete() {
    LocalStorageTodoService.removeTodo(this)
    
    for (let property in this) {
      delete this[property]
    }
  }
}

export class TodoService {
  static timeLeftFor(todo) {
    return dateFns.formatDistanceToNow(todo.dueDate)
  }

  static randomId() {
    return Math.floor(Math.random() * 999_999_999) + 1
  }
}
