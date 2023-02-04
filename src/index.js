import './assets/styles/style.scss'
import { Todo } from './todo'
import { Project, TodoProjectAssociation } from './project'
import paintTasksPage from './pages/todos'

const defaultProject = new Project('My Todos')

const todos = []
const todoTitles = ['Buy Milk', 'Tidy my room', 'Visit grandma']
todoTitles.forEach(title => {
  let todo = new Todo(title, title + ' description')
  let todoProjectAssociation = new TodoProjectAssociation(todo, defaultProject)
  todos.push({ todo, association: todoProjectAssociation })
})

const projects = [defaultProject]

paintTasksPage(todos, projects)
