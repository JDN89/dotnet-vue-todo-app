import axios from "axios";
import {
  MessageInterface,
  NewMessageInterface,
  CreateUserInterface,
  newListInterface,
  TodoInterface,
} from "~/types/interfaces";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: false,
});

export default {
  // ===========  Message Requests  ===============

  async getMessages() {
    return await apiClient.get("/");
  },
  async postMessage(message: NewMessageInterface) {
    return await apiClient.post("/", message);
  },
  async deleteMessage(id: number) {
    return await apiClient.delete("/?id=" + id);
  },
  async putMessage(message: MessageInterface) {
    return await apiClient.put("/", message);
  },

  // ===========  User Requests  ===============

  async registerUser(user: CreateUserInterface) {
    return await apiClient.post("/register", user);
  },
  async loginUser(user: CreateUserInterface) {
    return await apiClient.post("/login", user);
  },

  // ===========  TODO Requests  ===============

  async getTodoLists(userToken: string) {
    return await apiClient.get("/myTodos", {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
  },
  async postTodoList(todoList: newListInterface, userToken: string) {
    return await apiClient.post("/myTodos", todoList, {
      headers: { Authorization: "Bearer " + userToken },
    });
  },
  async deleteTodoList(listId: number, userToken: string) {
    return await apiClient.delete("/myTodos?listId=" + listId, {
      headers: { Authorization: "Bearer " + userToken },
    });
  },
  async addTodo(newTodo: TodoInterface, userToken: string) {
    return await apiClient.post("/myTodos/todo", newTodo, {
      headers: { Authorization: "Bearer " + userToken },
    });
  },

  async archiveTodo(archiveTodo: TodoInterface, userToken: string) {
    return await apiClient.put("/myTodos/archived", archiveTodo, {
      headers: { Authorization: "Bearer " + userToken },
    });
  },
  async unArchiveTodo(unArchiveTodo: TodoInterface, userToken: string) {
    return await apiClient.put("/myTodos/unarchived", unArchiveTodo, {
      headers: { Authorization: "Bearer " + userToken },
    });
  },
};
