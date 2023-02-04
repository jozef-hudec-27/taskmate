import * as dateFns from 'date-fns';

export class Todo {
  isFinished = false

  constructor(title, description = '', dueDate = new Date(), priority = 1) { 
                                                             // 1 - Low, 2 - Medium, 3 - High
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
  }

  toggleFinished() {
    this.isFinished = !this.isFinished
  }

  delete() {
    for (let property in this) {
      delete this[property]
    }
  }
}

export class TodoService {
  static timeLeftFor(todo) {
    return dateFns.formatDistanceToNow(todo.dueDate)
  }
}
