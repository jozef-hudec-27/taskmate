import './assets/styles/style.scss'
import { Todo } from './todo'
import { Project, TodoProjectAssociation } from './project'
import paintTasksPage from './pages/tasks'

const defaultProject = new Project('My Todos')

const todos = []
const todoTitles = ['Buy Milk', 'Tidy my room', 'Visit grandma']
todoTitles.forEach(title => {
  let todo = new Todo(title, title + ' description')
  new TodoProjectAssociation(defaultProject)
  todos.push(todo)
})

const projects = [defaultProject]

paintTasksPage(todos, projects)
