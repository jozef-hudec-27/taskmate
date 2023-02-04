import Dom from '../dom_controller'
import { TodoProjectAssociation } from '../project'
import { Todo } from '../todo'
import paintTasksPage, { backBtn } from './todos'

export default function(existingProjectList = [], currentProjectIdx = 0) {
  const content = document.getElementById('content')

  const heading = Dom.newElement('h1', [], '', 'Add Todo')

  const todoForm = Dom.newElement('form', ['add-todo-form', 'flexbox', 'flex-column', 'gap-12'])

  const todoTitleInput = Dom.newInput('text', true, 'todo-title')
  const todoTitleLabel = Dom.newElement('label', ['flexbox', 'flex-column'], '', 'Title:')
  todoTitleLabel.appendChild(todoTitleInput)
  
  const todoDescriptionArea = Dom.newElement('textarea')
  const todoDescriptionLabel = Dom.newElement('label', ['flexbox', 'flex-column'], '', 'Description:')
  todoDescriptionLabel.appendChild(todoDescriptionArea)

  const todoPriorities = ['Low', 'Medium', 'High']
  const todoPrioritiesWrapper = Dom.newElement('fieldset', ['flexbox', 'gap-12'])
  todoForm.appendChild(todoPrioritiesWrapper)
  todoPrioritiesWrapper.appendChild(Dom.newElement('legend', [], '', 'Todo priority:'))
  todoPriorities.forEach(priority => {
    let priorityRadio = Dom.newInput('radio', false, 'todo-priority', priority)
    priorityRadio.value = priority
    if (priority === 'Low') priorityRadio.checked = true

    let radioLabel = Dom.newElement('label', [], '', priority)
    radioLabel.setAttribute('for', priority)
    radioLabel.style.fontWeight = 'normal'

    let radioWrapper = Dom.newElement('div', ['flexbox'])
    Dom.addChildrenTo(radioWrapper, [priorityRadio, radioLabel])

    todoPrioritiesWrapper.appendChild(radioWrapper)
  })

  const todoDueDateInput = Dom.newInput('date', true, 'todo-duedate')
  const todoDueDateLabel = Dom.newElement('label', ['flexbox', 'flex-column'], '', 'Due Date:')
  todoDueDateLabel.appendChild(todoDueDateInput)

  const submitBtn = Dom.newElement('button', [], '', 'Add')
  todoForm.addEventListener('submit', e => {
    e.preventDefault()

    const title = todoTitleInput.value
    const description = todoDescriptionArea.value
    const date = todoDueDateInput.value
    let priority;

    todoPriorities.forEach(p => {
      if (document.getElementById(p)?.checked) {
        priority = p
      }
    })

    let newTodo = new Todo(title, description, new Date(date), { Low: 1, Medium: 2, High: 3 }[priority])
    new TodoProjectAssociation(newTodo, existingProjectList[currentProjectIdx])

    document.getElementById('paper').remove()
    paintTasksPage(existingProjectList)
  })

  document.getElementById('paper').appendChild(backBtn(existingProjectList, currentProjectIdx))
  
  Dom.addChildrenTo(todoForm, [todoTitleLabel, todoDescriptionLabel, todoDueDateLabel, submitBtn])
  Dom.addChildrenTo(content, [heading, Dom.emptyLine(), todoForm])
}
