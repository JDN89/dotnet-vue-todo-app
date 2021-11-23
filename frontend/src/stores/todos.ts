import { acceptHMRUpdate, defineStore } from "pinia";
import { ToDoListInterface, newListInterface } from "../types/interfaces";

interface TodoStateInterface {
  toDoLists: ToDoListInterface[];
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoStateInterface => ({
    toDoLists: [
      {
        listId: 1,
        userId: 1,
        title: "beestenboos Toon",
        todos: ["2 katten", "1 hond", "1000 luizen"],
        archived: [],
      },
      {
        listId: 2,
        userId: 1,
        title: "lawaai",
        todos: ["gitaar", "drum", "saxofoon"],
        archived: ["anula", "monika", "blond meken"],
      },
    ],
  }),
  actions: {
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
