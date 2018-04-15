import * as _ from 'lodash'

const chunk = _.chunk([1, 2, 3, 4, 5], 2)
console.log(chunk)

const NUM = 234
console.log(NUM)

interface Cat {
  name: String,
  gender: String
}

function touchCat(cat: Cat) {
  console.log(cat.name, 'miao~')
}

touchCat({
  name: 'tom',
  gender: 'male'
})
