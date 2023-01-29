import './assets/styles/style.scss'
import * as dateFns from 'date-fns';

class Todo {
  isFinished = false

  constructor(title, description = '', dueDate = new Date(), priority = 1) {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
  }

  timeLeft() {
    return dateFns.formatDistanceToNow(this.dueDate)
  }
}

