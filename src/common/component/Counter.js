import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'redux'

const App = ({ data, addTodo, deleteTodo }) => {
  const refetch = mutation => param => mutation(param)
    .then(data.refetch)

  addTodo = refetch(addTodo)
  deleteTodo = refetch(deleteTodo)

  return <div>
    <p>Todos:</p>
    <Todos todos={data.todos} deleteTodo={deleteTodo} />
    <InputWithButton onClick={text => addTodo({ variables: {text} })}>
      AddTodo
    </InputWithButton>
  </div>
}

const InputWithButton = ({ onClick, children }) => {
  let text
  return <div>
    <input type="text" onChange={e => text = e.target.value}/>
    <button onClick={_ => onClick(text)}>{children}</button>
  </div>
}

const Todos = ({ todos, ...props }) => <ul>
  { todos && todos.map((todo, i) => <li key={i}>
    <Todo {...todo} {...props} />
  </li>) }
</ul>

const Todo = ({ id, text, deleteTodo }) => <div>
  <span>{id}: {text}</span>
  <button onClick={_ => deleteTodo({ variables: {id} })}>x</button>
</div>

const todos = gql`
  query {
    todos {
      id
      text
    }
  }
`

const addTodo = gql`
  mutation addTodo($text: String) {
    addTodo(text: $text)
  }
`

const deleteTodo = gql`
  mutation deleteTodo($id: Int) {
    deleteTodo(id: $id)
  }
`

export default compose(
  graphql(todos),
  graphql(addTodo, { name: 'addTodo' }),
  graphql(deleteTodo, { name: 'deleteTodo' })
)(App)
