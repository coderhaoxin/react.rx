
import { createStore } from '../../../'

import {
  getInfo,
  update
} from './action'

const store = createStore({
  info: {}
})

store.subscribeActions({
  [getInfo]: info => ({
    info
  }),

  [update]: up => ({
    info: up
  }),
})

export default store
