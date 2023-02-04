import Dom from '../dom_controller'
import paintTasksPage, { backBtn } from './todos'
import { Project } from '../project'

export default function(projectList) {
  const [paper, pattern, content] = Dom.starterPageTemplate()

  const heading = Dom.newElement('h1', [], '', 'Create project')

  const projectForm = Dom.newElement('form', ['create-project-form', 'flexbox', 'flex-column', 'gap-12'])

  const projectNameInput = Dom.newInput('text', true, 'project-name')
  const projectNameLabel = Dom.newElement('label', ['flexbox', 'flex-column'], '', 'Project name:')
  projectNameLabel.appendChild(projectNameInput)

  const submitBtn = Dom.newElement('button', [], '', 'Create')
  projectForm.addEventListener('submit', e => {
    e.preventDefault()

    const name = projectNameInput.value
    const newProject = new Project(name === '' ? 'My Project' : name)
    
    paper.remove()
    paintTasksPage([ ...projectList, newProject ], projectList.length)
  })

  document.body.appendChild(paper)
  Dom.addChildrenTo(paper, [pattern, backBtn(projectList, 0)])
  pattern.appendChild(content)

  Dom.addChildrenTo(projectForm, [projectNameLabel, submitBtn])
  Dom.addChildrenTo(content, [heading, Dom.emptyLine(), projectForm])
}
