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
    let stringifiedProject = JSON.stringify(project)

    for (let i = 0; i < currentProjects.length; i++) {
      if (JSON.stringify(currentProjects[i]) === stringifiedProject) {
        currentProjects.splice(i, 1)
        break
      }
    }

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static moveTodosToDefaultFrom(project) {
    let currentProjects = this.currentProjects()

    for (let todo of project.todos) {
      currentProjects[0].todos.push(todo)
    }

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }

  static addTodoTo(project, todo) {
    let currentProjects = this.currentProjects()
    let stringifiedProject = JSON.stringify(project)

    for (let i = 0; i < currentProjects.length; i++) {
      if (JSON.stringify(currentProjects[i]) === stringifiedProject) {
        currentProjects[i].todos.push(todo)
        break
      }
    }

    LocalStorage.set('projects', JSON.stringify(currentProjects))
  }
}
