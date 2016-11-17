let counter = 0

export default {
  Query: {
    counter: _ => counter
  },
  Mutation: {
    inc: param => counter++
  }
}