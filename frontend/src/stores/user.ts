import { acceptHMRUpdate, defineStore } from "pinia";
import { CreateUserInterface } from "../types/interfaces";
import axios from "axios";
import { useTodoStore } from "~/stores/todos";
import EventService from "~/composables/EventService";

interface TodoStateInterface {
  createdUserData: CreateUserInterface | null;
  loginData: CreateUserInterface | null;
  token: string | null;
  registrationFormIsVisible: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    registrationFormIsVisible: true,
    createdUserData: null,
    loginData: null,
    token: null,
  }),
  actions: {
    // =========================================
    // ===========   REGISTER  ===============
    //don't return sensitive data!
    // =========================================
    async registerUser() {
      if (this.createdUserData)
        await EventService.registerUser(this.createdUserData)
          .then(() => {
            this.createdUserData = null;
            this.registrationFormIsVisible = false;
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
    // ===========   LOGIN  ===============
    //don't return sensitive data, only id
    // =========================================
    async loginUser(user: CreateUserInterface) {
      await EventService.loginUser(user)
        .then((res) => {
          this.token = res.data;
          if (this.token == null) return console.error("no token set");
          window.sessionStorage.setItem("token", this.token);
          this.loginData = null;
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

    // ===================================
    // ===========  RETRIEVE SESSION  ===============
    // ===================================

    async retrieveSession(token: string) {
      this.token = token;
      const todoStore = useTodoStore();

      try {
        await todoStore.fetchTodoLists();
      } catch (error) {
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
      }
    },

    // =========================================
    // ===========   LOGOUT  ===============
    // =========================================
    logout() {
      window.sessionStorage.removeItem("token");
      const todoStore = useTodoStore();
      //set TodoLists to null upon logout
      //otherwise the next users that logs in sees for a brief second the previous user his todolists
      //because the previous list stored in memory hasn't been overwritten yet
      //by the lists retrieved from the db
      todoStore.toDoLists = null;
    },
  },
  getters: {
    getLoginData: (state) => state.loginData,
    getToken: (state) => state.token,
    getRegistrationFormIsVisible: (state) => state.registrationFormIsVisible,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
