import Dom from '../dom_controller'

export default function() {
  const content = document.getElementById('content')

  const heading = Dom.newElement('h1', [], '', 'Add Todo')

  const todoForm = Dom.newElement('form', ['add-todo-form', 'flexbox', 'flex-column', 'gap-12'])

  const todoTitleInput = Dom.newInput('text', true, 'todo-title')
  const todoTitleLabel = Dom.newElement('label', ['flexbox', 'flex-column'], '', 'Title:')
  todoTitleLabel.appendChild(todoTitleInput)
  
  const todoDescriptionArea = Dom.newElement('textarea')
  todoDescriptionArea.required = true
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
  
  const emptyLine = Dom.newElement('li')
  emptyLine.style.color = 'white'
  
  Dom.addChildrenTo(todoForm, [todoTitleLabel, todoDescriptionLabel, todoDueDateLabel, submitBtn])
  
  Dom.addChildrenTo(content, [heading, emptyLine, todoForm])
}
