import { acceptHMRUpdate, defineStore } from "pinia";
import {
  ToDoListInterface,
  newListInterface,
  TodoInterface,
} from "~/types/interfaces";
import axios from "axios";
import { useUserStore } from "./user";
import EventService from "~/composables/EventService";

interface TodoStateInterface {
  toDoLists: ToDoListInterface[] | null;
  temporaryList: ToDoListInterface | null;
  showAddTodoComp: boolean | null;
  showAddTask: Boolean | null;
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoStateInterface => ({
    toDoLists: null,
    showAddTask: null,
    showAddTodoComp: false,
    temporaryList: null,
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
    // ===========   CHECK-DUPLICATE TODO ITEMS  ===============
    // =========================================
    // filter out duplicate todo items before you send them to the backend
    // because, why would you need duplicate todoItems?

    async checkDuplicates(todosArr: string[]) {
      const filteredTodos = [...new Set(todosArr)];
           return filteredTodos;
    },

    // =========================================
    // ===========   ADD LISTS  ===============
    // =========================================
    async add(newToDoList: newListInterface) {
      let filteredArr = await this.checkDuplicates(newToDoList.todos);
           newToDoList.todos = filteredArr;
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
    // ===========   TEMPORARY SOTRE LIST (you want to change) STATE ===============
    // =========================================
    // I can't directly add a input field in the Todolist.vue component
    // because then the newly written todo gets rendered in al the
    // todolist containers via the v-for loop
    // if you write todo: item 1 => this wil appear in the input field in all your todolist containers
    // solution: create an temporaryList container
    // load the list you want to change in this container (that's why we save the state via this function)
    // add an input field for the new todo
    // check for null and duplicate values
    // send to api

    async changeList(list: ToDoListInterface) {
          this.showAddTodoComp = true;
      this.temporaryList = list;
    },

    async fetchList (listId:number) {
     if(this.toDoLists == null) {throw console.error("toDoLists is null");
     }     
      const lookup = this.toDoLists.find(list =>  list.listId == listId )
      if (lookup == undefined)  {throw console.error("lookup is undefined")
    } return this.temporaryList = lookup;
  },


    // =========================================
    // ===========   ADD NEW TODO  ===============
    // =========================================
    async addTodo(listId: number, todo: string) {
      const userStore = useUserStore();
      const userToken = userStore.getToken;
      const newTodo: TodoInterface = {
        listId: listId,
        todo: todo,
      };
      if (userToken)
        await EventService.addTodo(newTodo, userToken)
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
      const archiveTodo: TodoInterface = {
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
      const unArchiveTodo: TodoInterface = {
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
    getShowAddTask: (state) => state.showAddTask,
    getShowAddTodoComponent: (state) => state.showAddTodoComp,
    getTemporaryList: (state) => state.temporaryList,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
