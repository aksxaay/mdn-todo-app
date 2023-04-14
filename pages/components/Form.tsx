import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Types } from "../types";

import { RadiusUpleftOutlined } from "@ant-design/icons";

import { Button, Divider, notification, Space } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";

const Context = React.createContext({ name: "Default" });
export function Form({ addTask }: Types.AddTask) {
  const [name, setName] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Add Task!`,
      description: `Successfully Added Task '${name}'`,
      placement,
    });
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTask(name);
    // notification call
    (() => openNotification("topLeft"))();
    setName("");
  }

  return (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    </>
  );
}
