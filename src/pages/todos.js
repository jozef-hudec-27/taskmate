import Dom from '../dom_controller'
import paintNewTodoPage from './new_todo'
import paintTodoDetailsPage from './todo'

export default function paintTasksPage(todoList = [], projectList = []) {
  const paper = Dom.newElement('div', [], 'paper')
  const pattern = Dom.newElement('div', [], 'pattern')
  const content = Dom.newElement('div', [], 'content')

  const heading = Dom.newElement('h1', ['project-name'], '', 'My Tasks')

  const todoElements = []
  todoList.forEach(todoObj => {
    let todoElement = Dom.newElement('li', ['todo', `priority-${todoObj.todo.priority}`], '')
    todoElement.innerHTML = `<a href="">${todoObj.todo.title}</a>`
    todoElement.setAttribute('aria-label', `${{ 1: 'Low', 2: 'Medium', 3: 'High'}[todoObj.todo.priority]} priority todo`)
    todoElement.firstChild.addEventListener('click', e => {
      e.preventDefault()

      paper.remove()
      paintTodoDetailsPage(todoObj, todoList, projectList)
    })
    todoElements.push(todoElement)
  })

  document.body.appendChild(paper)
  paper.appendChild(pattern)
  pattern.appendChild(content)
  Dom.addChildrenTo(content, [heading, Dom.emptyLine()].concat(todoElements))

  const newTodoBtn = Dom.newElement('button', ['new-page-btn'], '')
  newTodoBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    <g id="surface1">
      <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 4.5 19.5 L 5.601562 19.5 L 16.675781 8.425781 L 15.574219 7.324219 L 4.5 18.398438 Z M 19.851562 7.351562 L 16.648438 4.148438 L 17.699219 3.101562 C 17.984375 2.816406 18.332031 2.675781 18.75 2.675781 C 19.167969 2.675781 19.515625 2.816406 19.800781 3.101562 L 20.898438 4.199219 C 21.183594 4.484375 21.324219 4.832031 21.324219 5.25 C 21.324219 5.667969 21.183594 6.015625 20.898438 6.300781 Z M 18.800781 8.398438 L 6.199219 21 L 3 21 L 3 17.800781 L 15.601562 5.199219 Z M 16.125 7.875 L 15.574219 7.324219 L 16.675781 8.425781 Z M 16.125 7.875 "/>
    </g>
  </svg>`
  newTodoBtn.addEventListener('click', () => {
    content.remove()
    newTodoBtn.remove()
    pattern.appendChild(Dom.newElement('div', [], 'content'))
    paintNewTodoPage(todoList, projectList)
  })
  
  paper.appendChild(newTodoBtn)
}

export function backBtn(todos, projects) {
  const btn = Dom.newElement('button', ['new-page-btn'])
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10 22 0 12 10 2l1.775 1.775L3.55 12l8.225 8.225Z"/>
    </svg>`
  btn.addEventListener('click', () => {
    document.getElementById('paper').remove()
    paintTasksPage(todos, projects)
  })

  return btn
}
