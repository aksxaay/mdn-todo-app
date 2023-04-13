export namespace Types {
  export interface Todo {
    id: string;
    name: string;
    completed: boolean;
  }

  export type AddTask = {
    addTask: (name: string) => void;
  }
}
