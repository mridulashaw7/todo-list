import React, { useState, useRef, useEffect } from "react";

function TodoForm(props, { todos }) {
    const [input, setInput] = useState(props.edit ? props.edit.value : "");
    const [status, setStatus] = useState('all');
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus();
    })

    const handleChange = (e) => {
        setInput(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            completed: false
        });
        setInput("");
    }
    const handleStatus = (e) => {
        console.log(e.target.value)
    }
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                <>
                    <input
                        value={input}
                        name="text"
                        placeholder="Update your item"
                        type="text"
                        className="todo-input edit"
                        onChange={handleChange}
                        ref={inputRef} />
                    <button className="todo-button edit" type="submit"> Update</button>
                </>
            ) :
                (
                    <>
                        <input
                            value={input}
                            name="text"
                            placeholder="Add a Todo"
                            type="text"
                            className="todo-input"
                            onChange={handleChange}
                            ref={inputRef}
                            setStatus={setStatus}
                           />
                        <button
                            className="todo-button"
                            type="submit"> Add Todo
            </button>
                        <div className="todo-select">
                            <select onChange={handleStatus} name="todos" className="filter-todo">
                                <option value="all">All</option>
                                <option value="completed">Completed</option>
                                <option value="Uncompleted">Uncompleted</option>
                            </select>
                        </div>
                    </>
                )}
        </form>
    );
}
export default TodoForm;