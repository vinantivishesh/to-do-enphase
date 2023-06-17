import { useEffect, useState } from "react";

export default function ToDoList ({todolist, changeStatus}) {
    return (
        <div className="todo-list-header">
            {todolist.length && 
                todolist.map((todo, index) => {
                    return (
                        <ToDo 
                            todo={todo}
                            key={index}
                            changeStatus={changeStatus}
                        />
                    );
                })
            }
        </div>
    );
}

function ToDo ({todo, changeStatus}) {
    const [checked, setChecked] = useState(todo.done);
    return (
        <div key={todo.id} className="todo-list-item">
            <label>
                <input 
                    type="checkbox" 
                    checked={todo.done}
                    onChange={() => {
                        setChecked(!checked);
                        changeStatus(todo.id);
                    }}
                />
                {todo.done ? <del>{todo.name}</del> : todo.name}
            </label>
            {todo.done ? ` is done` : ' is active'}
            {todo.subtasks?.length && 
                <ToDoList
                    todolist={todo.subtasks}
                    changeStatus={changeStatus}
                />
            }
        </div>
    );
}