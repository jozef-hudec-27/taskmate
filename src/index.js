import './assets/styles/style.scss'
import * as dateFns from 'date-fns';

class Todo {
  isFinished = false

  constructor(title, project, description = '', dueDate = new Date(), priority = 1) {
    this.title = title
    this.setProjectTo(project)
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
  }

  timeLeft() {
    return dateFns.formatDistanceToNow(this.dueDate)
  }

  toggleFinished() {
    this.isFinished = !this.finished
  }

  delete() {
    this.project.removeTodo(this)

    for (let property in this) {
      delete this[property]
    }
  }

  setProjectTo(project) {
    this.project = project
    project.addTodo(this)
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
    if (this.isDefault) {
      return
    }

    this.todos.forEach(todo => {
      todo.setProjectTo(defaultProject)
    })

    for (let property in this) {
      delete this[property]
    }
  }
}

let defaultProject = new Project('default')
defaultProject.isDefault = true

let secondProject = new Project('second')

let todo = new Todo('good todo', secondProject)

secondProject.delete()

console.log(todo, defaultProject, secondProject)