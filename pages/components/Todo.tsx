import React, { ChangeEvent, FormEvent, useState } from "react";
import { Types } from "../types";

// combined the objects and the functions
type Props = Types.TodoProps & Types.Todo;

const Todo = (props: Props) => {
  const [isEdit, setEdit] = useState(false);
  const [newName, setNewName] = useState("");
  // destructured only the functions
  const { toggleTaskCompleted, deleteTask, editTask } = props;

  function handleDelete(id: string): void {
    deleteTask(id);
  }

  function handleEditChange(e: ChangeEvent<HTMLInputElement>) {
    setNewName(e.target.value);
  }

  function handleEditSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editTask(props.id, newName);
    setEdit(false);
  }

  const viewTemplate = (
    <div>
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
        <button type="button" className="btn" onClick={() => setEdit(true)}>
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
    </div>
  );

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleEditSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={(event) => handleEditChange(event)}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEdit(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  return (
    <>
      <li className="todo stack-small">
        {isEdit ? editingTemplate : viewTemplate}
      </li>
    </>
  );
};

export default Todo;
