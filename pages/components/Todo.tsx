import React, { MouseEventHandler } from "react";
import { Types } from "../types";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

// combined the objects and the functions
type Props = Types.TodoProps & Types.Todo;

const Todo = (props: Props) => {
  const [api, contextHolder] = notification.useNotification();
  // destructured only the functions
  const { toggleTaskCompleted, deleteTask } = props;

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };

  function handleDelete(id: string): void {
    deleteTask(id);
    // (() => openNotification("topLeft"))();
    // deleteTask(id);
  }

  return (
    <>
      {contextHolder}
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
              (() => openNotification("topLeft"))();
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
