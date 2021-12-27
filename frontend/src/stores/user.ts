import { acceptHMRUpdate, defineStore } from "pinia";
import { CreateUserInterface, UserInterface } from "../types/interfaces";
import axios from "axios";

interface TodoStateInterface {
  usersData: UserInterface[];
  createdUserData: CreateUserInterface | null;
  loginData: CreateUserInterface | null;
  userId: number | null;
  registrationFormIsVisible: boolean;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    registrationFormIsVisible: true,
    createdUserData: null,
    loginData: null,
    userId: null,
    isAuthenticated: false,

    usersData: [
      {
        id: 0,
        email: "Jogi@sien.com",
        hash: "123456",
      },
      {
        id: 1,
        email: "jan@niels.com",
        hash: "123456",
      },
    ],
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
        const response = await axios.post("http://localhost:5230/login", user);
        if (response.status === 200) {
          this.userId = response.data;
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
    getUsers: (state) => state.usersData,
    getLoginData: (state) => state.loginData,
    getUserId: (state) => state.userId,
    getRegistrationFormIsVisible: (state) => state.registrationFormIsVisible,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
