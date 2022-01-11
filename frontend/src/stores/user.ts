import { acceptHMRUpdate, defineStore } from "pinia";
import { CreateUserInterface } from "../types/interfaces";
import axios from "axios";
import { useTodoStore } from "~/stores/todos";

interface TodoStateInterface {
  createdUserData: CreateUserInterface | null;
  loginData: CreateUserInterface | null;
  userId: number | null;
  token: string | null;
  registrationFormIsVisible: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    registrationFormIsVisible: true,
    createdUserData: null,
    loginData: null,
    userId: null,
    token: null,
  }),
  actions: {
    // =========================================
    // ===========   REGISTER  ===============
    //don't return sensitve data!
    // =========================================
    async registerUser() {
      try {
        const response = await axios.post(
          "https://localhost:7126/register",
          this.createdUserData
        );
        if (response.status === 200) {
          this.createdUserData = null;
        }
      } catch (error) {
        console.error(error);
      }

      this.registrationFormIsVisible = false;
    },

    // =========================================
    // ===========   LOGIN  ===============
    //don't return sensitve data, only id
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

      return true;
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
      console.log("logged out");
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
