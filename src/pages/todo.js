import Dom from '../dom_controller'
import paintTasksPage, { backBtn } from './todos'
import * as dateFns from 'date-fns';
import { TodoService } from '../todo';

export default function(todoObj, existingProjectList, currentProjectIdx) {
  const todo = todoObj.todo, projectAssociation = todoObj.association

  const [paper, pattern, content] = Dom.starterPageTemplate()

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
  })

  const deleteBtn = Dom.newElement('button', [], '', 'Delete')
  deleteBtn.addEventListener('click', e => {
    e.preventDefault()
    projectAssociation.removeAssociation()
    todo.delete()

    paper.remove()
    paintTasksPage(existingProjectList, currentProjectIdx)
  })

  paper.appendChild(backBtn(existingProjectList, currentProjectIdx))

  Dom.addChildrenTo(todoForm, [todoDescArea, Dom.newElement('br'), submitBtn, Dom.newElement('br'), deleteBtn])

  paper.appendChild(pattern)
  pattern.appendChild(content)
  Dom.addChildrenTo(content, [todoDueDateHeading, heading, Dom.emptyLine(), todoForm])

  document.body.appendChild(paper)
}
