import { TodoProjectAssociation } from "./project"

export class LocalStorage {
  static get(key) {
    if (!this.isAvailable()) return
    
    return localStorage.getItem(key)
  }

  static set(key, value) {
    if (!this.isAvailable()) return
    
    localStorage.setItem(key, value)
  }

  static remove(key) {
    if (!this.isAvailable()) return
    
    localStorage.removeItem(key)
  }

  static isPresent(key) {
    if (!this.isAvailable()) return
    
    return this.get(key) !== null
  }

  static isAvailable() {
    let storage;

    try {
      storage = window['localStorage']
      const x = '__storage_test__'
      storage.setItem(x, x)
      storage.removeItem(x)
      return true
    }
    catch (e) {
      return e instanceof DOMException && (
          e.code === 22 ||
          e.code === 1014 ||
          e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          (storage && storage.length !== 0)
    }
  }
}

export class LocalStorageProjectService {
  static currentProjects() {
    return JSON.parse(LocalStorage.get('projects') || '[]')
  }

  static addNewProject(project) {
    if (!LocalStorage.isAvailable()) return

    let currentProjects = this.currentProjects()
    currentProjects.push(project)
    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static removeProject(project) {
    if (!LocalStorage.isAvailable()) return

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
    if (!LocalStorage.isAvailable()) return

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
    if (!LocalStorage.isAvailable()) return

    let project = TodoProjectAssociation.todoToProject[todo.id.toString()]
    let currentProjects = LocalStorageProjectService.currentProjects()

    const [i, j] = this.findTodoInTodosOf(project, todo)
    currentProjects[i].todos[j].isFinished = !currentProjects[i].todos[j].isFinished

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static updateDescriptionFor(todo, newDesc) {
    if (!LocalStorage.isAvailable()) return

    let project = TodoProjectAssociation.todoToProject[todo.id.toString()]
    let currentProjects = LocalStorageProjectService.currentProjects()

    const [i, j] = this.findTodoInTodosOf(project, todo)
    currentProjects[i].todos[j].description = newDesc

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static removeTodo(todo) {
    if (!LocalStorage.isAvailable()) return

    let project = TodoProjectAssociation.todoToProject[todo.id.toString()]
    let currentProjects = LocalStorageProjectService.currentProjects()

    const [i, j] = this.findTodoInTodosOf(project, todo)
    currentProjects[i].todos.splice(j, 1)

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static findTodoInTodosOf(project, todo) {
    let stringifiedTodo = JSON.stringify(todo)

    let currentProjects = LocalStorageProjectService.currentProjects()

    for (let i = 0; i < currentProjects.length; i++) {
      if (currentProjects[i].id == project.id) {
        for (let j = 0; j < currentProjects[i].todos.length; j++) {
          if (JSON.stringify(currentProjects[i].todos[j]) === stringifiedTodo) {
            return [i, j]
          }
        }
      }
    }
  }
}
