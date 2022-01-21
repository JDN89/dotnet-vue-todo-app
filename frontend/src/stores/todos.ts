import { acceptHMRUpdate, defineStore } from "pinia";
import {
  ToDoListInterface,
  newListInterface,
  ArchiveTodoInterface,
} from "~/types/interfaces";
import axios from "axios";
import { useUserStore } from "./user";
import EventService from "~/composables/EventService";

interface TodoStateInterface {
  toDoLists: ToDoListInterface[] | null;
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoStateInterface => ({
    toDoLists: null,
  }),
  actions: {
    // the userId is added as a claimIdentifier to the token in the backend - see tokenService
    // we save this id in session Storage
    // and with each request we send the token (containing the id) in request header to the api
    // we extract the userId from the token in the backend via UserService
    // and use this id to retrieve the user his lists from the db user his list
    // so no need to send the UserId as a separate value via querystring,...

    // =========================================
    // ===========   FETCH-LISTS  ===============
    // =========================================
    async fetchTodoLists() {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      if (userToken)
        await EventService.getTodoLists(userToken)
          .then((res) => (this.toDoLists = res.data))
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                console.log(error.response?.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
            }
          });
    },

    // =========================================
    // ===========   ADD LISTS  ===============
    // =========================================
    async add(newToDoList: newListInterface) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      if (userToken)
        await EventService.postTodoList(newToDoList, userToken)
          .then(() => {
            this.fetchTodoLists();
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                console.log(error.response?.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
            }
          });
    },
    // =========================================
    // ===========   DELETE list  ===============
    // =====================================
    async deleteList(listId: number) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      if (userToken)
        await EventService.deleteTodoList(listId, userToken)
          .then(() => this.fetchTodoLists())
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                console.log(error.response?.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
            }
          });
    },
    // =========================================
    // ===========   ARCHIVE TODO  ===============
    // =========================================
    async archiveTask(listId: number, todo: string) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      const archiveTodo: ArchiveTodoInterface = {
        listId: listId,
        todo: todo,
      };
      if (userToken)
        await EventService.archiveTodo(archiveTodo, userToken)
          .then(() => this.fetchTodoLists())
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                console.log(error.response?.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
            }
          });
    },
    // =========================================
    // ===========   UNARCHIVE TODO  ===============
    // =========================================
    async unArchiveTask(listId: number, archived: string) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      const unArchiveTodo: ArchiveTodoInterface = {
        listId: listId,
        todo: archived,
      };
      if (userToken)
        await EventService.unArchiveTodo(unArchiveTodo, userToken)
          .then(() => this.fetchTodoLists())
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                console.log(error.response?.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
              }
            }
          });
    },
  },
  getters: {
    getLists: (state) => state.toDoLists,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
