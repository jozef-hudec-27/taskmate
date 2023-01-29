import './assets/styles/style.scss'
import * as dateFns from 'date-fns';

class Todo {
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

class TodoService {
  static timeLeftFor(todo) {
    return dateFns.formatDistanceToNow(todo.dueDate)
  }
}

class Project {
  todos = []

  constructor(name) {
    this.name = name
  }

  addTodo(todo) {
    this.todos.push(todo)
  }

  removeTodo(todo) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i] === todo) {
        this.todos.splice(i, 1)
        return true
      }
    }
  }

  delete() {
    if (!this.isDefault) {
      for (let property in this) {
        delete this[property]
      }
    }
  }
}

class TodoProjectAssociation {
  static todoToProject = {}

  constructor(todo, project) {
    this.todo = todo
    this.project = project
    TodoProjectAssociation.todoToProject[todo] = project
  }

  removeAssociation() {
    this.project.removeTodo(this.todo)
    delete TodoProjectAssociation.todoToProject[this.todo]
    this.todo = undefined
    this.project = undefined
  }
}

let secondProject = new Project('second')
let todo = new Todo('good todo')
new TodoProjectAssociation(todo, secondProject)
