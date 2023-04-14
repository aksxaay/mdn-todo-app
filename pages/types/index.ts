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
    callNotification: (id: string) => void;
  }

}
