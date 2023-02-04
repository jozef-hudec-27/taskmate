import './assets/styles/style.scss'
import { Todo } from './todo'
import { Project, DefaultProject, TodoProjectAssociation } from './project'
import paintTasksPage from './pages/todos'

const defaultProject = new DefaultProject('My Todos')
const secondProject = new Project('Second')

const todoTitles = ['Buy Milk', 'Tidy my room', 'Visit grandma']
todoTitles.forEach(title => {
  let todo = new Todo(title, title + ' description')
  new TodoProjectAssociation(todo, defaultProject)
})

const projects = [defaultProject, secondProject]

paintTasksPage(projects)
