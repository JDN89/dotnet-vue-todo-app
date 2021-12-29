export interface CreateUserInterface {
  email: string;
  hash: string;
}

export interface UserInterface {
  id: number;
  email: string;
  hash: string;
}
export interface NewMessageInterface {
  Title: string;
  Body: string;
}

export interface ToDoListInterface {
  listId: number;
  // primary key
  userId: number | null;
  //foreign key
  title: string;
  todos: string[];

  archived: string[];
}
export interface newListInterface {
  userId: number | null;
  title: string;
  todos: string[];
}

export interface MessageInterface {
  id: number;
  title: string;
  body: string;
}
