import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import { Types } from "./types";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

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

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <form>
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
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
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
              name={task.name}
              completed={task.completed}
              id={task.id}
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
