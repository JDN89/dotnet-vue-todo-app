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
      console.log(userId);

      try {
        const response = await axios.get(
          "http://localhost:5230/${userId}?userId=" + userId
        );

        if (response.status === 200) {
          //change log to ('success')
          this.toDoLists = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    // =========================================
    // ===========   ADDLISTS  ===============
    // =========================================
    async add(newToDoList: newListInterface) {
      console.log(newToDoList);
    },
    // =========================================
    // ===========   DELETE list  ===============
    // =====================================
    async deleteList(listId: number) {
      console.log(listId);
    },
    // =========================================
    // ===========   ARCHIVE TODO  ===============
    // =========================================
    async archiveTask(listId: number, todo: string) {
      console.log(listId + " " + todo);
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
