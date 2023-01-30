import Dom from '../dom_controller'

export default function() {
  const paper = Dom.newElement('div', [], 'paper')
  const pattern = Dom.newElement('div', [], 'pattern')
  const content = Dom.newElement('div', [], 'content')
  const heading = Dom.newElement('h1', ['project-name'], '', 'My Tasks')
  const task1 = Dom.newElement('li', ['task'], '', 'Task 1: Clean my room'),
        task2 = Dom.newElement('li', ['task'], '', 'Task 2: Take out the rubbish'),
        task3 = Dom.newElement('li', ['task'], '', 'Task 3: Buy milk')
  const emptyLine = Dom.newElement('li')
  emptyLine.style.color = 'white'
  
  document.body.appendChild(paper)
  paper.appendChild(pattern)
  pattern.appendChild(content)
  Dom.addChildrenTo(content, [heading, emptyLine, task1, task2, task3])
}
