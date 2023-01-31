export default class {
  static newElement(type, classList = [], id = '', text = '') {
    const element = document.createElement(type)
    classList.forEach(cls => element.classList.add(cls))
    element.id = id
    element.textContent = text

    return element
  }

  static newInput(type, required = false, name = null, id = null) {
    const input = this.newElement('input')
    input.type = type

    if (required) input.required = true
    if (name) input.name = name
    if (id) input.id = id

    return input
  }

  static addChildrenTo(element, children) {
    children.forEach(child => element.appendChild(child))
  }
}
