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
    nonDefaultProject.todos.forEach(todo => {
      new TodoProjectAssociation(todo, this)
    })
  }
}

export class ProjectService {
  static todoObjsFor(project) {
    const todoObjs = []

    project.todos.forEach(todo => {
      todoObjs.push({ todo, association: TodoProjectAssociation.todoToAssociation[todo.id.toString()] })
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

    TodoProjectAssociation.todoToProject[todo.id.toString()] = project
    TodoProjectAssociation.todoToAssociation[todo.id.toString()] = this
  }

  removeAssociation() {
    this.project?.removeTodo(this.todo)
    delete TodoProjectAssociation.todoToProject[this.todo.title]
    delete TodoProjectAssociation.todoToAssociation[this.todo.title]
    this.todo = undefined
    this.project = undefined
  }
}
