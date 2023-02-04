  import Dom from '../dom_controller'
import paintNewTodoPage from './new_todo'
import paintTodoDetailsPage from './todo'
import { ProjectService } from '../project'

export default function paintTasksPage(projectList = [], currentProjectIdx = 0) {
  const todoObjs = ProjectService.todoObjsFor(projectList[currentProjectIdx])

  const paper = Dom.newElement('div', [], 'paper')
  const pattern = Dom.newElement('div', [], 'pattern')
  const content = Dom.newElement('div', [], 'content')

  if (!projectList[currentProjectIdx].isDefault) {
    const deleteProjectBtn = Dom.newElement('button', ['delete-project-btn'])
    deleteProjectBtn.innerHTML = `
      <svg fill="rgba(255, 0, 0, 0.6)" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>
    `
    deleteProjectBtn.setAttribute('aria-label', 'Delete project')
    deleteProjectBtn.addEventListener('click', () => {
      let tmp = projectList[currentProjectIdx]
      projectList[0].moveTodosFrom(tmp)
      projectList = projectList.filter(project => project != tmp)
      tmp.delete()

      paper.remove()
      paintTasksPage(projectList)
    })

    content.appendChild(deleteProjectBtn)
  }

  const selectWrapper = Dom.newElement('div', ['select-project-dropdown-wrapper', 'flexbox', 'flex-align-center'])
  const projectsSelect = Dom.newElement('select', ['select-project-dropdown'])
  projectsSelect.addEventListener('change', e => {
    let newProjectIdx = e.target.options[e.target.selectedIndex].value
    paper.remove()
    paintTasksPage(projectList, newProjectIdx)
  })
  projectList.forEach((project, i) => {
    let projectOption = Dom.newElement('option', [], '', project.name)
    projectOption.value = i
    projectOption.selected = i == currentProjectIdx
    projectsSelect.appendChild(projectOption)
  })
  const expandArrow = Dom.newElement('div', ['flexbox', 'select-project-expand-arrow'])
  expandArrow.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m10 13.062-5-5L6.062 7 10 10.938 13.938 7 15 8.062Z"/></svg>
  `

  Dom.addChildrenTo(selectWrapper, [projectsSelect, expandArrow])
  content.appendChild(selectWrapper)

  const heading = Dom.newElement('h1', ['project-name'], '', projectList[currentProjectIdx].name)

  const todoElements = []
  todoObjs.forEach(todoObj => {
    let todo = todoObj.todo

    let wrapper = Dom.newElement('div', ['flexbox', 'gap-8'])

    let todoElement = Dom.newElement('li', ['todo', `priority-${todo.priority}`, todo.isFinished ? 'finished' : 'unfinished'], '')
    todoElement.innerHTML = `<a href="">${todo.title}</a>`
    todoElement.setAttribute('aria-label', `${{ 1: 'Low', 2: 'Medium', 3: 'High'}[todo.priority]} priority todo`)
    todoElement.firstChild.addEventListener('click', e => {
      e.preventDefault()

      paper.remove()
      paintTodoDetailsPage(todoObj, projectList, currentProjectIdx)
    })

    let todoFinishedBtn = Dom.newElement('button')
    todoFinishedBtn.innerHTML = todo.isFinished ? `
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z"/></svg>
    ` : `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"/></svg>`
    todoFinishedBtn.setAttribute('aria-label', todo.isFinished ? 'Unmark todo finished' : 'Mark todo finished')
    todoFinishedBtn.addEventListener('click', () => {
      todo.toggleFinished()

      todo.isFinished ? todoElement.classList.add('finished') : todoElement.classList.remove('finished')
      todoFinishedBtn.innerHTML = todo.isFinished ? `
      <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.062 15 5 13.938 8.938 10 5 6.062 6.062 5 10 8.938 13.938 5 15 6.062 11.062 10 15 13.938 13.938 15 10 11.062Z"/></svg>
      ` : `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m8.229 14.062-3.521-3.541L5.75 9.479l2.479 2.459 6.021-6L15.292 7Z"/></svg>`
      todoFinishedBtn.setAttribute('aria-label', todo.isFinished ? 'Unmark todo finished' : 'Mark todo finished')
    })

    Dom.addChildrenTo(wrapper, [todoElement, todoFinishedBtn])

    todoElements.push(wrapper)
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
    paintNewTodoPage(projectList, currentProjectIdx)
  })
  
  paper.appendChild(newTodoBtn)
}

export function backBtn(projects, currentProjectIdx) {
  const btn = Dom.newElement('button', ['new-page-btn'])
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10 22 0 12 10 2l1.775 1.775L3.55 12l8.225 8.225Z"/>
    </svg>`
  btn.addEventListener('click', () => {
    document.getElementById('paper').remove()
    paintTasksPage(projects, currentProjectIdx)
  })

  return btn
}
