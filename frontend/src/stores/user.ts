import { acceptHMRUpdate, defineStore } from "pinia";
import { CreateUserInterface } from "../types/interfaces";
import axios from "axios";

interface TodoStateInterface {
  createdUserData: CreateUserInterface | null;
  loginData: CreateUserInterface | null;
  userId: number | null;
  token: number | null;
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
          console.log(this.token);
          console.log(response.data);
          this.loginData = null;
        }
      } catch (error) {
        console.error(error);
      }

      this.isAuthenticated = true;
      return true;
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
