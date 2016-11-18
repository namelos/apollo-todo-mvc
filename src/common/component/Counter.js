import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'redux'

const query = gql`
  query {
    todos {
      id
      text
    }
  }
`

const App = ({ data, mutate }) => <div>
  <p>Todos:</p>
  <Todos todos={data.todos} />
  <input type="text" onChange={ e => mutate({ variables: { text: e.target.value } }) }/>
</div>

const Todos = ({ todos }) => <ul>
  { todos && todos.map((todo, i) => <li key={i}>
    <Todo {...todo} />
  </li>) }
</ul>

const Todo = ({ id, text }) => <p>
  {id}: {text}
</p>

const add = gql`
  mutation addTodo($text: String) {
    addTodo(text: $text) {
      id
      text
    }
  }
`

// const addTodo = graphql(add, {
//   name: 'addTodo'
// })

export default
  compose(
    graphql(query),
    graphql(add)
  )(App)
