import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import Counter from '../common/component/Counter'

const client = new ApolloClient()

render(
  <ApolloProvider client={client}>
    <Counter />
  </ApolloProvider>, document.querySelector('#app'))