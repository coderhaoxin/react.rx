
import update from 'react/lib/update'
import { ReplaySubject } from 'rxjs'
import clone from 'clone'

class Subject extends ReplaySubject {
  constructor(...args) {
    super(...args)
    this._state = {}
  }

  get state() {
    return clone(this._state)
  }

  update(data) {
    this._state = update(this.state, {
      $merge: data
    })

    this.next(this.state)
  }
}

export function createStore(defaultState) {
  const subject = new Subject(1)
  subject.update(defaultState)
  return subject
}
