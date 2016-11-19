import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'redux'

const App = ({ data, addTodo, ...props }) => <div>
  <p>Todos:</p>
  <Todos todos={data.todos} {...props} />
  <InputWithButton onClick={text => addTodo({ variables: {text} })}>
    AddTodo
  </InputWithButton>
</div>

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

const query = gql`
  query {
    todos {
      id
      text
    }
  }
`

const addTodo = gql`
  mutation addTodo($text: String) {
    addTodo(text: $text) {
      id
      text
    }
  }
`

const deleteTodo = gql`
  mutation deleteTodo($id: Int) {
    deleteTodo(id: $id) {
      text
    }
  }
`

export default compose(
  graphql(query),
  graphql(addTodo, { name: 'addTodo' }),
  graphql(deleteTodo, { name: 'deleteTodo' })
)(App)
