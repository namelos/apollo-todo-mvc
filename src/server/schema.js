export default `
type Todo {
  id: Int
  text: String
}
type Query {
  id: Int
  todo(id: Int): Todo
  todos: [Todo]
}
type Mutation {
  addTodo(text: String): Todo
  deleteTodo(id: Int): Todo
} 
schema {
  query: Query
  mutation: Mutation
}
`