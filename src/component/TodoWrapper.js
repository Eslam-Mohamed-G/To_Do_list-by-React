import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import EditTodoForm from "./EditTodoForm";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
uuidv4();



function TodoWrapper() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(savedTodos);
  }, []);

  const addTodo = todo => {
      const newTodos = [...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const toggleComplete = id => {
      const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const deleteTodo = id => {
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const editTodo = id => {
      setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
  }

  const editTask = (task, id) => {
      const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
      setTodos(newTodos);
  }
    return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo}></TodoForm>
      {todos.map((todo)=>todo.isEditing ?(<EditTodoForm editTodo={editTask} task={todo}></EditTodoForm>):(<Todo key={todo.id} task={todo} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete}></Todo>))}
      
    </div>
    );
}

export default TodoWrapper
