import { FILTER_MAP } from "..";

export namespace Types {
  export interface Todo {
    id: string;
    name: string;
    completed: boolean;
  }

  export type AddTask = {
    addTask: (name: string) => void;
  }

  export interface TodoProps {
    toggleTaskCompleted: (id: string) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, newName: string) => void;
  }

  export type FilterType = keyof typeof FILTER_MAP;

}
