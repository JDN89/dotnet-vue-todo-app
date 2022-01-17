import { acceptHMRUpdate, defineStore } from "pinia";
import { CreateUserInterface } from "../types/interfaces";
import axios from "axios";
import { useTodoStore } from "~/stores/todos";

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
      try {
        const response = await axios.post(
          "https://localhost:7126/register",
          this.createdUserData
          );
          if (response.status === 200) {
            this.createdUserData = null;

            this.registrationFormIsVisible = false;
            
            
            
          } 
        } catch (error) {
          console.error(error);
        }
        },

    // =========================================
    // ===========   LOGIN  ===============
    //don't return sensitive data, only id
    // =========================================
    async loginUser(user: CreateUserInterface) {
      try {
        const response = await axios.post("https://localhost:7126/login", user);
        if (response.status === 200) {
          this.token = response.data;
          if (this.token == null) return console.error("no token set");
          window.sessionStorage.setItem("token", this.token);

          this.loginData = null;
        }
      } catch (error) {
        console.error(error);
      }
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
        console.error(error);
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
      todoStore.toDoLists = null
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
