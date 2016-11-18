let todos = []

const genId = (_ => {
  let id = 0
  return _ => ++id
})()

export default {
  Query: {
    id:                 _ => genId(),
    todo:     (_, { id }) => todos.find(todo => todo.id === id),
    todos:              _ => todos
  },
  Mutation: {
    addTodo:  (_, {text}) => todos.push({id: genId(), text}),
    deleteTodo: (_, {id}) => todos = todos.filter(todo => todo.id !== id)
  }
}