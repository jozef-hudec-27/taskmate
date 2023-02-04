import Dom from '../dom_controller'
import paintTasksPage, { backBtn } from './todos'
import * as dateFns from 'date-fns';
import { TodoService } from '../todo';

export default function(todo, existingTodoList, existingProjectList) {
  const paper = Dom.newElement('div', [], 'paper')
  const pattern = Dom.newElement('div', [], 'pattern')
  const content = Dom.newElement('div', [], 'content')

  const word = new Date() > todo.dueDate ? 'ago' : 'left'
  const todoDueDateHeading = Dom.newElement('h5', [], '', `Due date: ${dateFns.format(todo.dueDate, 'MMMM d yyyy')} (${TodoService.timeLeftFor(todo)} ${word})`)

  const heading = Dom.newElement('h1', ['todo-title'], '', `${todo.title}`)

  const todoForm = Dom.newElement('form', ['add-todo-form'])
  
  const todoDescArea = Dom.newElement('textarea', [], '', todo.description)

  const submitBtn = Dom.newElement('button', [], '', 'Save')
  submitBtn.addEventListener('click', e => {
    e.preventDefault()
  })

  const deleteBtn = Dom.newElement('button', [], '', 'Delete')
  deleteBtn.addEventListener('click', e => {
    e.preventDefault()
  })

  paper.appendChild(backBtn(existingTodoList, existingProjectList))

  Dom.addChildrenTo(todoForm, [todoDescArea, Dom.newElement('br'), submitBtn, Dom.newElement('br'), deleteBtn])

  paper.appendChild(pattern)
  pattern.appendChild(content)
  Dom.addChildrenTo(content, [todoDueDateHeading, heading, Dom.emptyLine(), todoForm])

  document.body.appendChild(paper)
}
