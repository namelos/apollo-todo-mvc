import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema'
import resolvers from './resolver'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'

export const schema = makeExecutableSchema({ typeDefs, resolvers })
export const graphql = graphqlExpress({ schema })
export const graphiql = graphiqlExpress({ endpointURL: '/graphql' })