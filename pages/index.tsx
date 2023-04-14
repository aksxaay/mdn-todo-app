import { Filter } from "./components/Filter";
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

export const FILTER_MAP = {
  All: () => true,
  Active: (task: Types.Todo) => !task.completed,
  Completed: (task: Types.Todo) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

interface AppProps {
  data: Types.Todo[];
}
export const App = ({ data }: AppProps) => {
  const [taskList, setTaskList] = useState(data);
  const [filter, setFilter] = useState<Types.FilterType>("All");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    type: string,
    name: string | undefined,
    newName: string | undefined
  ) => {
    if (type == "Deleted") {
      api.info({
        message: `Deleted Task!`,
        description: `Successfully ${type} Task '${name}'`,
        placement,
      });
    } else {
      api.info({
        message: `Deleted Task!`,
        description: `Successfully ${type} Task from '${name}' to '${newName}'`,
        placement,
      });
    }
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
    // this is where we use filter
    const remainingTasks = taskList.filter((task) => {
      if (task.id == id) {
        (() => openNotification("topLeft", "Deleted", task?.name, undefined))();
      }
      return id != task.id;
    });
    // tasks inside remaining tasks satisfy that condition
    setTaskList(remainingTasks);
  }

  function editTask(id: string, newName: string) {
    console.log("editTas");
    const editedTaskList = taskList.map((task) => {
      if (id == task.id) {
        (() => openNotification("topLeft", "Updated", task?.name, newName))();
        return { ...task, name: newName };
      }

      // else
      return task;
    });
    setTaskList(editedTaskList);
  }

  const FILTER_ARRAY = Object.keys(FILTER_MAP);

  return (
    <div className="todoapp stack-large">
      {contextHolder}
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {FILTER_ARRAY.map((name) => (
          <Filter
            key={name}
            name={name as Types.FilterType}
            isPressed={name === filter}
            setFilter={setFilter}
          />
        ))}
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList?.filter(FILTER_MAP[filter]).map((task: Types.Todo) => {
          return (
            <Todo
              key={task.id}
              {...task}
              toggleTaskCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
              editTask={editTask}
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
