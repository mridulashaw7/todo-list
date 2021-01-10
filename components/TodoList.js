import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList({status}) {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setfilteredTodos] = useState([]);
    useEffect(() => {
        handlefilter();
    }, [todos, status]);
    const handlefilter = (e) => {
        switch (status) {
            case "completed":
                setfilteredTodos(todos.filter(item => item.status === true));
                break;
            case "uncompleted":
                setfilteredTodos(todos.filter(item => item.status === false));
                break;
            default:
                setfilteredTodos(todos);
                break;
        }
    }
    console.log("Handle filter===",filteredTodos)
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };
    const updateTodo = (todoId, todoValue) => {
        if (!todoValue.text || /^\s*$/.test(todoValue.text)) {
            return
        }
        setTodos(prev => prev.map(item => item.id === todoId ? todoValue : item))
    }
    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr);
    }
    const completeTodo = id => {
        let updatedTodo = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(updatedTodo);
    }
    return (
        <div>
            <h1>What's the plan for today</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                filteredTodos={filteredTodos} />
        </div>
    );
}
export default TodoList;