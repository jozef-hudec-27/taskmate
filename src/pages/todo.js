import Dom from '../dom_controller'
import paintTasksPage, { backBtn } from './todos'
import * as dateFns from 'date-fns';
import { TodoService } from '../todo';

export default function(todoObj, existingTodoList, existingProjectList) {
  const todo = todoObj.todo, projectAssociation = todoObj.association

  const paper = Dom.newElement('div', [], 'paper')
  const pattern = Dom.newElement('div', [], 'pattern')
  const content = Dom.newElement('div', [], 'content')

  const ddw = new Date() > todo.dueDate ? 'ago' : 'left'
  const todoDueDateHeading = Dom.newElement('h5', [], '', `Due date: ${dateFns.format(todo.dueDate, 'MMMM d yyyy')} (${TodoService.timeLeftFor(todo)} ${ddw})`)

  const heading = Dom.newElement('h1', ['todo-title', todo.isFinished ? 'finished' : 'unfinished'], '', `${todo.title}`)

  const todoForm = Dom.newElement('form', ['add-todo-form'])
  
  const todoDescArea = Dom.newElement('textarea', [], '', todo.description)

  const submitBtn = Dom.newElement('button', [], '', 'Save')
  submitBtn.addEventListener('click', e => {
    e.preventDefault()

    let newTodoDesc = todoDescArea.value
    todo.description = newTodoDesc

    existingTodoList = existingTodoList.map(obj => {
      if (obj.todo == todo) obj.todo = todo
      
      return obj
    })
  })

  const deleteBtn = Dom.newElement('button', [], '', 'Delete')
  deleteBtn.addEventListener('click', e => {
    e.preventDefault()

    existingTodoList = existingTodoList.filter(obj => obj.todo != todo)
    projectAssociation.removeAssociation()
    todo.delete()

    paper.remove()
    paintTasksPage(existingTodoList, existingProjectList)
  })

  paper.appendChild(backBtn(existingTodoList, existingProjectList))

  Dom.addChildrenTo(todoForm, [todoDescArea, Dom.newElement('br'), submitBtn, Dom.newElement('br'), deleteBtn])

  paper.appendChild(pattern)
  pattern.appendChild(content)
  Dom.addChildrenTo(content, [todoDueDateHeading, heading, Dom.emptyLine(), todoForm])

  document.body.appendChild(paper)
}
