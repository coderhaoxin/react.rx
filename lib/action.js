
import { Subject } from 'rxjs'

export function createAction(fn) {
  const subject = new Subject()

  const fun = function(...args) {
    return Promise.resolve(fn(...args))
      .then(data => subject.next(data))
  }

  fun.subscribe = (...args) => {
    subject.subscribe(...args)
  }

  return fun
}
