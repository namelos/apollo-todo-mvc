import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient

render(
  <Provider client={client}>

  </Provider>, document.querySelector('#app'))