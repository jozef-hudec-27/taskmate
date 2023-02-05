export class LocalStorage {
  static get(key) {
    return localStorage.getItem(key)
  }

  static set(key, value) {
    localStorage.setItem(key, value)
  }

  static isPresent(key) {
    return this.get(key) !== null
  }
}
