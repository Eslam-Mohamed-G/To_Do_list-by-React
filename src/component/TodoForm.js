import React, {useState} from 'react'

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
          addTodo(value);
          setValue('');
    }
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" onChange={(e) => setValue(e.target.value)}  value={value} className="todo-input" placeholder='What is the task today?' />
    <button type="submit" className='todo-btn'>Add Task</button>
  </form>
  )
}

export default TodoForm
