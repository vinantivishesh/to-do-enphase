import { useState } from 'react';
import ToDoList from './ToDoList';
import { nanoid } from 'nanoid';

import './index.css'

var createTaskList = (list) => {
  
  const createTask = (name) => {
    return {
      id: `todo-${nanoid()}`,
      name: name,
      done: false
    };
  }

  let listCreated = list.map((listItem) => {
    let task = createTask(listItem.name);
    if (listItem.items) {
      task = {
        ...task,
        subtasks: listItem.items.map((subItemName) => createTask(subItemName)),
      }
    }
    return task;
  });
  return listCreated;
}

function App(props) {

  const initialList = createTaskList(props.list);
  const [todolist, setTodolist] = useState(initialList);
  
  // callback function to update to do task status
  const changeStatus = (id) => {
    let idx = -1;
    
    let updatedTodoList = todolist.map((todoItem) => {
      
      // if updated task is current to do item
      if (todoItem.id === id) {
        let updatedTodoItem = {
            ...todoItem,
            done: !todoItem.done
          };
        // if done is marked as false then mark all its subtask done as false
        if (updatedTodoItem.done) {
          updatedTodoItem.subtasks =
            updatedTodoItem.subtasks.map((t) => {
              return {
                ...t,
                done: true
              }
          });
        }
        return updatedTodoItem;
      }

      // if updated task is subtask
      else if ((idx = todoItem.subtasks.findIndex(t => t.id === id)) !== -1) {
        let todoSubTask = todoItem.subtasks[idx];
        todoSubTask = {
          ...todoSubTask,
          done: !todoSubTask.done
        };
        let updatedTodoSubTaskList = [...todoItem.subtasks];
        updatedTodoSubTaskList[idx] = todoSubTask;
        // check if all subtaks are done then mark this task as done, else mark this task as active / not done
        let doneThis = todoItem.done;
        if (updatedTodoSubTaskList.filter(subtask => subtask.done).length === updatedTodoSubTaskList.length)
          doneThis = true;
        else
          doneThis = false;  
        return {
          ...todoItem,
          done: doneThis,
          subtasks: updatedTodoSubTaskList
        }
      }

      //no change in current todoItem, so return the same.
      else
        return todoItem;
    });

    setTodolist(updatedTodoList);
  }

  return (
    <div>
      <h1>To Do</h1>
      <div className='todo-list-header'>
        <ToDoList 
          todolist={todolist}
          changeStatus={changeStatus}
        />
      </div>
    </div>
  );
}

export default App;
