import React, { MouseEventHandler } from "react";
import { Types } from "../types";

// combined the objects and the functions
type Props = Types.TodoProps & Types.Todo;

const Todo = (props: Props) => {
  // destructured only the functions
  const { toggleTaskCompleted, deleteTask, callNotification } = props;

  function handleDelete(id: string): void {
    callNotification(id);
    deleteTask(id);
  }

  return (
    <>
      <li className="todo stack-small">
        <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => {
              return handleDelete(props.id);
            }}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
      </li>
    </>
  );
};

export default Todo;
