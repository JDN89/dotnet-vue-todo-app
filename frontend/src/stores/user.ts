import { acceptHMRUpdate, defineStore } from "pinia";
import { UsersInterface, LogInUserInterface } from "../types/interfaces";
import axios from "axios";

interface TodoStateInterface {
  usersData: UsersInterface[];
  userData: UsersInterface | null;
  loginData: LogInUserInterface | null;
  registrationFormIsVisible: boolean;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): TodoStateInterface => ({
    registrationFormIsVisible: false,
    userData: null,
    loginData: null,
    isAuthenticated: false,

    usersData: [
      {
        id: 0,
        email: "Jogi@sien.com",
        password: "123456",
      },
      {
        id: 1,
        email: "jan@niels.com",
        password: "123456",
      },
    ],
  }),
  actions: {
    async registerUser() {
      try {
        const response = await axios.post("http://localhost:5230/register", this.userData);
        if (response.status === 200) {
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
      console.log(this.userData);
      this.registrationFormIsVisible = true;
    },
    async loginUser() {
      console.log(this.loginData);
      this.isAuthenticated = true;
      return true;
    },
    logout() {
      this.isAuthenticated = false;
      console.log("logged out");
    },
  },
  getters: {
    getUsers: (state) => state.usersData,
    getUserData: (state) => state.userData,
    getRegistrationFormIsVisible: (state) => state.registrationFormIsVisible,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
