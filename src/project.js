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

  moveTodosFrom(nonDefaultProject) {
    nonDefaultProject.todos.forEach(todo => this.addTodo(todo))
  }
}

export class ProjectService {
  static todoObjsFor(project) {
    const todoObjs = []

    project.todos.forEach(todo => {
      todoObjs.push({ todo, association: TodoProjectAssociation.todoToAssociation[todo] })
    })

    return todoObjs
  }
}

export class TodoProjectAssociation {
  static todoToProject = {}
  static todoToAssociation = {}

  constructor(todo, project) {
    this.todo = todo
    this.project = project
    
    this.project.addTodo(todo)

    TodoProjectAssociation.todoToProject[todo] = project
    TodoProjectAssociation.todoToAssociation[todo] = this
  }

  removeAssociation() {
    this.project.removeTodo(this.todo)
    delete TodoProjectAssociation.todoToProject[this.todo]
    delete TodoProjectAssociation.todoToAssociation[this.todo]
    this.todo = undefined
    this.project = undefined
  }
}
