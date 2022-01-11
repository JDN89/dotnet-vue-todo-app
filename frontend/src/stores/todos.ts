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
    // =========================================
    // ===========   FETCHLISTS  ===============
    // =========================================
    async fetchTodoLists() {
      const userStore = useUserStore();
      const userToken = userStore.getToken;

      try {
        const response = await axios.get("https://localhost:7126/myTodos", {
          // the userId is added as a claimIdentifier to the token
          // we extract the userId from the token in the backend via UserService
          //so no need to send the UserId as a seperate value via qurystring,...
          headers: {
            Authorization: "Bearer " + userToken,
          },
        });

        if (response.status === 200) {
          this.toDoLists = response.data;
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    // =========================================
    // ===========   ADDLISTS  ===============
    // =========================================
    async add(newToDoList: newListInterface) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      try {
        const response = await axios.post(
          "https://localhost:7126/myTodos",
          newToDoList,
          // the UserId in newToDoList is initially set to null
          // we  extract the userId from the token in the backend
          // then we set the newtoDoList.userId = id retrieved from token
          {
            headers: { Authorization: "Bearer " + userToken },
          }
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
          "hhttps://localhost:7126/myTodos?listId=" + listId
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
          "https://localhost:7126/myTodos",
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
    async unArchiveTask(listId: number, archived: string) {
      const unArchiveTodo = {
        listId: listId,
        archived: archived,
      };
      console.log(listId, archived);

      try {
        const response = await axios.put(
          "https://localhost:7126/myTodos/unarchive/",
          unArchiveTodo
        );

        if (response.status === 204) {
          this.fetchTodoLists();
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getLists: (state) => state.toDoLists,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
