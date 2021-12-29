import { acceptHMRUpdate, defineStore } from "pinia";
import { ToDoListInterface, newListInterface } from "../types/interfaces";
import axios from "axios";
import { useUserStore } from "./user";

interface TodoStateInterface {
  toDoLists: ToDoListInterface[];
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoStateInterface => ({
    toDoLists: [],
  }),
  actions: {
    async fetchTodoLists() {
      const userStore = useUserStore();
      const userId = userStore.getUserId;

      try {
        const response = await axios.get(
          "http://localhost:5230/${userId}?userId=" + userId
        );

        if (response.status === 200) {
          this.toDoLists = response.data;
          console.log(this.toDoLists);
        }
      } catch (error) {
        console.error(error);
      }
    },

    // =========================================
    // ===========   ADDLISTS  ===============
    // =========================================
    async add(newToDoList: newListInterface) {
      try {
        const response = await axios.post(
          "http://localhost:5230/${userId}",
          newToDoList
        );

        if (response.status === 200) {
          this.fetchTodoLists();
        }
      } catch (error) {
        console.error(error);
      }
    },
    // =========================================
    // ===========   DELETE list  ===============
    // =====================================
    async deleteList(listId: number) {
      try {
        const response = await axios.delete(
          "http://localhost:5230/${userId}?listId=" + listId
        );

        if (response.status === 204) {
          this.fetchTodoLists();
        }
      } catch (error) {
        console.error(error);
      }
    },
    // =========================================
    // ===========   ARCHIVE TODO  ===============
    // =========================================
    async archiveTask(listId: number, todo: string) {
      const archiveTodo = {
        listId: listId,
        todo: todo,
      };
      console.log(listId, todo);

      try {
        const response = await axios.put(
          "http://localhost:5230/${userId}",
          archiveTodo
        );

        if (response.status === 204) {
          this.fetchTodoLists();
        }
      } catch (error) {
        console.error(error);
      }
    },
    // =========================================
    // ===========   UNARCHIVE TODO  ===============
    // =========================================
    async unArchiveTask(listId: number, todo: string) {
      console.log(listId + " " + todo);
    },
  },
  getters: {
    getLists: (state) => state.toDoLists,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
