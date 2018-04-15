import * as _ from 'lodash'

const chunk = _.chunk([1, 2, 3, 4, 5], 2)
console.log(chunk)

import 'babel-polyfill'

const NUM = 100

const arrowFunc = () => {
  console.log('hello')
}

const arr = [1, 2, 3, 4]

arr.includes(2)
