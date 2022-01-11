import { acceptHMRUpdate, defineStore } from "pinia";
import { CreateUserInterface } from "../types/interfaces";
import axios from "axios";
import { useTodoStore } from "~/stores/todos";
import { useRouter } from "vue-router";

interface TodoStateInterface {
  createdUserData: CreateUserInterface | null;
  loginData: CreateUserInterface | null;
  userId: number | null;
  token: string | null;
  registrationFormIsVisible: boolean;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    registrationFormIsVisible: true,
    createdUserData: null,
    loginData: null,
    userId: null,
    token: null,
    isAuthenticated: false,
  }),
  actions: {
    // =========================================
    // ===========   REGISTER  ===============
    //don't return sensitve data!
    // =========================================
    async registerUser() {
      try {
        const response = await axios.post(
          "http://localhost:5230/register",
          this.createdUserData
        );
        if (response.status === 200) {
          console.log("User successfully created");
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
        console.log(user);

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

      this.isAuthenticated = true;
      return true;
    },

    // ===================================
    // ===========  RETRIEVE SESSION  ===============
    // ===================================

    async retrieveSession(token: string) {
      // const router = useRouter();      // on mounted --> trigger fetchLists
      const todoStore = useTodoStore();
      this.token = token;
      // ###########3
      // REMOVE. place when response fethTodoLists is true
      // ###########
      this.isAuthenticated = true;
      try {
        const response = await todoStore.fetchTodoLists();
        console.log(response);
        console.log(token);
        if (response == true) return true;
        return false;
      } catch (error) {
        // one error redirect back to login
        // otherwise you see the dashboard (correct loging)
        // even if token was not verified on the backend
        return false;
      }
    },

    // =========================================
    // ===========   LOGOUT  ===============
    // =========================================
    logout() {
      this.isAuthenticated = false;
      console.log("logged out");
    },
  },
  getters: {
    getLoginData: (state) => state.loginData,
    getUserId: (state) => state.userId,
    getToken: (state) => state.token,
    getRegistrationFormIsVisible: (state) => state.registrationFormIsVisible,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
