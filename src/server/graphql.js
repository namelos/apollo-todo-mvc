import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

const typeDefs = `
  # the Todo type with an id and a text 
  type Todo {
    id: Int                     
    text: String
  }
  type Query {
    # Find a Todo with id
    todo(id: Int): Todo         
    # Find All todos
    todos: [Todo]               
  }
  type Mutation {
    # Add a new Todo with a content text
    addTodo(text: String): Boolean
    # Delete a todo with id
    deleteTodo(id: Int): Boolean
  } 
  # A Todo app with GraphQL and Apollo 
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
      addTodo:  (_, {text}) => (todos.push({id: genId(), text}), true),
      deleteTodo: (_, {id}) => (todos = todos.filter(todo => todo.id !== id), true)
    }
  }
})()

export const schema = makeExecutableSchema({ typeDefs, resolvers })
export const graphql = graphqlExpress({ schema })
export const graphiql = graphiqlExpress({ endpointURL: '/graphql' })