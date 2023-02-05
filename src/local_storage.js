import { TodoProjectAssociation } from "./project"

export class LocalStorage {
  static get(key) {
    return localStorage.getItem(key)
  }

  static set(key, value) {
    localStorage.setItem(key, value)
  }

  static remove(key) {
    localStorage.removeItem(key)
  }

  static isPresent(key) {
    return this.get(key) !== null
  }
}

export class LocalStorageProjectService {
  static currentProjects() {
    return JSON.parse(LocalStorage.get('projects') || '[]')
  }

  static addNewProject(project) {
    let currentProjects = this.currentProjects()
    currentProjects.push(project)
    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static removeProject(project) {
    let currentProjects = this.currentProjects()

    for (let i = 0; i < currentProjects.length; i++) {
      if (currentProjects[i].id == project.id) {
        currentProjects.splice(i, 1)
        break
      }
    }

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static addTodoTo(project, todo) {
    let currentProjects = this.currentProjects()

    for (let i = 0; i < currentProjects.length; i++) {
      if (currentProjects[i].id == project.id) {
        currentProjects[i].todos.push(todo)
        break
      }
    }

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }
}

export class LocalStorageTodoService {
  static toggleFinishedFor(todo) {
    let stringifiedTodo = JSON.stringify(todo)
    let project = TodoProjectAssociation.todoToProject[todo.id.toString()]

    let currentProjects = LocalStorageProjectService.currentProjects()

    for (let i = 0; i < currentProjects.length; i++) {
      if (currentProjects[i].id == project.id) {
        for (let j = 0; j < currentProjects[i].todos.length; j++) {
          if (JSON.stringify(currentProjects[i].todos[j]) === stringifiedTodo) {
            currentProjects[i].todos[j].isFinished = !currentProjects[i].todos[j].isFinished
            break
          }
        }

        break
      }
    }

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static updateDescriptionFor(todo, newDesc) {
    let stringifiedTodo = JSON.stringify(todo)
    let project = TodoProjectAssociation.todoToProject[todo.id.toString()]

    let currentProjects = LocalStorageProjectService.currentProjects()

    for (let i = 0; i < currentProjects.length; i++) {
      if (currentProjects[i].id == project.id) {
        for (let j = 0; j < currentProjects[i].todos.length; j++) {
          if (JSON.stringify(currentProjects[i].todos[j]) === stringifiedTodo) {
            currentProjects[i].todos[j].description = newDesc
            break
          }
        }

        break
      }
    }

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static removeTodo(todo) {
    let stringifiedTodo = JSON.stringify(todo)
    let project = TodoProjectAssociation.todoToProject[todo.id.toString()]

    let currentProjects = LocalStorageProjectService.currentProjects()

    for (let i = 0; i < currentProjects.length; i++) {
      if (currentProjects[i].id == project.id) {
        for (let j = 0; j < currentProjects[i].todos.length; j++) {
          if (JSON.stringify(currentProjects[i].todos[j]) === stringifiedTodo) {
            currentProjects[i].todos.splice(j, 1)
            break
          }
        }

        break
      }
    }

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }
}
