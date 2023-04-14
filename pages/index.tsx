import { Form } from "./components/Form";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import { Types } from "./types";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

// Notification
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

const DATA: Types.Todo[] = [
  {
    id: nanoid(),
    name: "Eat",
    completed: true,
  },
  {
    id: nanoid(),
    name: "Sleep",
    completed: true,
  },
  {
    id: nanoid(),
    name: "Repeat",
    completed: true,
  },
];

interface AppProps {
  data: Types.Todo[];
}
export const App = ({ data }: AppProps) => {
  const [taskList, setTaskList] = useState(data);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    placement: NotificationPlacement,
    name: string | undefined
  ) => {
    api.info({
      message: `Deleted Task!`,
      description: `Successfully Deleted Task '${name}'`,
      placement,
    });
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/5`)
      .then((response) => response.json())
      .then((json) => json.name)
      .then((name) =>
        setTaskList([
          ...taskList,
          {
            id: nanoid(),
            name,
            completed: false,
          },
        ])
      );
  }, []);

  function addTask(name: string): void {
    if (name)
      setTaskList([...taskList, { name, id: nanoid(), completed: false }]);
  }

  function toggleTaskCompleted(id: string): void {
    const updatedTasks = taskList.map((task) => {
      if (id == task.id) {
        return { ...task, completed: !task.completed };
      }
      // else
      return task;
    });
    setTaskList(updatedTasks);
  }

  function deleteTask(id: string): void {
    console.log("delete");
    // this is where we use filter
    const remainingTasks = taskList.filter((task) => id != task.id);
    // tasks inside remaining tasks satisfy that condition
    setTaskList(remainingTasks);
  }

  function callNotification(id: string) {
    let task = taskList.find((task) => id == task.id);
    (() => openNotification("topLeft", task?.name))();
  }

  return (
    <div className="todoapp stack-large">
      {contextHolder}
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList?.map((task: Types.Todo) => {
          return (
            <Todo
              key={task.id}
              {...task}
              toggleTaskCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
              callNotification={callNotification}
              // name={task.name}
              // completed={task.completed}
              // id={task.id}
              // same replacement
            />
          );
        })}
        {/* <Todo name="Eat" completed={true} id={nanoid()} />
        <Todo name="Sleep" completed={false} id={nanoid()} />
        <Todo name="Repeat" completed={false} id={nanoid()} /> */}
      </ul>
    </div>
  );
};

export default App;

export const getStaticProps: GetStaticProps = async (context) => {
  // sending one data through this
  try {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
    let json = await response.json();
    let task: Types.Todo = {
      id: nanoid(),
      name: json.name + " getStaticProps",
      completed: false,
    };

    return {
      props: { data: [...DATA, task] },
    };
  } catch (error) {
    console.error("getStaticProps fetch failed");
    return {
      props: { data: DATA },
    };
  }
};
