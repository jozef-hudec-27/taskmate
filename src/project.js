export class Project {
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

export class DefaultProject extends Project {
  isDefault = true
}

export class TodoProjectAssociation {
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
