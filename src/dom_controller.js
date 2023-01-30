export default class {
  static newElement(type, classList = [], id = '') {
    const element = document.createElement(type)
    classList.forEach(cls => element.classList.add(cls))
    element.id = id
  }
}
