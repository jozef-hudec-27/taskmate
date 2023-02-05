import './assets/styles/style.scss'
import { Todo } from './todo'
import { Project, DefaultProject, TodoProjectAssociation, ProjectService } from './project'
import paintTasksPage from './pages/todos'
import Favicon from './assets/images/favicon-32x32.png'
import Dom from './dom_controller'
import { LocalStorage } from './local_storage'

let projects;

if (LocalStorage.isPresent('projects')) {
  projects = ProjectService.instancesFrom(JSON.parse(LocalStorage.get('projects')))
} else {
  const defaultProject = new DefaultProject('My Todos')
  const secondProject = new Project('Second')
  
  const todoTitles = ['Buy Milk', 'Tidy my room', 'Visit grandma']
  todoTitles.forEach(title => {
    let todo = new Todo(title, title + ' description')
    new TodoProjectAssociation(todo, defaultProject)
  })
  
  const secondProjectTodo = new Todo('Mow the lawn', 'Lorem Ipsum dolor sit amet.', new Date(), 3)
  secondProjectTodo.toggleFinished()
  new TodoProjectAssociation(secondProjectTodo, secondProject)

  projects = [defaultProject, secondProject]
  LocalStorage.set('projects', JSON.stringify(projects))
}

paintTasksPage(projects)

const favicon = Dom.newElement('link')
favicon.setAttribute('rel', 'icon')
favicon.setAttribute('type', 'image/x-icon')
favicon.setAttribute('href', Favicon)
document.head.appendChild(favicon)
