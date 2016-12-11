
import update from 'react/lib/update'
import { ReplaySubject } from 'rxjs'
import clone from 'clone'

import { throwError } from './util'
import { actions } from './action'

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

  subscribeActions(mapping) {
    Object.keys(mapping).forEach(k => {
      const action = actions.get(k)
      const reducer = mapping[k]

      if (typeof action !== 'function') {
        // TODO: more info
        throwError('unknown action')
      }

      if (typeof reducer !== 'function') {
        // TODO
        throwError('invalid reducer')
      }

      action.subscribe(data => {
        Promise.resolve(reducer(data))
          .then(result => this.update(result))
      })
    })
  }
}

export function createStore(defaultState) {
  const subject = new Subject(1)
  subject.update(defaultState)
  return subject
}
