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
    // the userId is added as a claimIdentifier to the token in the backend - see tokenService
    // we save this id in session Storage
    // and with each request we send the token (containing the id) in request header to the api
    // we extract the userId from the token in the backend via UserService
    // and use this id to retrieve the user his lists from the db user his list
    // so no need to send the UserId as a seperate value via qurystring,...

    // =========================================
    // ===========   FETCHLISTS  ===============
    // =========================================
    async fetchTodoLists() {
      const userStore = useUserStore();
      const userToken = userStore.getToken;

      try {
        const response = await axios.get("https://localhost:7126/myTodos", {
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
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      try {
        const response = await axios.delete(
          "https://localhost:7126/myTodos?listId=" + listId,
          {
            headers: { Authorization: "Bearer " + userToken },
          }
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
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      const archiveTodo = {
        listId: listId,
        todo: todo,
      };
   
      try {
        
        const response = await axios.put(
          "https://localhost:7126/myTodos",
          archiveTodo,
          {
            headers: { Authorization: "Bearer " + userToken },
          }
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
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      const unArchiveTodo = {
        listId: listId,
        archived: archived,
      };
      console.log(listId, archived);

      try {
        const response = await axios.put(
          "https://localhost:7126/myTodos/unarchive/",
          unArchiveTodo, 
          {
            headers: { Authorization: "Bearer " + userToken },
          }
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
