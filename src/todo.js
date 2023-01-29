import * as dateFns from 'date-fns';

export class Todo {
  isFinished = false

  constructor(title, description = '', dueDate = new Date(), priority = 1) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
  }

  toggleFinished() {
    this.isFinished = !this.finished
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
