export default class {
  static newElement(type, classList = [], id = '', text = '') {
    const element = document.createElement(type)
    classList.forEach(cls => element.classList.add(cls))
    element.id = id
    element.textContent = text

    return element
  }

  static addChildrenTo(element, children) {
    children.forEach(child => element.appendChild(child))
  }
}
