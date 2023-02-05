import { Todo } from "./todo"
import { LocalStorageProjectService } from './local_storage'

export class Project {
  todos = []

  constructor(name, isDefault = false) {
    this.name = name
    this.isDefault = isDefault

    LocalStorageProjectService.addNewProject(this)
  }

  addTodo(todo) {
    LocalStorageProjectService.addTodoTo(this, todo)

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
      LocalStorageProjectService.removeProject(this)

      for (let property in this) {
        delete this[property]
      }
    }
  }

  moveTodosFrom(otherProject) {
    LocalStorageProjectService.moveTodosToDefaultFrom(otherProject)

    otherProject.todos.forEach(todo => {
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

  static instancesFrom(objArray) {
    let instances = []

    for (let project of objArray) {
      let projectInstance = new Project(project.name, Boolean(project.isDefault))
  
      for (let todo of project.todos) {
        let todoInstance = new Todo(todo.title, todo.description, new Date(todo.dueDate), todo.priority)
        new TodoProjectAssociation(todoInstance, projectInstance)
      }
  
      instances.push(projectInstance)
    }

    return instances
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
