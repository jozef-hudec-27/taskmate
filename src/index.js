import './assets/styles/style.scss'

import { Todo, TodoService } from './todo'
import { Project, DefaultProject, TodoProjectAssociation } from './project'


let secondProject = new Project('second')
let todo = new Todo('good todo')
new TodoProjectAssociation(todo, secondProject)
