
import { Subject } from 'rxjs'
import uuid from 'uuid/v4'

export const actions = new Map()

export function createAction(fn) {
  const subject = new Subject()

  const fun = function(...args) {
    return Promise.resolve(fn(...args))
      .then(data => subject.next(data))
  }

  fun.subscribe = (...args) => {
    subject.subscribe(...args)
  }

  const name = uuid() + fn.name

  fun.toString = () => name

  actions.set(name, fun)

  return fun
}
