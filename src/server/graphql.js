import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

const typeDefs = `
  type Todo {
    id: Int
    text: String
  }
  type Query {
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

const resolvers = (() => {
  let todos = []

  const genId = (_ => {
    let id = 0
    return _ => ++id
  })()

  return {
    Query: {
      todo:     (_, { id }) => todos.find(todo => todo.id === id),
      todos:              _ => todos
    },
    Mutation: {
      addTodo:  (_, {text}) => todos.push({id: genId(), text}),
      deleteTodo: (_, {id}) => todos = todos.filter(todo => todo.id !== id)
    }
  }
})()

export const schema = makeExecutableSchema({ typeDefs, resolvers })
export const graphql = graphqlExpress({ schema })
export const graphiql = graphiqlExpress({ endpointURL: '/graphql' })